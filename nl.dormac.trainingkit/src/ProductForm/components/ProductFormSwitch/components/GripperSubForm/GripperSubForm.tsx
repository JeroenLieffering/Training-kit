import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  InputField,
  Separator,
  SubTitle,
  SwitchField,
  Tabs,
  Title,
} from '../../../../../components';
import { CobotConfig } from '../../../../../core/models/cobot-config-types';
import { Product } from '../../../../../core/models/product-types';
import {
  getGripper1Info,
  getGripper2Info,
} from '../../../../../core/services/cobot-config-service';
import {
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../utils/form';
import { useValidateOnMount } from '../../../../../hooks/useValidateOnMount';
import gripperImage from './images/gripper.png';
import { useT } from '../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
  tab: GripperSubFormTab;
};

export type GripperSubFormTab = 'GRIPPER_1' | 'GRIPPER_2';

// All fields that are part of the gripper 1 tab
const GRIPPER_1_TAB_FIELDS: Path<Product>[] = [
  'config.GR1_CLAW_HEIGHT',
  'config.GR1_CLAW_DEPTH',
];

// All fields that are part of the gripper 2 tab
const GRIPPER_2_TAB_FIELDS: Path<Product>[] = [
  'config.USE_SECOND_GRIPPER',
  'config.GR2_CLAW_HEIGHT',
  'config.GR2_CLAW_DEPTH',
];

// All fields that are part of this sub form, used to show warning icon.
export const GRIPPER_SUB_FORM_FIELDS: Path<Product>[] = [
  ...GRIPPER_1_TAB_FIELDS,
  ...GRIPPER_2_TAB_FIELDS,
];

export function getGripperSubFormTabForField(
  name: Path<Product>,
): GripperSubFormTab {
  if (GRIPPER_2_TAB_FIELDS.includes(name)) {
    return 'GRIPPER_2';
  } else {
    return 'GRIPPER_1';
  }
}

export function GripperSubForm({ form, cobotConfig, tab }: Props) {
  const t = useT();

  useValidateOnMount(form);

  const useSecondGripper = form.watch('config.USE_SECOND_GRIPPER');

  const gripper1Info = getGripper1Info(cobotConfig);

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<Product>(errors);

  const gripper1Form = (
    <HalfWidthCenter>
      <SubTitle>
        {gripper1Info?.supplier.name} - {gripper1Info?.gripper.name}
      </SubTitle>

      <InputField
        register={() => form.register('config.GR1_CLAW_HEIGHT')}
        label={t('CLAW_HEIGHT')}
        addon={t('MM')}
      />

      <InputField
        register={() => form.register('config.GR1_CLAW_DEPTH')}
        label={t('CLAW_DEPTH')}
        addon={t('MM')}
      />
    </HalfWidthCenter>
  );

  return (
    <Container>
      <Title center>{t('GRIPPER')}</Title>

      {cobotConfig?.config.HAS_SECOND_GRIPPER || useSecondGripper ? (
        <Tabs
          initialTab={tab}
          tabs={[
            {
              id: 'GRIPPER_1',
              label: t('GRIPPER_NO_1'),
              warning: hasError(GRIPPER_1_TAB_FIELDS),
              content() {
                return gripper1Form;
              },
            },
            {
              id: 'GRIPPER_2',
              label: t('GRIPPER_NO_2'),
              warning: hasError(GRIPPER_2_TAB_FIELDS),
              content() {
                const gripper2Info = getGripper2Info(cobotConfig);

                return (
                  <HalfWidthCenter>
                    <SubTitle>
                      {gripper2Info?.supplier.name} -{' '}
                      {gripper2Info?.gripper.name}
                    </SubTitle>

                    <SwitchField
                      register={() =>
                        form.register('config.USE_SECOND_GRIPPER')
                      }
                      label={t('USE_SECOND_GRIPPER')}
                    />

                    {useSecondGripper ? (
                      <>
                        <InputField
                          register={() =>
                            form.register('config.GR2_CLAW_HEIGHT')
                          }
                          label={t('CLAW_HEIGHT')}
                          addon={t('MM')}
                        />
                        <InputField
                          register={() =>
                            form.register('config.GR2_CLAW_DEPTH')
                          }
                          label={t('CLAW_DEPTH')}
                          addon={t('MM')}
                        />
                      </>
                    ) : null}
                  </HalfWidthCenter>
                );
              },
            },
          ]}
        />
      ) : (
        gripper1Form
      )}

      <Separator orientation="horizontal" />

      <div className="tw-grid tw-gap-2 tw-place-items-center">
        <div>
          <p>A. {t('CLAW_HEIGHT')}</p>
          <p>B. {t('CLAW_DEPTH')}</p>
        </div>
        <img src={gripperImage} width={682 / 1.5} height={491 / 1.5} />
      </div>
    </Container>
  );
}
