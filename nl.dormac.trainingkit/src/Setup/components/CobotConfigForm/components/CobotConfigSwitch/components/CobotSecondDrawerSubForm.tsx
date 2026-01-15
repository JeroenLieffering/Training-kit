import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  PoseField,
  PosesField,
  SelectField,
  Tabs,
  Title,
} from '../../../../../../components';
import { CobotConfig } from '../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../hooks/useT';
import {
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../../utils/form';

export type CobotSecondDrawerSubFormTab = 'CONFIG' | 'PATH' | 'GRIPPER';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  tab: CobotSecondDrawerSubFormTab;
};

const CONFIG_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX',
];

const PATH_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
];

const GRIPPER_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION',
  'config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION',
];

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_SECOND_DRAWER_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  ...CONFIG_TAB_FORM_FIELDS,
  ...PATH_TAB_FORM_FIELDS,
  ...GRIPPER_FORM_FIELDS,
];

export function getCobotSecondDrawerSubFormTabForField(
  name: Path<CobotConfig>,
): CobotSecondDrawerSubFormTab {
  if (CONFIG_TAB_FORM_FIELDS.includes(name)) {
    return 'CONFIG';
  }
  if (GRIPPER_FORM_FIELDS.includes(name)) {
    return 'GRIPPER';
  } else {
    return 'PATH';
  }
}

export function CobotSecondDrawerSubForm({ form, tab }: Props) {
  const t = useT();

  const hasSecondGripper = form.watch('config.HAS_SECOND_GRIPPER');

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<CobotConfig>(errors);

  const staticGrids = form.watch('config.STATIC_GRIDS');

  return (
    <Container>
      <Title center>{t('SECOND_DRAWER')}</Title>

      <Tabs
        initialTab={tab}
        tabs={[
          {
            id: 'CONFIG',
            label: t('CONFIG'),
            warning: hasError(CONFIG_TAB_FORM_FIELDS),
            content() {
              return (
                <HalfWidthCenter>
                  <SelectField
                    register={() =>
                      form.register(
                        'config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX',
                      )
                    }
                    label={t('STATIC_GRID_CONFIGURATION')}
                    options={staticGrids.map((staticGrid, index) => ({
                      value: index.toString(),
                      label: staticGrid.name,
                    }))}
                  />
                </HalfWidthCenter>
              );
            },
          },
          {
            id: 'PATH',
            label: t('PATH'),
            warning: hasError(PATH_TAB_FORM_FIELDS),
            content() {
              return (
                <HalfWidthCenter>
                  <PosesField
                    register={() =>
                      form.register(
                        'config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                      )
                    }
                    label={t('PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR')}
                    mode="JOINT"
                    min={1}
                    max={10}
                  />
                </HalfWidthCenter>
              );
            },
          },
          {
            id: 'GRIPPER',
            label: t('GRIPPER'),
            warning: hasError(PATH_TAB_FORM_FIELDS),
            content() {
              return (
                <HalfWidthCenter>
                  <PoseField
                    register={() =>
                      form.register(
                        'config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION',
                      )
                    }
                    label={t('GRIPPER_AT_DRAWER_POSITION', {
                      name: t('GRIPPER_NO_1'),
                    })}
                    mode="JOINT"
                  />

                  {hasSecondGripper ? (
                    <PoseField
                      register={() =>
                        form.register(
                          'config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION',
                        )
                      }
                      label={t('GRIPPER_AT_DRAWER_POSITION', {
                        name: t('GRIPPER_NO_2'),
                      })}
                      mode="JOINT"
                    />
                  ) : null}
                </HalfWidthCenter>
              );
            },
          },
        ]}
      />
    </Container>
  );
}
