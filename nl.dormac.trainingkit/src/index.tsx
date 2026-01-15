import { BaseModule, ModuleScreen, ModuleScreenProps, System } from 'dart-api';
import React from 'react';
import { App } from './app/App';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import DrlUtils from './DrlUtils';
import { ModuleContextInjector } from './hooks/useModuleContext';
import { css } from './styles/style';

// IIFE for register a function to create an instance of main class which is inherited BaseModule.
(() => {
  System.registerModuleMainClassCreator(
    (packageInfo) => new Module(packageInfo),
  );
})();
class Module extends BaseModule {
  getModuleScreen(componentId: string) {
    if (componentId === 'MainScreen') {
      return MainScreen;
    }
    return null;
  }
}
class MainScreen extends ModuleScreen {
  constructor(props: ModuleScreenProps) {
    super(props);
  }

  componentDidMount(): void {
    DrlUtils.init(this.moduleContext);

    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }

  componentWillUnmount() {
    // Must delete DrlUtils Instance to free up memory
    DrlUtils.deleteInstance();

    const modalRoot = document.getElementById('modal-root');

    if (modalRoot) {
      modalRoot.remove();
    }
  }

  render() {
    return (
      <>
        <style>{`${css}`}</style>

        <ModuleContextInjector.Provider value={this.moduleContext}>
          <SplashScreen />

          <div className="css-variables-root tw-grid tw-justify-center tw-mx-2 tw-h-full">
            <div className="width-1000">
              <App />
            </div>
          </div>
        </ModuleContextInjector.Provider>
      </>
    );
  }
}
