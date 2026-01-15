import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  InputField,
  PoseField,
  PosesField,
  RadioField,
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

// export type CobotDrawerSubFormTab = 'CONFIG' | 'PATH' | 'GRIPPER';
export type CobotDrawerSubFormTab = 'PATH' | 'GRIPPER';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  tab: CobotDrawerSubFormTab;
};

const CONFIG_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.GRID_TYPE',
  'config.STATIC_GRID_INDEX',
  'config.GRID_X_OFFSET',
  'config.GRID_Y_OFFSET',
  'config.X_OFFSET_ORIGIN',
  'config.Y_OFFSET_ORIGIN',
  'config.Z_OFFSET_ORIGIN',
  'config.X_FIRST_SPOT',
  'config.Y_FIRST_SPOT',
];

const PATH_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
];

const GRIPPER_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.GRIPPER1_AT_DRAWER_POSITION',
  'config.GRIPPER2_AT_DRAWER_POSITION',
];

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_DRAWER_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  // ...CONFIG_TAB_FORM_FIELDS,
  ...PATH_TAB_FORM_FIELDS,
  ...GRIPPER_FORM_FIELDS,
];

export function getCobotDrawerSubFormTabForField(
  name: Path<CobotConfig>,
): CobotDrawerSubFormTab {
  // if (CONFIG_TAB_FORM_FIELDS.includes(name)) {
  //   return 'CONFIG';
  // }
  if (GRIPPER_FORM_FIELDS.includes(name)) {
    return 'GRIPPER';
  } else {
    return 'PATH';
  }
}

export function CobotDrawerSubForm({ form, tab }: Props) {
  const t = useT();

  const gridType = form.watch('config.GRID_TYPE');
  const hasSecondGripper = form.watch('config.HAS_SECOND_GRIPPER');

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<CobotConfig>(errors);

  const staticGrids = form.watch('config.STATIC_GRIDS');

  return (
    <Container>
      <Title center>{t('DRAWER')}</Title>

      <Tabs
        initialTab={tab}
        tabs={[
          // {
          //   id: 'CONFIG',
          //   label: t('CONFIG'),
          //   warning: hasError(CONFIG_TAB_FORM_FIELDS),
          //   content() {
          //     return (
          //       <HalfWidthCenter>
          //         <>
          //           <RadioField
          //             register={() => form.register('config.GRID_TYPE')}
          //             label={t('GRID_TYPE')}
          //             options={[
          //               {
          //                 id: 'STATIC',
          //                 value: 'STATIC',
          //                 label: t('STATIC_GRID'),
          //               },
          //               {
          //                 id: 'PINNED',
          //                 value: 'PINNED',
          //                 label: t('PINNED_GRID'),
          //               },
          //             ]}
          //           />

          //           {gridType === 'STATIC' ? (
          //             <SelectField
          //               register={() =>
          //                 form.register('config.STATIC_GRID_INDEX')
          //               }
          //               label={t('STATIC_GRID_CONFIGURATION')}
          //               options={staticGrids.map((staticGrid, index) => ({
          //                 value: index.toString(),
          //                 label: staticGrid.name,
          //               }))}
          //             />
          //           ) : (
          //             <>
          //               <InputField
          //                 register={() => form.register('config.GRID_X_OFFSET')}
          //                 label={t('X_OFFSET')}
          //                 addon={t('MM')}
          //               />

          //               <InputField
          //                 register={() => form.register('config.GRID_Y_OFFSET')}
          //                 label={t('Y_OFFSET')}
          //                 addon={t('MM')}
          //               />

          //               <InputField
          //                 register={() =>
          //                   form.register('config.X_OFFSET_ORIGIN')
          //                 }
          //                 label={t('X_ORIGIN_OFFSET')}
          //                 addon={t('MM')}
          //               />
          //               <InputField
          //                 register={() =>
          //                   form.register('config.Y_OFFSET_ORIGIN')
          //                 }
          //                 label={t('Y_ORIGIN_OFFSET')}
          //                 addon={t('MM')}
          //               />
          //               <InputField
          //                 register={() =>
          //                   form.register('config.Z_OFFSET_ORIGIN')
          //                 }
          //                 label={t('Z_ORIGIN_OFFSET')}
          //                 addon={t('MM')}
          //               />
          //               <InputField
          //                 register={() => form.register('config.X_FIRST_SPOT')}
          //                 label={t('X_FIRST_SPOT')}
          //                 addon={t('MM')}
          //               />
          //               <InputField
          //                 register={() => form.register('config.Y_FIRST_SPOT')}
          //                 label={t('Y_FIRST_SPOT')}
          //                 addon={t('MM')}
          //               />
          //             </>
          //           )}
          //         </>
          //       </HalfWidthCenter>
          //     );
          //   },
          // },
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
                        'config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
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
                      form.register('config.GRIPPER1_AT_DRAWER_POSITION')
                    }
                    label={t('GRIPPER_AT_DRAWER_POSITION', {
                      name: t('GRIPPER_NO_1'),
                    })}
                    mode="JOINT"
                  />

                  {hasSecondGripper ? (
                    <PoseField
                      register={() =>
                        form.register('config.GRIPPER2_AT_DRAWER_POSITION')
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
