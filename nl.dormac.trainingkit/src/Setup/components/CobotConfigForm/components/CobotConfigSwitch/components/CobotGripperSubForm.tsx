import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  Empty,
  HalfWidthCenter,
  MultiCheckboxField,
  SelectField,
  SwitchField,
  Tabs,
  Title,
} from '../../../../../../components';
import { GRIPPER_SUPPLIERS } from '../../../../../../config';
import { CobotConfig } from '../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../hooks/useT';
import { GripperSupplier } from '../../../../../../types';
import {
  getValidationErrorsWithInfo,
  makeHasError,
} from '../../../../../../utils/form';

export type CobotGripperSubFormTab = 'GRIPPER_1' | 'GRIPPER_2';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  tab: CobotGripperSubFormTab;
};

export const GRIPPER_1_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.GR1_SUPPLIER',
  'config.GR1_TYPE',
  'config.GR1_ADDONS',
];

export const GRIPPER_2_TAB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.HAS_SECOND_GRIPPER',
  'config.GR2_SUPPLIER',
  'config.GR2_TYPE',
  'config.GR2_ADDONS',
];

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_GRIPPER_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  ...GRIPPER_1_TAB_FORM_FIELDS,
  ...GRIPPER_2_TAB_FORM_FIELDS,
];

export function getCobotGripperSubFormTabForField(
  name: Path<CobotConfig>,
): CobotGripperSubFormTab {
  if (GRIPPER_2_TAB_FORM_FIELDS.includes(name)) {
    return 'GRIPPER_2';
  } else {
    return 'GRIPPER_1';
  }
}

export function CobotGripperSubForm({ form, tab }: Props) {
  const t = useT();

  const gripper1SupplierID = form.watch('config.GR1_SUPPLIER');
  const gripper2SupplierID = form.watch('config.GR2_SUPPLIER');

  const gripper1Supplier = GRIPPER_SUPPLIERS.find(
    (brand) => brand.id === gripper1SupplierID,
  );

  const gripper2Supplier = GRIPPER_SUPPLIERS.find(
    (brand) => brand.id === gripper2SupplierID,
  );

  const gripper1ID = form.watch('config.GR1_TYPE');
  const gripper2ID = form.watch('config.GR2_TYPE');

  const gripper1 = gripper1Supplier?.grippers.find(
    (gripper) => gripper.id === gripper1ID,
  );
  const gripper2 = gripper2Supplier?.grippers.find(
    (gripper) => gripper.id === gripper2ID,
  );

  const hasSecondGripper = form.watch('config.HAS_SECOND_GRIPPER');

  const errors = getValidationErrorsWithInfo(form.formState.errors);
  const hasError = makeHasError<CobotConfig>(errors);

  return (
    <Container>
      <Title center>{t('GRIPPER')}</Title>

      <Tabs
        initialTab={tab}
        tabs={[
          {
            id: 'GRIPPER_1',
            label: t('GRIPPER_NO_1'),
            warning: hasError(GRIPPER_1_TAB_FORM_FIELDS),
            content() {
              return (
                <HalfWidthCenter>
                  <SelectField
                    register={() => form.register('config.GR1_SUPPLIER')}
                    label={t('SUPPLIER')}
                    options={GRIPPER_SUPPLIERS.map((brand) => ({
                      value: brand.id,
                      label: brand.name,
                    }))}
                  />

                  <SelectField
                    register={() => form.register('config.GR1_TYPE')}
                    label={t('TYPE')}
                    options={optionsForGripperBySupplier(gripper1Supplier)}
                  />

                  {gripper1 && gripper1.addons.length > 0 ? (
                    <MultiCheckboxField
                      register={() => form.register('config.GR1_ADDONS')}
                      label={t('ADDONS')}
                      options={gripper1.addons.map((addon) => ({
                        value: addon.id,
                        label: addon.name,
                      }))}
                    />
                  ) : null}
                </HalfWidthCenter>
              );
            },
          },
          {
            id: 'GRIPPER_2',
            label: t('GRIPPER_NO_2'),
            warning: hasError(GRIPPER_2_TAB_FORM_FIELDS),
            content() {
              return (
                <HalfWidthCenter>
                  <SwitchField
                    register={() => form.register('config.HAS_SECOND_GRIPPER')}
                    label={t('HAS_SECOND_GRIPPER')}
                  />

                  {hasSecondGripper ? (
                    <>
                      <SelectField
                        register={() => form.register('config.GR2_SUPPLIER')}
                        label={t('SUPPLIER')}
                        options={GRIPPER_SUPPLIERS.map((brand) => ({
                          value: brand.id,
                          label: brand.name,
                        }))}
                      />
                      <SelectField
                        register={() => form.register('config.GR2_TYPE')}
                        label={t('TYPE')}
                        options={optionsForGripperBySupplier(gripper2Supplier)}
                      />

                      {gripper2 && gripper2.addons.length > 0 ? (
                        <MultiCheckboxField
                          register={() => form.register('config.GR2_ADDONS')}
                          label={t('ADDONS')}
                          options={gripper2.addons.map((addon) => ({
                            value: addon.id,
                            label: addon.name,
                          }))}
                        />
                      ) : null}
                    </>
                  ) : (
                    <Empty
                      icon={PrecisionManufacturingIcon}
                      message={t('COBOT_HAS_NO_SECOND_GRIPPER')}
                    />
                  )}
                </HalfWidthCenter>
              );
            },
          },
        ]}
      />
    </Container>
  );
}

function optionsForGripperBySupplier(supplier?: GripperSupplier) {
  if (!supplier) {
    return [];
  }

  return supplier.grippers.map((gripper) => ({
    value: gripper.id,
    label: gripper.name,
  }));
}
