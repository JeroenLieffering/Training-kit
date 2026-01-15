import { useRef } from 'react';
import { Timer, TimePeriod } from '../../../types';

export function useTimer(): Timer {
  /*
    We want to know how long it takes to fabricate a product.

    Because the user can pause / resume the process we need to 
    know the times which the process was running and paused.

    The timings array will store this information, it might end 
    up looking like this:

    [
      // User starts fabrication
      { start: 0, end: 5, type: 'running'},
      
      // User presses pause after 5 seconds
      { start: 5, end: 10, type: 'paused'},
      
      // User presses resume after 10 seconds
      { start: 10, end: 20, type: 'running'},
      
      // User presses pause after 20 seconds 
      { start: 20, end: 28, type: 'paused'},

      // User presses resume after 28 seconds
      { start: 28, end: 42, type: 'paused'},
    ]

    If the user never pauses it will just be an array with one item:

     [
      // User starts fabrication and it was finished after 25 seconds
      { start: 0, end: 25, type: 'running'},
     ]
  */
  const timings = useRef<TimePeriod[]>([]);

  function startTimer() {
    timings.current = [
      {
        start: Math.round(new Date().getTime()),
        end: Math.round(new Date().getTime()),
        type: 'running',
      },
    ];
  }

  function getLastTiming() {
    return timings.current[timings.current.length - 1];
  }

  function pauseTimer() {
    // Mark the end of the running period
    getLastTiming().end = Math.round(new Date().getTime());

    // Mark the start of the paused period
    timings.current.push({
      start: Math.round(new Date().getTime()),
      end: Math.round(new Date().getTime()),
      type: 'paused',
    });
  }

  function resumeTimer() {
    // Mark the end of the pause period
    getLastTiming().end = Math.round(new Date().getTime());

    // Mark the end of the running timer
    timings.current.push({
      start: Math.round(new Date().getTime()),
      end: Math.round(new Date().getTime()),
      type: 'running',
    });
  }

  function getDuration() {
    const lastTiming = getLastTiming();

    // Set the last periods end time to now.
    if (lastTiming.type === 'running') {
      lastTiming.end = Math.round(new Date().getTime());
    }

    // Sum all running periods together for the total running time.
    return timings.current
      .filter((timing) => timing.type === 'running')
      .reduce((acc, timing) => {
        return acc + timing.end - timing.start;
      }, 0);
  }

  function resetTimer() {
    timings.current = [];
  }

  return {
    startTimer,
    pauseTimer,
    resumeTimer,
    getDuration,
    resetTimer,
  };
}
