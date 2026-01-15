import { SixNumArray } from 'dart-api';
import moveProgram from './move.drl';
import DrlUtils, { Watchers } from '../../DrlUtils';
import { PoseMode } from '../../types';

type MoveArgs = {
  positions: SixNumArray[];
  watchers: Watchers;
  mode: PoseMode;
};

export function runMove({ positions, watchers, mode }: MoveArgs) {
  DrlUtils.getInstance().clear();

  DrlUtils.getInstance().set('POSITIONS', JSON.stringify(positions));
  DrlUtils.getInstance().set('MODE', mode);

  return DrlUtils.getInstance().runProgram(moveProgram, watchers);
}
