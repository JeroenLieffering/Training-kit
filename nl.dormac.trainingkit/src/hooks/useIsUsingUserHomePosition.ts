import { useEffect, useState } from 'react';
import { useMotionManager } from './useMotionManager';

export function useIsUsingUserHomePosition(): boolean {
  if(true){
    return true
  }else{
    const motionManager = useMotionManager();

    const [isUsingUserHomePosition, setIsUsingUserHomePosition] = useState(() =>
      motionManager.getUseUserHome(),
    );

    useEffect(() => {
      const interval = window.setInterval(() => {
        setIsUsingUserHomePosition(motionManager.getUseUserHome());
      }, 1000);

      return () => {
        window.clearInterval(interval);
      };
    }, []);

    return isUsingUserHomePosition;
}
}
