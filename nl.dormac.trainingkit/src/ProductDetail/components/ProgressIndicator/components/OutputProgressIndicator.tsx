import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AirIcon from '@mui/icons-material/AirOutlined';
import GridOnIcon from '@mui/icons-material/GridOn';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import OutputIcon from '@mui/icons-material/Output';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
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
const AIRPURGE_BEFORE_OUTFEED = 2;
const OUTPUT = 3;
const AIRPURGE_AFTER_OUTFEED = 4;
const CLEAN = 5;
const GRID = 6;

const PHASES: MetaSuiteProgramState[][] = [
  // HOME
  ['HOMING', 'ROBOT_HOME'],
  // DRAWER
  ['REQUEST_NEW_DRAWER'],
  // AIRPURGE_BEFORE_OUTFEED,
  ['AIRPURGE_BEFORE_OUTFEED', 'AIRPURGE_BEFORE_OUTFEED_DONE'],
  // OUTPUT
  [
    'PICK_FINISHED_PRODUCT',
    'PRODUCT_PICKED_FROM_MACHINE',
    'PICK_FROM_MACHINE_FAILED',
  ],
  // AIRPURGE_AFTER_OUTFEED,
  ['AIRPURGE_AFTER_OUTFEED', 'AIRPURGE_AFTER_OUTFEED_DONE'],
  // CLEAN
  ['CLEAN_PRODUCT', 'PRODUCT_CLEANED'],
  // GRID / GPS
  [
    'PLACE_FINISHED_PRODUCT',
    'PLACE_PRODUCT_DRAWER',
    'PRODUCT_FINISHED',
    'TOTAL_FINISHED',
  ],
];

export function OutputProgressIndicator({
  product,
  status,
  isPlaying,
  cobotConfig,
}: Props) {
  const lastPhase = useRef(0);

  if (status === 'PICK_FROM_DRAWER_FAILED') {
    lastPhase.current = DRAWER;
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

      {product.config.AIRPURGE_BEFORE_OUTFEED ? (
        <ProgressIcon
          icon={AirIcon}
          status={getProgressStatusForPhase(
            AIRPURGE_BEFORE_OUTFEED,
            phase,
            isPlaying,
          )}
        />
      ) : null}

      <ProgressIcon
        icon={OutputIcon}
        status={
          status === 'PICK_FROM_MACHINE_FAILED'
            ? 'error'
            : getProgressStatusForPhase(OUTPUT, phase, isPlaying)
        }
      />

      {product.config.AIRPURGE_AFTER_OUTFEED ? (
        <ProgressIcon
          icon={AirIcon}
          status={getProgressStatusForPhase(
            AIRPURGE_AFTER_OUTFEED,
            phase,
            isPlaying,
          )}
        />
      ) : null}

      {product.config.CLEAN_PRODUCT ? (
        <ProgressIcon
          icon={ShowerOutlinedIcon}
          status={getProgressStatusForPhase(CLEAN, phase, isPlaying)}
        />
      ) : null}

      <ProgressIcon
        icon={
          product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION
            ? GpsFixedIcon
            : GridOnIcon
        }
        status={getProgressStatusForPhase(GRID, phase, isPlaying)}
        line={false}
      />
    </div>
  );
}
