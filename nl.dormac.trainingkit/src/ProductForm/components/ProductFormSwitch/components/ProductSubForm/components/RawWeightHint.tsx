import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';

import { CobotConfig } from '../../../../../../core/models/cobot-config-types';
import {
  getGripper1Info,
  maxCarryWeight,
} from '../../../../../../core/services/cobot-config-service';
import { getBoundsRawMaterialWeight } from '../../../../../../core/services/product-service';
import { CobotInfo } from '../../../../../../types';
import { useT } from '../../../../../../hooks/useT';
import { useToolWeight } from '../../../../../../hooks/useToolWeight';

type Props = {
  cobotInfo: CobotInfo;
  cobotConfig: CobotConfig;
};

export function RawWeightHint({ cobotConfig, cobotInfo }: Props) {
  const t = useT();
  const toolWeightStr = useToolWeight() ?? '0';
  const toolWeight = parseFloat(toolWeightStr);

  const cobotCarryWeight = maxCarryWeight(cobotInfo, toolWeight);
  const gripper1CarryWeight =
    getGripper1Info(cobotConfig)?.gripper.carryWeight ?? 0;

  // If the gripper can carry less than the cobot, it becomes
  // the max.
  if (gripper1CarryWeight < cobotCarryWeight) {
    return (
      <dl className="tw-grid tw-gap-2">
        <div className="tw-flex tw-gap-1">
          <dt className="tw-text-right tw-w-2/3 tw-font-semibold">
            {t('COBOT_CARRY_WEIGHT')}:
          </dt>
          <dd>
            {cobotCarryWeight}
            {t('KG')}
          </dd>
        </div>

        <div className="tw-flex tw-gap-1">
          <dt className="tw-text-right tw-w-2/3 tw-font-semibold">
            {t('GRIPPER_1_WEIGHT')}:
          </dt>
          <dd>
            {gripper1CarryWeight}
            {t('KG')}
          </dd>
        </div>

        <div className="tw-flex tw-justify-end tw-border-b-2 tw-border-solid tw-border-black" />

        <div className="tw-flex tw-gap-1">
          <dt className="tw-text-right tw-w-2/3 tw-font-semibold">
            {t('MAX_PRODUCT_WEIGHT')}:
          </dt>
          <dd>
            {gripper1CarryWeight}
            {t('KG')}
          </dd>
        </div>
      </dl>
    );
  } else {
    return (
      <dl className="tw-grid tw-gap-2">
        <div className="tw-flex tw-gap-1">
          <dt className="tw-text-right tw-w-2/3 tw-font-semibold">
            {t('COBOT_CARRY_WEIGHT')}:
          </dt>
          <dd>
            {cobotInfo.carryWeightMax}
            {t('KG')}
          </dd>
        </div>

        <div className="tw-flex tw-gap-1">
          <dt className="tw-text-right tw-w-2/3 tw-font-semibold">
            {t('TOOL_WEIGHT')}:
          </dt>
          <dd>
            {toolWeight}
            {t('KG')}
          </dd>
        </div>

        {/* {cobotConfig.config.HAS_SECOND_GRIPPER ? (
          <div className="tw-flex tw-gap-1">
            <dt className="tw-text-right tw-w-2/3 tw-font-semibold">
              {t('GRIPPER_2_WEIGHT')}:
            </dt>
            <dd>
              {getToolWeightGripper2(cobotConfig)}
              {t('KG')}
            </dd>
          </div>
        ) : null} */}

        <div className="tw-flex tw-justify-end tw-border-b-2 tw-border-solid tw-border-black">
          <RemoveIcon className="tw-mr-12" />
        </div>

        <div className="tw-flex tw-gap-1">
          <dt className="tw-text-right tw-w-2/3 tw-font-semibold">
            {t('MAX_PRODUCT_WEIGHT')}:
          </dt>
          <dd>
            {cobotCarryWeight}
            {t('KG')}
          </dd>
        </div>
      </dl>
    );
  }
}
