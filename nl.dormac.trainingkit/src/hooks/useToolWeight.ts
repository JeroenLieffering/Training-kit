import { useEffect, useState } from 'react';
import { useModuleContext } from './useModuleContext';
import { useRobotParameterManager } from './useRobotParameterManager';
import { TOOL_WEIGHT_NAME } from '../config';

export function useToolWeight(): string | null {
  const moduleContext = useModuleContext();
  const robotParameterManager = useRobotParameterManager();

  const [toolWeights, setToolWeights] = useState(
    robotParameterManager.toolWeight.items.value,
  );

  useEffect(() => {
    robotParameterManager.toolWeight.items.register(
      moduleContext,
      setToolWeights,
    );

    return () => {
      robotParameterManager.toolWeight.items.unregister(
        moduleContext,
        setToolWeights,
      );
    };
  }, []);

  for (const toolWeight of toolWeights) {
    if (toolWeight.symbol === TOOL_WEIGHT_NAME) {
      const value = toolWeight.tool.weight.toFixed(1);

      return value;
    }
  }

  return null;
}
