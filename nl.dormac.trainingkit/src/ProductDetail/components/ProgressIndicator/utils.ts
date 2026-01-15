import { ProgressStatus } from './types';

export function getProgressStatusForPhase(
  phase: number,
  currentPhase: number,
  isPlaying: boolean,
): ProgressStatus {
  if (!isPlaying) {
    return 'pending';
  }

  if (phase === currentPhase) {
    return 'started';
  } else if (phase < currentPhase) {
    return 'finished';
  } else {
    return 'pending';
  }
}
