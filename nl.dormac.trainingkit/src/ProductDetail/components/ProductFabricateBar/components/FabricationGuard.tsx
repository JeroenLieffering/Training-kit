import { SafetyMode } from 'dart-api';
import React, { ReactNode } from 'react';
import { Alert } from '../../../../components';
import {
  AIR_PURGE_TCP,
  GRIPPER_1_TCP,
  GRIPPER_2_TCP,
  TOOL_WEIGHT_NAME,
} from '../../../../config';
import { Product } from '../../../../core/models/product-types';
import { useIsServoOn } from '../../../../hooks/useIsServoOn';
import { useIsUsingUserHomePosition } from '../../../../hooks/useIsUsingUserHomePosition';
import { useSafetyMode } from '../../../../hooks/useSafetyMode';
import { useT } from '../../../../hooks/useT';
import { useTCPStatus } from '../../../../hooks/useTCPStatus';
import { useToolWeight } from '../../../../hooks/useToolWeight';

type Props = {
  product: Product;
  children: () => ReactNode;
};

export function FabricationGuard({ children, product }: Props) {
  const t = useT();

  const isServoOn = useIsServoOn();
  const tcpStatus = useTCPStatus();
  const toolWeight = useToolWeight();
  const isUsingUserHomePosition = useIsUsingUserHomePosition();
  const safetyMode = useSafetyMode();

  if (product.state === 'deactivated') {
    return (
      <Alert
        title={t('PRODUCT_DEACTIVATED_CANNOT_FABRICATE')}
        variant="destructive"
      />
    );
  }

  if (product.state === 'invalidated') {
    return (
      <Alert
        title={t('PRODUCT_INVALID_CANNOT_FABRICATE')}
        variant="destructive"
      />
    );
  }

  if (!tcpStatus.gripper1) {
    return (
      <Alert
        title={t('TCP_NOT_CONFIGURED', { name: GRIPPER_1_TCP })}
        variant="destructive"
      />
    );
  }

  if (product.config.USE_SECOND_GRIPPER && !tcpStatus.gripper2) {
    return (
      <Alert
        title={t('TCP_NOT_CONFIGURED', { name: GRIPPER_2_TCP })}
        variant="destructive"
      />
    );
  }

  const usesAirpurge =
    product.config.AIRPURGE_AFTER_OUTFEED ||
    product.config.AIRPURGE_BEFORE_INFEED;

  if (usesAirpurge && !tcpStatus.airpurge) {
    return (
      <Alert
        title={t('TCP_NOT_CONFIGURED', { name: AIR_PURGE_TCP })}
        variant="destructive"
      />
    );
  }

  if (!toolWeight) {
    return (
      <Alert
        title={t('TOOL_WEIGHT_NOT_CONFIGURED', {
          name: TOOL_WEIGHT_NAME,
        })}
        variant="destructive"
      />
    );
  }

  if (!isUsingUserHomePosition) {
    return (
      <Alert
        title={t('USER_HOME_POSITION_NOT_CONFIGURED')}
        variant="destructive"
      />
    );
  }

  /* 
    Check safety and servo last!
    
    This needs to happen because the "Robot Parameters" app requires 
    "MANUAL" mode to function, in order to solve missing TCP and 
    home position errors.
    
    This conflicts directly with the MetaSuite requiring "AUTO" mode 
    for fabrication.

    By rendering the safety and servo errors last the user will not 
    have to switch between "MANUAL" and "AUTO" mode so much, making 
    the process a little smoother.
 */

  if (safetyMode !== SafetyMode.AUTO) {
    return (
      <Alert
        title={t('ROBOT_MODE_NOT_AUTO_MESSAGE_FABRICATION')}
        variant="destructive"
      />
    );
  }

  if (!isServoOn) {
    return <Alert title={t('SERVO_IS_OFF_MESSAGE')} variant="destructive" />;
  }

  return <>{children()}</>;
}
