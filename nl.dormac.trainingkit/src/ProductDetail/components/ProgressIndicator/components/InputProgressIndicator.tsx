import AirIcon from '@mui/icons-material/AirOutlined';
import BackHandIcon from '@mui/icons-material/BackHandOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import StorageIcon from '@mui/icons-material/Storage';
import React, { useRef } from 'react';
import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { Product } from '../../../../core/models/product-types';
import { MetaSuiteProgramState } from '../../../../drl/main/types';
import { ProgressIcon } from '../../ProgressIcon';
import { getProgressStatusForPhase } from '../utils';
import { isConfiguredWithSupportForMultipleDrawers } from '../../../../core/services/cobot-config-service';

type Props = {
  product: Product;
  cobotConfig: CobotConfig;
  status: MetaSuiteProgramState;
  isPlaying: boolean;
};

const HOME = 0;
const DRAWER = 1;
const PICK = 2;
const AIR = 3;
const HAND = 4;

const PHASES: MetaSuiteProgramState[][] = [
  // HOME
  ['HOMING', 'ROBOT_HOME'],
  // DRAWER
  ['REQUEST_NEW_DRAWER'],
  // PICK
  [
    'PICK_PRODUCT_DRAWER',
    'PRODUCT_PICKED_FROM_DRAWER',
    'PICK_FROM_DRAWER_FAILED',
  ],
  // AIRPURGE_BEFORE_INFEED
  ['AIRPURGE_BEFORE_INFEED', 'AIRPURGE_BEFORE_INFEED_DONE'],
  // HAND
  ['PLACE_PRODUCT_MACHINE', 'FORCE_FEED', 'PUSH_AFTER_PLACE'],
];

export function InputProgressIndicator({
  product,
  status,
  isPlaying,
  cobotConfig,
}: Props) {
  const lastPhase = useRef(0);

  if (status === 'PICK_FROM_DRAWER_FAILED') {
    lastPhase.current = 1;
  }

  let phase = PHASES.findIndex((phases) => phases.includes(status));

  if (phase === -1) {
    // If no phase can be found default to the last known phase
    // so the progress animation always shows one item in blue.
    phase = lastPhase.current;
  } else {
    // Set last known phase.
    lastPhase.current = phase;
  }

  return (
    <div className="tw-flex tw-items-center">
      <ProgressIcon
        icon={HomeOutlinedIcon}
        status={getProgressStatusForPhase(HOME, phase, isPlaying)}
      />

      {isConfiguredWithSupportForMultipleDrawers(cobotConfig) ? (
        <ProgressIcon
          icon={StorageIcon}
          status={getProgressStatusForPhase(DRAWER, phase, isPlaying)}
        />
      ) : null}

      <ProgressIcon
        icon={PrecisionManufacturingIcon}
        status={
          status === 'PICK_FROM_DRAWER_FAILED'
            ? 'error'
            : getProgressStatusForPhase(PICK, phase, isPlaying)
        }
      />

      {product.config.AIRPURGE_BEFORE_INFEED ? (
        <ProgressIcon
          icon={AirIcon}
          status={getProgressStatusForPhase(AIR, phase, isPlaying)}
        />
      ) : null}

      <ProgressIcon
        icon={BackHandIcon}
        status={getProgressStatusForPhase(HAND, phase, isPlaying)}
        line={false}
      />
    </div>
  );
}
