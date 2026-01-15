import { ProgramState } from 'dart-api';
import { useEffect, useState } from 'react';
import { useModuleContext } from '../../hooks/useModuleContext';
import { useProgamManager } from '../../hooks/useProgramManager';

export function useProgramState() {
  const [programState, setProgramState] = useState<ProgramState>(
    ProgramState.NONE,
  );

  const moduleContext = useModuleContext();
  const programManager = useProgamManager();

  useEffect(() => {
    async function load() {
      const currentState = await programManager.getProgramState();

      setProgramState(currentState);
    }

    load();

    programManager.programState.register(moduleContext, setProgramState);

    return () => {
      programManager.programState.register(moduleContext, setProgramState);
    };
  }, []);

  return programState;
}
