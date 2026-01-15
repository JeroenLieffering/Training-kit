import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  InputField,
  PoseField,
  PosesField,
  RadioField,
  Separator,
  SubTitle,
  SwitchField,
  Tabs,
  Title,
  Empty,
} from '../../../../../../../components';
import {
  CobotConfig,
  MachineType,
} from '../../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../../hooks/useT';
import {
  getErrorNames,
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../../../utils/form';
import { MachinePositionsField } from './components/MachinePositionsField';

export type CobotMachineSubFormTab =
  | 'CONFIG'
  | 'PLACE'
  | 'PICK'
  | 'AIRPURGE'
  | 'CLEAN';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  tab: CobotMachineSubFormTab;
};

const CONFIG_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.MACHINE_TYPE',
  'config.MACHINE_HAS_SUB_SPINDLE',
  'config.MACHINE_MAX_FEED_HEIGHT',
  'config.MACHINE_MAX_FEED_WIDTH',
  'config.MACHINE_MAX_FEED_LENGTH',
];

const PICK_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.MACHINE_PICK_POSITIONS',
  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
  'config.TEACH_CONFIG_PICK_SPINDLE_HEIGHT',
  'config.TEACH_CONFIG_PICK_SPINDLE_DEPTH',
  'config.TEACH_CONFIG_GR_FINISHED_HEIGHT',
  'config.TEACH_CONFIG_GR_FINISHED_DEPTH',
];

const PLACE_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.MACHINE_PLACE_POSITIONS',
  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
  'config.TEACH_CONFIG_PLACE_SPINDLE_HEIGHT',
  'config.TEACH_CONFIG_PLACE_SPINDLE_DEPTH',
  'config.TEACH_CONFIG_GR_RAW_HEIGHT',
  'config.TEACH_CONFIG_GR_RAW_DEPTH',
];

// const AIRPURGE_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
//   'config.AIRPURGE_AT_MAIN_CLAW',
//   'config.AIRPURGE_AT_SUB_CLAW',
//   'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW',
//   'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW',
// ];

const AIRPURGE_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
  'config.AIRPURGE_BEFORE_OUTFEED_POSITION',
  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
  'config.AIRPURGE_BEFORE_INFEED_POSITION',
];

const CLEAN_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
  'config.CLEAN_PRODUCT_POSITION',
];

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_MACHINE_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  ...CONFIG_TAB_FORM_FIELDS,
  ...PLACE_TAB_FORM_FIELDS,
  ...PICK_TAB_FORM_FIELDS,
  ...AIRPURGE_TAB_FORM_FIELDS,
  ...CLEAN_TAB_FORM_FIELDS,
];

export function getCobotMachineSubFormTabForField(
  name: Path<CobotConfig>,
): CobotMachineSubFormTab {
  if (
    PLACE_TAB_FORM_FIELDS.includes(name) ||
    name.startsWith('config.MACHINE_PLACE_POSITIONS')
  ) {
    return 'PLACE';
  } else if (
    PICK_TAB_FORM_FIELDS.includes(name) ||
    name.startsWith('config.MACHINE_PICK_POSITIONS')
  ) {
    return 'PICK';
  } else if (AIRPURGE_TAB_FORM_FIELDS.includes(name)) {
    return 'AIRPURGE';
  } else if (CLEAN_TAB_FORM_FIELDS.includes(name)) {
    return 'CLEAN';
  }

  return 'CONFIG';
}

export function CobotMachineSubForm({ form, tab }: Props) {
  const t = useT();

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const errorNames = getErrorNames(errors);
  const hasError = makeHasError<CobotConfig>(errors);

  const machineType = form.watch('config.MACHINE_TYPE');
  const hasSubSpindle = form.watch('config.MACHINE_HAS_SUB_SPINDLE');

  const showSubSpindle = machineType === 'LATHE' || hasSubSpindle;

  const tabs = [
    {
      id: 'CONFIG',
      label: t('CONFIG'),
      warning: hasError(CONFIG_TAB_FORM_FIELDS),
      content() {
        return (
          <HalfWidthCenter>
            <SubTitle>{t('MACHINE_CONFIG')}</SubTitle>

            {showSubSpindle ? (
              <SwitchField
                register={() => form.register('config.MACHINE_HAS_SUB_SPINDLE')}
                label={t('MACHINE_HAS_SUB_SPINDLE')}
              />
            ) : null}

            <InputField
              register={() => form.register('config.MACHINE_MAX_FEED_HEIGHT')}
              label={t('MACHINE_MAX_FEED_HEIGHT')}
              addon={t('MM')}
            />

            <InputField
              register={() => form.register('config.MACHINE_MAX_FEED_WIDTH')}
              label={t('MACHINE_MAX_FEED_WIDTH')}
              addon={t('MM')}
            />

            <InputField
              register={() => form.register('config.MACHINE_MAX_FEED_LENGTH')}
              label={t('MACHINE_MAX_FEED_LENGTH')}
              addon={t('MM')}
            />
          </HalfWidthCenter>
        );
      },
    },

    {
      id: 'MAIN_CLAW',
      label: t('MAIN_CLAW'),
      warning:
        hasError(PLACE_TAB_FORM_FIELDS) ||
        errorNames.some((error) =>
          error.startsWith('config.MACHINE_PLACE_POSITIONS'),
        ),
      content() {
        return (
          <HalfWidthCenter>
            <SubTitle>{t('MAIN_CLAW')}</SubTitle>

            <PosesField
              register={() =>
                form.register(
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
                )
              }
              label={t('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE')}
              mode="JOINT"
              min={0}
              max={5}
            />

            {machineType === 'LATHE' ? (
              <PoseField
                register={() =>
                  form.register('config.MACHINE_PLACE_POSITIONS.0.position')
                }
                label={t('MACHINE_PLACE_POSITION')}
                mode="TASK"
              />
            ) : (
              <MachinePositionsField
                form={form}
                name="config.MACHINE_PLACE_POSITIONS"
                label={t('MACHINE_PLACE_POSITIONS')}
              />
            )}
          </HalfWidthCenter>
        );
      },
    },
  ];

  if (hasSubSpindle) {
    tabs.push({
      id: 'SUB_CLAW',
      label: t('SUB_CLAW'),
      warning:
        hasError(PICK_TAB_FORM_FIELDS) ||
        errorNames.some((error) =>
          error.startsWith('config.MACHINE_PICK_POSITIONS'),
        ),
      content() {
        return (
          <HalfWidthCenter>
            <SubTitle>{t('SUB_CLAW')}</SubTitle>

            <PosesField
              register={() =>
                form.register(
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
                )
              }
              label={t('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK')}
              mode="JOINT"
              min={0}
              max={5}
            />

            {machineType === 'LATHE' ? (
              <PoseField
                register={() =>
                  form.register('config.MACHINE_PICK_POSITIONS.0.position')
                }
                label={t('MACHINE_PICK_POSITION')}
                mode="TASK"
              />
            ) : (
              <MachinePositionsField
                form={form}
                name="config.MACHINE_PICK_POSITIONS"
                label={t('MACHINE_PICK_POSITIONS')}
              />
            )}
          </HalfWidthCenter>
        );
      },
    });
  }

  tabs.push({
    id: 'AIRPURGE',
    label: t('AIRPURGE'),
    warning: hasError(AIRPURGE_TAB_FORM_FIELDS),
    content() {
      return (
        <HalfWidthCenter>
          <SubTitle>{t('MAIN_CLAW')}</SubTitle>

          <PosesField
            register={() =>
              form.register(
                'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
              )
            }
            label={t(
              'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
            )}
            mode="JOINT"
            min={0}
            max={5}
          />

          <InputField
            register={() =>
              form.register('config.AIRPURGE_MAIN_CLAW_POSITION_ANGLE')
            }
            label={t('AIRPURGE_ANGLE_MAIN_CLAW')}
            addon={t('DEGREE')}
          />

          <InputField
            register={() =>
              form.register('config.AIRPURGE_MAIN_CLAW_POSITION_DISTANCE')
            }
            label={t('AIRPURGE_DISTANCE_MAIN_CLAW')}
            addon={t('MM')}
          />

          {hasSubSpindle ? (
            <Container>
              <Separator orientation="horizontal" />

              <SubTitle>{t('SUB_CLAW')}</SubTitle>

              <PosesField
                register={() =>
                  form.register(
                    'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
                  )
                }
                label={t(
                  'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
                )}
                mode="JOINT"
                min={0}
                max={5}
              />
              <InputField
                register={() =>
                  form.register('config.AIRPURGE_SUB_CLAW_POSITION_ANGLE')
                }
                label={t('AIRPURGE_ANGLE_SUB_CLAW')}
                addon={t('DEGREE')}
              />

              <InputField
                register={() =>
                  form.register('config.AIRPURGE_SUB_CLAW_POSITION_DISTANCE')
                }
                label={t('AIRPURGE_DISTANCE_SUB_CLAW')}
                addon={t('MM')}
              />
            </Container>
          ) : null}
        </HalfWidthCenter>
      );
    },
  });

  return (
    <Container>
      <Title center>{t('MACHINE')}</Title>
      <Tabs initialTab={tab} tabs={tabs} />
    </Container>
  );
}
