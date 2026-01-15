import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  InputField,
  SubTitle,
  Separator,
  Title,
} from '../../../../../../components';
import { CobotConfig } from '../../../../../../core/models/cobot-config-types';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_PRODUCT_SUB_FORM_FIELDS: Path<CobotConfig>[] = [
  'config.TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT',
  'config.TEACH_CONFIG_MAIN_CLAW_PRODUCT_WIDTH',
  'config.TEACH_CONFIG_MAIN_CLAW_PRODUCT_LENGTH',

  'config.TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT',
  'config.TEACH_CONFIG_SUB_CLAW_PRODUCT_WIDTH',
  'config.TEACH_CONFIG_SUB_CLAW_PRODUCT_LENGTH',

  'config.TEACH_CONFIG_PLACE_SPINDLE_HEIGHT',
  'config.TEACH_CONFIG_PLACE_SPINDLE_DEPTH',
  'config.TEACH_CONFIG_GR_RAW_HEIGHT',
  'config.TEACH_CONFIG_GR_RAW_DEPTH',

  'config.TEACH_CONFIG_PICK_SPINDLE_HEIGHT',
  'config.TEACH_CONFIG_PICK_SPINDLE_DEPTH',
  'config.TEACH_CONFIG_GR_FINISHED_HEIGHT',
  'config.TEACH_CONFIG_GR_FINISHED_DEPTH',
];

export function CobotProductSubForm({ form }: Props) {
  const t = useT();
  const cobotConfig = form.getValues();

  return (
    <Container>
      <Title center>{t('TEACH_CONFIG')}</Title>

      <HalfWidthCenter>
        <SubTitle>{t('RAW_MATERIAL')}</SubTitle>
        <InputField
          register={() =>
            form.register('config.TEACH_CONFIG_MAIN_CLAW_PRODUCT_HEIGHT')
          }
          label={t('TEACH_CONFIG_PRODUCT_HEIGHT')}
          addon={t('MM')}
        />

        <SubTitle>{t('MAIN_CLAW')}</SubTitle>
        <InputField
          register={() =>
            form.register('config.TEACH_CONFIG_PLACE_SPINDLE_HEIGHT')
          }
          label={t('TEACH_CONFIG_PLACE_SPINDLE_HEIGHT')}
          addon={t('MM')}
        />
        <InputField
          register={() =>
            form.register('config.TEACH_CONFIG_PLACE_SPINDLE_DEPTH')
          }
          label={t('TEACH_CONFIG_PLACE_SPINDLE_DEPTH')}
          addon={t('MM')}
        />

        <SubTitle>{t('GRIPPER')}</SubTitle>
        <InputField
          register={() => form.register('config.TEACH_CONFIG_GR_RAW_HEIGHT')}
          label={t('TEACH_CONFIG_GR_RAW_HEIGHT')}
          addon={t('MM')}
        />
        <InputField
          register={() => form.register('config.TEACH_CONFIG_GR_RAW_DEPTH')}
          label={t('TEACH_CONFIG_GR_RAW_DEPTH')}
          addon={t('MM')}
        />
      </HalfWidthCenter>

      {cobotConfig?.config.MACHINE_HAS_SUB_SPINDLE ? (
        <Container>
          <Separator orientation="horizontal" />

          <HalfWidthCenter>
            <SubTitle>{t('FINISHED_PRODUCT')}</SubTitle>
            <InputField
              register={() =>
                form.register('config.TEACH_CONFIG_SUB_CLAW_PRODUCT_HEIGHT')
              }
              label={t('TEACH_CONFIG_PRODUCT_HEIGHT')}
              addon={t('MM')}
            />

            <SubTitle>{t('SUB_CLAW')}</SubTitle>
            <InputField
              register={() =>
                form.register('config.TEACH_CONFIG_PICK_SPINDLE_HEIGHT')
              }
              label={t('TEACH_CONFIG_PICK_SPINDLE_HEIGHT')}
              addon={t('MM')}
            />
            <InputField
              register={() =>
                form.register('config.TEACH_CONFIG_PICK_SPINDLE_DEPTH')
              }
              label={t('TEACH_CONFIG_PICK_SPINDLE_DEPTH')}
              addon={t('MM')}
            />

            <SubTitle>{t('GRIPPER')}</SubTitle>
            <InputField
              register={() =>
                form.register('config.TEACH_CONFIG_GR_FINISHED_HEIGHT')
              }
              label={t('TEACH_CONFIG_GR_FINISHED_HEIGHT')}
              addon={t('MM')}
            />
            <InputField
              register={() =>
                form.register('config.TEACH_CONFIG_GR_FINISHED_DEPTH')
              }
              label={t('TEACH_CONFIG_GR_FINISHED_DEPTH')}
              addon={t('MM')}
            />
          </HalfWidthCenter>
        </Container>
      ) : null}
    </Container>
  );
}
