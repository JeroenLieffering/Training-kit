import {
  Context,
  IDartFileSystem,
  IProgramManager,
  logger,
  ModuleContext,
  ProgramState,
  ProgramStopCause,
  ProgramStopType,
  UserInputType,
} from 'dart-api';

export type CommunicationWatcherArgs = {
  type: UserInputType;
  text: string;
  sendResponse: (response: string) => void;
};

export type Watchers = {
  communicationWatcher: (args: CommunicationWatcherArgs) => void;
  loggerWatcher?: (value: string) => void;
  programWatcher?: (value: ProgramState) => void;
  programStopCauseWatcher?: (value: ProgramStopCause) => void;
};
export default class DrlUtils {
  private fieldDataMap: Map<string, string | number | boolean>;
  private static instance: DrlUtils;
  public moduleContext: ModuleContext;

  // Get instance
  public static init(moduleContext: ModuleContext): void {
    DrlUtils.instance = new DrlUtils(moduleContext);
  }

  // Get instance
  public static getInstance(): DrlUtils {
    return DrlUtils.instance;
  }

  // Remove the DrlUtils instance before closing the module
  public static deleteInstance() {
    if (DrlUtils.instance) {
      DrlUtils.instance.clear();
      //@ts-expect-error Allow me to do this.
      DrlUtils.instance = null;
    }
  }

  // private constructor
  private constructor(moduleContext: ModuleContext) {
    this.moduleContext = moduleContext;
    this.fieldDataMap = new Map();
  }
  public set(key: string, value: string | number | boolean) {
    this.fieldDataMap.set(key, value);
  }
  public clear() {
    this.fieldDataMap.clear();
  }
  public async runProgram(mainProgramFilePath: string, watchers: Watchers) {
    const moduleContext = this.moduleContext;

    logger.debug('Running Program -> ');

    const fileSystem = moduleContext.getSystemLibrary(
      Context.DART_FILE_SYSTEM,
    ) as IDartFileSystem;
    const rootFilePath = fileSystem.getModuleRootDirPath(moduleContext);
    const regex = new RegExp(`.*(${rootFilePath})`);
    const appData = Object.fromEntries(this.fieldDataMap);
    // logger.debug('Running Program .... ');
    const mainAbsolutePath = decodeURI(mainProgramFilePath).replace(
      regex,
      `$1`,
    );
    const mainProgram = await this.createDRLContent(
      moduleContext,
      fileSystem,
      mainAbsolutePath,
      appData,
    );
    if (mainProgram === '') {
      // logger.debug('Couldnt read the file ... ');
      // logger.debug('root path >>> ' + rootFilePath);
      // logger.debug('main file path >>>' + mainAbsolutePath);
      return false;
    }

    const programManager = moduleContext.getSystemManager(
      Context.PROGRAM_MANAGER,
    ) as IProgramManager;

    /**
     * Whenever the DRL calls `tp_get_user_input` the caller of
     * `runProgram` must acknowledge the message by sending a
     * response via the sendResponse function.
     */
    function onTpGetUserInput(params: { type: UserInputType; text: string }) {
      watchers.communicationWatcher({
        ...params,
        sendResponse: (response) => {
          programManager.sendUserInputPopupResponse(response);
        },
      });
    }

    function programStateChanged(state: ProgramState) {
      watchers?.programWatcher?.(state);

      if (state === ProgramState.STOP || state === ProgramState.CANCELLED) {
        if (watchers?.loggerWatcher) {
          programManager.userLog.unregister(
            moduleContext,
            watchers.loggerWatcher,
          );
        }

        if (watchers?.programWatcher) {
          programManager.programState.unregister(
            moduleContext,
            programStateChanged,
          );
        }

        programManager.userInputPopup.unregister(
          moduleContext,
          onTpGetUserInput,
        );
      }
    }

    function receivedStopCause(stopCause: ProgramStopCause) {
      watchers?.programStopCauseWatcher?.(stopCause);

      // After it has been received immediately stop listening.
      programManager.programStopCause.unregister(
        moduleContext,
        receivedStopCause,
      );
    }

    programManager.userInputPopup.register(moduleContext, onTpGetUserInput);

    if (watchers?.loggerWatcher) {
      programManager.userLog.register(moduleContext, watchers?.loggerWatcher);
    }

    programManager.programState.register(moduleContext, programStateChanged);

    if (watchers?.programStopCauseWatcher) {
      programManager.programStopCause.register(
        moduleContext,
        receivedStopCause,
      );
    }

    return await programManager.runProgram(mainProgram, null, null, true);
  }

  public pause() {
    const programManager = this.moduleContext.getSystemManager(
      Context.PROGRAM_MANAGER,
    ) as IProgramManager;

    programManager.pauseProgram();
  }

  public resume() {
    const programManager = this.moduleContext.getSystemManager(
      Context.PROGRAM_MANAGER,
    ) as IProgramManager;

    programManager.resumeProgram();
  }

  public stop() {
    const programManager = this.moduleContext.getSystemManager(
      Context.PROGRAM_MANAGER,
    ) as IProgramManager;

    programManager.stopProgram(ProgramStopType.SLOW);
  }

  private async createDRLContent(
    moduleContext: ModuleContext,
    fileSystem: IDartFileSystem,
    path: string,
    appData: { [k: string]: string | number | boolean },
  ) {
    let result = '';
    if (await fileSystem.exists(path)) {
      result = await fileSystem.readFile(moduleContext, path);
      // logger.info(JSON.stringify(appData));
      result = `app_data = '${JSON.stringify(appData)}'\r\n` + result;
    }
    return result;
  }
}
