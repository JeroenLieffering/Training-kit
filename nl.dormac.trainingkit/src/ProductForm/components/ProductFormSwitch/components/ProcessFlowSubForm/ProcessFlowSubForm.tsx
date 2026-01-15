import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';

import {
  Container,
  HalfWidthCenter,
  Help,
  InputHierarchy,
  SubTitle,
  SwitchField,
  SwitchWithInputField,
  SwitchWithSelectField,
  Title,
} from '../../../../../components';
import { CobotConfig } from '../../../../../core/models/cobot-config-types';
import { Product } from '../../../../../core/models/product-types';
import { isConfiguredWithStaticEasyLoaderWithSecondDrawer } from '../../../../../core/services/cobot-config-service';
import { useT } from '../../../../../hooks/useT';
import { useValidateOnMount } from '../../../../../hooks/useValidateOnMount';
import { ProcessModeSelection } from './components/ProcessModeSelection';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
};

// All fields that are part of this sub form, used to show warning icon.
export const PROCESS_FLOW_SUB_FORM_FIELDS: Path<Product>[] = [
  'config.IO_MODE',
  'config.AIRPURGE_BEFORE_INFEED',
  'config.FORCE_INFEED',
  'config.FORCE_FEEDING_NEWTON',
  'config.PUSH_AFTER_PLACE',
  'config.FORCE_PUSHING_NEWTON',
  'config.PUSH_GRIPPER_CLOSED',
  'config.AIRPURGE_BEFORE_OUTFEED',
  'config.AIRPURGE_AFTER_OUTFEED',
  'config.CLEAN_PRODUCT',
  'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
  'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
  'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX',
];

export function ProcessFlowSubForm({ form, cobotConfig }: Props) {
  const t = useT();

  useValidateOnMount(form);

  const ioMode = form.watch('config.IO_MODE');
  const pushAfterPlace = form.watch('config.PUSH_AFTER_PLACE');

  const placeFinishedProductOnSecondDrawer = form.watch(
    'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
  );
  const showPlaceFinishedProductOnSecondDrawer =
    isConfiguredWithStaticEasyLoaderWithSecondDrawer(cobotConfig) ||
    placeFinishedProductOnSecondDrawer;

  const placeFinishedProductOnDropOffPosition = form.watch(
    'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
  );
  const showPlaceFinishProductOnDropOffPosition =
    cobotConfig.config.DROP_OFF_POSITIONS.length > 0 ||
    placeFinishedProductOnDropOffPosition;

  return (
    <Container>
      <Title center>{t('PROCESS_FLOW')}</Title>

      <HalfWidthCenter>
        <ProcessModeSelection form={form} />

        {ioMode === 'INPUT' || ioMode === 'INPUT_OUTPUT' ? (
          <>
            <SubTitle>{t('INPUT_OPTIONS')}</SubTitle>

            <SwitchField
              register={() =>
                form.register('config.AIRPURGE_BEFORE_INFEED', {
                  deps: ['config.USE_SUB_SPINDLE'],
                })
              }
              label={t('AIRPURGE_BEFORE_INFEED')}
              help={<Help text={t('AIRPURGE_BEFORE_INFEED_HELP')} />}
            />

            <SwitchWithInputField
              registerSwitch={() => form.register('config.FORCE_INFEED')}
              labelSwitch={t('FORCE_INFEED_WITH')}
              registerInput={() => form.register('config.FORCE_FEEDING_NEWTON')}
              labelInput={t('N')}
              help={<Help text={t('FORCE_INFEED_WITH_HELP')} />}
            />

            <InputHierarchy
              main={
                <SwitchWithInputField
                  registerSwitch={() =>
                    form.register('config.PUSH_AFTER_PLACE')
                  }
                  labelSwitch={t('PUSH_AFTER_PLACEMENT_WITH')}
                  registerInput={() =>
                    form.register('config.FORCE_PUSHING_NEWTON')
                  }
                  labelInput={t('N')}
                  help={<Help text={t('PUSH_AFTER_PLACEMENT_WITH_HELP')} />}
                />
              }
              showSub={pushAfterPlace}
              sub={
                <SwitchField
                  register={() => form.register('config.PUSH_GRIPPER_CLOSED')}
                  label={t('PUSH_WITH_CLOSED_GRIPPER')}
                  help={<Help text={t('PUSH_WITH_CLOSED_GRIPPER_HELP')} />}
                />
              }
            />
          </>
        ) : null}

        {ioMode === 'OUTPUT' || ioMode === 'INPUT_OUTPUT' ? (
          <>
            <SubTitle>{t('OUTPUT_OPTIONS')}</SubTitle>

            <SwitchField
              register={() => form.register('config.AIRPURGE_BEFORE_OUTFEED')}
              label={t('AIRPURGE_BEFORE_OUTFEED')}
              help={<Help text={t('AIRPURGE_BEFORE_OUTFEED_HELP')} />}
            />

            <SwitchField
              register={() => form.register('config.AIRPURGE_AFTER_OUTFEED')}
              label={t('AIRPURGE_AFTER_OUTFEED')}
              help={<Help text={t('AIRPURGE_AFTER_OUTFEED_HELP')} />}
            />

            {/* <SwitchField
              register={() => form.register('config.CLEAN_PRODUCT')}
              label={t('CLEAN_PRODUCT')}
              help={<Help text={t('CLEAN_PRODUCT_HELP')} />}
            /> */}

            {showPlaceFinishProductOnDropOffPosition ? (
              <SwitchWithSelectField
                registerSwitch={() =>
                  form.register(
                    'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
                  )
                }
                registerSelect={() =>
                  form.register(
                    'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX',
                  )
                }
                labelSwitch={t('PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION')}
                labelSelect=""
                help={
                  <Help
                    text={t('PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_HELP')}
                  />
                }
                options={cobotConfig.config.DROP_OFF_POSITIONS.map(
                  (dropOffPosition, index) => ({
                    value: index.toString(),
                    label: dropOffPosition.name,
                  }),
                )}
              />
            ) : null}

            {showPlaceFinishedProductOnSecondDrawer ? (
              <SwitchField
                register={() =>
                  form.register(
                    'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                  )
                }
                label={t('PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER')}
                help={
                  <Help
                    text={t('PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_HELP')}
                  />
                }
              />
            ) : null}
          </>
        ) : null}
      </HalfWidthCenter>
    </Container>
  );
}
