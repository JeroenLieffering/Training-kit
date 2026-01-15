import { RobotSpace } from 'dart-api';
import { useEffect, useState } from 'react';
import { usePositionManager } from './usePositionManager';

export function useCurrentJointPose() {
  const positionManager = usePositionManager();

  const [jointPose, setJointPose] = useState(positionManager.jointPose.value);

  // Note I'm not using the positionManager.jointPose as a Monitorable
  // since it does not give accurate results for some reason.
  useEffect(() => {
    async function run() {
      const currentPosition = await positionManager.getCurrentPos(
        RobotSpace.JOINT,
      );

      setJointPose(currentPosition);
    }

    const intervalId = window.setInterval(() => {
      run();
    }, 500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return jointPose;
}
