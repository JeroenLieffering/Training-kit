import FactoryIcon from '@mui/icons-material/Factory';
import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';

import {
  Container,
  Empty,
  HalfWidthCenter,
  InputField,
  LeftRight,
  SelectField,
  Separator,
  SubTitle,
  SwitchField,
  Tabs,
  Title,
} from '../../../../../components';
import { CobotConfig } from '../../../../../core/models/cobot-config-types';
import { Product } from '../../../../../core/models/product-types';
import { useT } from '../../../../../hooks/useT';
import { useValidateOnMount } from '../../../../../hooks/useValidateOnMount';
import { BaseFormDescription } from '../../../../../shadcn';
import {
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../utils/form';
import machineImage from './images/machine.png';
import offsetImage from './images/offset.png';

export type MachineSubFormTab = 'SPINDLE' | 'PICK_AND_PLACE';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
  tab: MachineSubFormTab;
};

// All fields that are part of the spindle tab
const SPINDLE_TAB_FORM_FIELDS: Path<Product>[] = [
  'config.MAIN_CLAW_HEIGHT',
  'config.MAIN_CLAW_DEPTH',
  'config.USE_SUB_SPINDLE',
  'config.SUB_CLAW_HEIGHT',
  'config.SUB_CLAW_DEPTH',
];

// All fields that are part of the offset tab
const PICK_AND_PLACE_TAB_FORM_FIELDS: Path<Product>[] = [
  'config.MACHINE_PICK_POSITION_INDEX',
  'config.MACHINE_PLACE_POSITION_INDEX',
  'config.MACHINE_PICK_HEIGHT_OFFSET',
  'config.MACHINE_PICK_DEPTH_OFFSET',
  'config.MACHINE_PLACE_HEIGHT_OFFSET',
  'config.MACHINE_PLACE_DEPTH_OFFSET',
];

// All fields that are part of this sub form, used to show warning icon.
export const MACHINE_SUB_FORM_FIELDS: Path<Product>[] = [
  ...SPINDLE_TAB_FORM_FIELDS,
  ...PICK_AND_PLACE_TAB_FORM_FIELDS,
];

export function getMachineSubFormTabForField(
  name: Path<Product>,
): MachineSubFormTab {
  if (PICK_AND_PLACE_TAB_FORM_FIELDS.includes(name)) {
    return 'PICK_AND_PLACE';
  } else {
    return 'SPINDLE';
  }
}

export function MachineSubForm({ form, cobotConfig, tab }: Props) {
  const t = useT();

  useValidateOnMount(form);

  const useSubSpindle = form.watch('config.USE_SUB_SPINDLE');
  const machinePickPositionIndex = form.watch(
    'config.MACHINE_PICK_POSITION_INDEX',
  );
  const machinePlacePositionIndex = form.watch(
    'config.MACHINE_PLACE_POSITION_INDEX',
  );

  const isMill = cobotConfig.config.MACHINE_TYPE === 'MILL';

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<Product>(errors);

  const clawImage = (
    <>
      <Separator orientation="horizontal" />

      <div className="tw-grid tw-gap-2 tw-place-items-center">
        <div>
          <p>A. {t('CLAW_HEIGHT')}</p>
          <p>B. {t('CLAW_DEPTH')}</p>
        </div>
        <img src={machineImage} width={486 / 1.5} height={606 / 1.5} />
      </div>
    </>
  );

  return (
    <Container>
      <Title center>{t('MACHINE')}</Title>

      <Tabs
        initialTab={tab}
        tabs={[
          {
            id: 'SPINDLE',
            label: t('SPINDLE'),
            warning: hasError(SPINDLE_TAB_FORM_FIELDS),
            content() {
              const mainClawForm = (
                <>
                  <SubTitle>{t('MAIN_SPINDLE_CLAW')}</SubTitle>

                  <InputField
                    register={() => form.register('config.MAIN_CLAW_HEIGHT')}
                    label={t('CLAW_HEIGHT')}
                    addon={t('MM')}
                  />

                  <InputField
                    register={() => form.register('config.MAIN_CLAW_DEPTH')}
                    label={t('CLAW_DEPTH')}
                    addon={t('MM')}
                  />
                </>
              );

              if (
                cobotConfig?.config.MACHINE_HAS_SUB_SPINDLE ||
                useSubSpindle
              ) {
                return (
                  <div className="tw-grid tw-gap-4">
                    <LeftRight
                      left={mainClawForm}
                      right={
                        <>
                          <div className="tw-flex tw-justify-between tw-items-center">
                            <SubTitle>{t('SUB_SPINDLE_CLAW')}</SubTitle>
                            <SwitchField
                              register={() =>
                                form.register('config.USE_SUB_SPINDLE', {
                                  deps: ['config.AIRPURGE_BEFORE_INFEED'],
                                })
                              }
                              label={t('USE')}
                            />
                          </div>

                          {useSubSpindle ? (
                            <>
                              <InputField
                                register={() =>
                                  form.register('config.SUB_CLAW_HEIGHT')
                                }
                                label={t('CLAW_HEIGHT')}
                                addon={t('MM')}
                              />

                              <InputField
                                register={() =>
                                  form.register('config.SUB_CLAW_DEPTH')
                                }
                                label={t('CLAW_DEPTH')}
                                addon={t('MM')}
                              />
                            </>
                          ) : (
                            <Empty
                              icon={FactoryIcon}
                              message={t('PRODUCT_DOES_NOT_USE_SUB_SPINDLE')}
                            />
                          )}
                        </>
                      }
                    />
                    {clawImage}
                  </div>
                );
              } else {
                return (
                  <HalfWidthCenter>
                    {mainClawForm}
                    {clawImage}
                  </HalfWidthCenter>
                );
              }
            },
          },
          {
            id: 'PICK_AND_PLACE',
            label: t('PICK_AND_PLACE'),
            warning: hasError(PICK_AND_PLACE_TAB_FORM_FIELDS),
            content() {
              return (
                <div className="tw-grid tw-gap-4">
                  <LeftRight
                    left={
                      <>
                        <SubTitle>{t('PICK')}</SubTitle>

                        {isMill || machinePickPositionIndex !== '0' ? (
                          <SelectField
                            register={() =>
                              form.register(
                                'config.MACHINE_PICK_POSITION_INDEX',
                              )
                            }
                            label={t('MACHINE_PICK_POSITION')}
                            options={cobotConfig.config.MACHINE_PICK_POSITIONS.map(
                              (machinePosition, index) => ({
                                value: index.toString(),
                                label: machinePosition.name,
                              }),
                            )}
                          />
                        ) : null}

                        <InputField
                          register={() =>
                            form.register('config.MACHINE_PICK_HEIGHT_OFFSET')
                          }
                          label={t('HEIGHT_OFFSET')}
                          addon={t('MM')}
                        />

                        <InputField
                          register={() =>
                            form.register('config.MACHINE_PICK_DEPTH_OFFSET')
                          }
                          label={t('DEPTH_OFFSET')}
                          addon={t('MM')}
                        />
                      </>
                    }
                    right={
                      <>
                        <SubTitle>{t('PLACE')}</SubTitle>

                        {isMill || machinePlacePositionIndex !== '0' ? (
                          <SelectField
                            register={() =>
                              form.register(
                                'config.MACHINE_PLACE_POSITION_INDEX',
                              )
                            }
                            label={t('MACHINE_PLACE_POSITION')}
                            options={cobotConfig.config.MACHINE_PLACE_POSITIONS.map(
                              (machinePosition, index) => ({
                                value: index.toString(),
                                label: machinePosition.name,
                              }),
                            )}
                          />
                        ) : null}

                        <InputField
                          register={() =>
                            form.register('config.MACHINE_PLACE_HEIGHT_OFFSET')
                          }
                          label={t('HEIGHT_OFFSET')}
                          addon={t('MM')}
                        />

                        <InputField
                          register={() =>
                            form.register('config.MACHINE_PLACE_DEPTH_OFFSET')
                          }
                          label={t('DEPTH_OFFSET')}
                          addon={t('MM')}
                        />
                      </>
                    }
                  />

                  <Separator orientation="horizontal" />

                  <div className="tw-grid tw-gap-2 tw-place-items-center">
                    <BaseFormDescription className="tw-px-16 tw-text-center">
                      {t('MACHINE_OFFSET_EXPLANATION')}
                    </BaseFormDescription>

                    <div>
                      <p>A. {t('HEIGHT')}</p>
                      <p>B. {t('DEPTH')}</p>
                    </div>
                    <img
                      src={offsetImage}
                      width={226 / 1.5}
                      height={398 / 1.5}
                    />
                  </div>
                </div>
              );
            },
          },
        ]}
      />
    </Container>
  );
}
