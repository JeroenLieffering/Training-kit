import React from 'react';
import { MachineStatus } from './components/MachineStatus/MachineStatus';
import { DoorStatus } from './components/DoorsStatus';
import { GripperStatus } from './components/GripperStatus';
import { FabricationState } from '../../../../types';
import { Product } from '../../../../../core/models/product-types';
import { CobotConfig } from '../../../../../core/models/cobot-config-types';
import { MetaSuiteProgramState } from '../../../../../drl/main/types';
import { SpindleStatus } from './components/SpindleStatus';

type Props = {
  fabricationState: FabricationState;
  isPlaying: boolean;
  product: Product;
  cobotConfig: CobotConfig;
  status: MetaSuiteProgramState;
};

export function StatusIndicator({
  fabricationState,
  isPlaying,
  product,
  status,
  cobotConfig,
}: Props) {
  return (
    <div className="tw-flex tw-gap-4 tw-items-center tw-mr-[5px]">
      <GripperStatus
        gripperStatus={fabricationState.gripper1Status}
        isPlaying={isPlaying}
        roundProduct={product.config.ROUND_PRODUCT}
        gripper={1}
      />

      {product.config.USE_SECOND_GRIPPER ? (
        <GripperStatus
          gripperStatus={fabricationState.gripper2Status}
          isPlaying={isPlaying}
          roundProduct={product.config.ROUND_PRODUCT}
          gripper={2}
        />
      ) : null}

      {product.config.USE_SUB_SPINDLE ? (
        <SpindleStatus
          gripperStatus={fabricationState.subSpindleStatus}
          isPlaying={isPlaying}
          roundProduct={product.config.ROUND_PRODUCT}
          spindle="SUB"
        />
      ) : null}

      <SpindleStatus
        gripperStatus={fabricationState.mainSpindleStatus}
        isPlaying={isPlaying}
        roundProduct={product.config.ROUND_PRODUCT}
        spindle="MAIN"
      />

      <DoorStatus status={status} isPlaying={isPlaying} />
      <MachineStatus cobotConfig={cobotConfig} />
    </div>
  );
}
