import { MetaSuiteProgramSpindleStatus } from '../../../../../../drl/main/types';

const EMPTY = 0;
const RAW = 1;
const FINISHED = 2;

export function getColorForStatus(
  status: MetaSuiteProgramSpindleStatus,
  isPlaying: boolean,
) {
  if (status === EMPTY || !isPlaying) {
    return '#f3f4f6'; // gray-100
  } else if (status === RAW) {
    return '#0ea5e9'; // sky-500
  } else if (status === FINISHED) {
    return '#84cc16'; // lime-500
  }
}
