import React, { useState } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  Help,
  InputField,
  InputHierarchy,
  LeftRight,
  RadioField,
  Separator,
  SubTitle,
  SwitchField,
  Title,
} from '../../../../../components';
import { CobotConfig } from '../../../../../core/models/cobot-config-types';
import { Product } from '../../../../../core/models/product-types';
import { useValidateOnMount } from '../../../../../hooks/useValidateOnMount';
import { RawHint } from './components/RawHint/RawHint';
import { RoundRectHint } from './components/RoundRectHint/RoundRectHint';
import steppedAxisColoredImage from './images/stepped-axis-colored.png';
import steppedAxisImage from './images/stepped-axis.png';
import { HintMode } from './types';
import { CobotInfo } from '../../../../../types';
import { useT } from '../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
  cobotConfig: CobotConfig;
  cobotInfo: CobotInfo;
};

// All fields that are part of this sub form, used to show warning icon.
export const PRODUCT_SUB_FORM_FIELDS: Path<Product>[] = [
  'config.ROUND_PRODUCT',
  'config.RAW_MAT_DIAMETER',
  'config.RAW_MAT_HEIGHT',
  'config.RAW_MAT_WEIGHT',
  'config.RAW_MAT_LENGTH',
  'config.RAW_MAT_WIDTH',
  'config.RAW_MAT_HEIGHT',
  'config.RAW_MAT_WEIGHT',
  'config.FIN_PRODUCT_DIAMETER',
  'config.FIN_PRODUCT_HEIGHT',
  'config.FIN_PRODUCT_WEIGHT',
  'config.STEPPED_AXIS',
  'config.FIN_TOP_OFFSET',
  'config.FIN_BOTTOM_OFFSET',
  'config.FIN_PRODUCT_LENGTH',
  'config.FIN_PRODUCT_WIDTH',
  'config.FIN_PRODUCT_HEIGHT',
  'config.FIN_PRODUCT_WEIGHT',
];

export function ProductSubForm({ form, cobotInfo, cobotConfig }: Props) {
  const t = useT();

  const [hintMode, setHintMode] = useState<HintMode>('WEIGHT');

  useValidateOnMount(form);

  const isRound = form.watch('config.ROUND_PRODUCT');
  const hasSteppedAxis = form.watch('config.STEPPED_AXIS');

  const product = form.getValues();

  return (
    <Container>
      <Title center>{t('PRODUCT')}</Title>

      {/* Voor nu gaan we alleen met Ronde producten werken */}
      {/* <div className="tw-flex tw-justify-center">
        <RadioField
          register={() => form.register('config.ROUND_PRODUCT')}
          label={t('SHAPE')}
          options={[
            { id: 'round', value: true, label: t('ROUND') },
            { id: 'rect', value: false, label: t('RECTANGULAR') },
          ]}
        />
      </div> */}

      <Separator orientation="horizontal" />

      <LeftRight
        left={
          <>
            <SubTitle>{t('RAW_MATERIAL')}</SubTitle>

            {isRound ? (
              <>
                <InputField
                  register={() =>
                    form.register('config.RAW_MAT_DIAMETER', {
                      deps: ['config.FIN_PRODUCT_DIAMETER'],
                    })
                  }
                  label={t('DIAMETER')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('DIAMETER')}
                />

                <InputField
                  register={() =>
                    form.register('config.RAW_MAT_HEIGHT', {
                      deps: ['config.FIN_PRODUCT_HEIGHT'],
                    })
                  }
                  label={t('HEIGHT')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('HEIGHT')}
                />

                <InputField
                  register={() =>
                    form.register('config.RAW_MAT_WEIGHT', {
                      deps: ['config.FIN_PRODUCT_WEIGHT'],
                    })
                  }
                  label={t('WEIGHT')}
                  addon={t('KG')}
                  onFocus={() => setHintMode('WEIGHT')}
                />
              </>
            ) : (
              <>
                <InputField
                  register={() =>
                    form.register('config.RAW_MAT_LENGTH', {
                      deps: ['config.FIN_PRODUCT_LENGTH'],
                    })
                  }
                  label={t('LENGTH')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('LENGTH')}
                />
                <InputField
                  register={() =>
                    form.register('config.RAW_MAT_WIDTH', {
                      deps: ['config.FIN_PRODUCT_WIDTH'],
                    })
                  }
                  label={t('WIDTH')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('WIDTH')}
                />
                <InputField
                  register={() =>
                    form.register('config.RAW_MAT_HEIGHT', {
                      deps: ['config.FIN_PRODUCT_HEIGHT'],
                    })
                  }
                  label={t('HEIGHT')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('HEIGHT')}
                />
                <InputField
                  register={() =>
                    form.register('config.RAW_MAT_WEIGHT', {
                      deps: ['config.FIN_PRODUCT_WEIGHT'],
                    })
                  }
                  label={t('WEIGHT')}
                  addon={t('KG')}
                  onFocus={() => setHintMode('WEIGHT')}
                />
              </>
            )}
          </>
        }
        right={
          <>
            <SubTitle>{t('FINISHED_PRODUCT')}</SubTitle>

            {isRound ? (
              <>
                <InputField
                  register={() =>
                    form.register('config.FIN_PRODUCT_DIAMETER', {
                      deps: ['config.RAW_MAT_DIAMETER'],
                    })
                  }
                  label={t('DIAMETER')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('DIAMETER')}
                />

                <InputField
                  register={() =>
                    form.register('config.FIN_PRODUCT_HEIGHT', {
                      deps: ['config.RAW_MAT_HEIGHT'],
                    })
                  }
                  label={t('HEIGHT')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('HEIGHT')}
                  help={
                    hasSteppedAxis ? (
                      <Help
                        text={t('FIN_PRODUCT_HEIGHT_STEPPED_AXIS_HELP')}
                        img={
                          <img
                            src={steppedAxisImage}
                            width={112}
                            height={259}
                          />
                        }
                      />
                    ) : null
                  }
                />

                <InputField
                  register={() =>
                    form.register('config.FIN_PRODUCT_WEIGHT', {
                      deps: ['config.RAW_MAT_WEIGHT'],
                    })
                  }
                  label={t('WEIGHT')}
                  addon={t('KG')}
                  onFocus={() => setHintMode('WEIGHT')}
                />

                <InputHierarchy
                  main={
                    <SwitchField
                      register={() => form.register('config.STEPPED_AXIS')}
                      label={t('STEPPED_AXIS')}
                      help={
                        <Help
                          text={t('STEPPED_AXIS_HELP')}
                          img={
                            <img
                              src={steppedAxisImage}
                              width={112}
                              height={259}
                            />
                          }
                        />
                      }
                    />
                  }
                  showSub={hasSteppedAxis}
                  sub={
                    <>
                      <InputField
                        register={() => form.register('config.FIN_TOP_OFFSET')}
                        label={t('TOP_OFFSET')}
                        addon={t('MM')}
                        help={
                          <Help
                            text={t('TOP_OFFSET_HELP')}
                            img={
                              <img
                                src={steppedAxisColoredImage}
                                width={150}
                                height={330}
                              />
                            }
                          />
                        }
                      />

                      <InputField
                        register={() =>
                          form.register('config.FIN_BOTTOM_OFFSET')
                        }
                        label={t('BOTTOM_OFFSET')}
                        addon={t('MM')}
                        help={
                          <Help
                            text={t('BOTTOM_OFFSET_HELP')}
                            img={
                              <img
                                src={steppedAxisColoredImage}
                                width={150}
                                height={330}
                              />
                            }
                          />
                        }
                      />
                    </>
                  }
                />
              </>
            ) : (
              <>
                <InputField
                  register={() =>
                    form.register('config.FIN_PRODUCT_LENGTH', {
                      deps: ['config.RAW_MAT_LENGTH'],
                    })
                  }
                  label={t('LENGTH')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('LENGTH')}
                />
                <InputField
                  register={() =>
                    form.register('config.FIN_PRODUCT_WIDTH', {
                      deps: ['config.RAW_MAT_WIDTH'],
                    })
                  }
                  label={t('WIDTH')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('WIDTH')}
                />
                <InputField
                  register={() =>
                    form.register('config.FIN_PRODUCT_HEIGHT', {
                      deps: ['config.RAW_MAT_HEIGHT'],
                    })
                  }
                  label={t('HEIGHT')}
                  addon={t('MM')}
                  onFocus={() => setHintMode('HEIGHT')}
                />
                <InputField
                  register={() =>
                    form.register('config.FIN_PRODUCT_WEIGHT', {
                      deps: ['config.RAW_MAT_WEIGHT'],
                    })
                  }
                  label={t('WEIGHT')}
                  addon={t('KG')}
                  onFocus={() => setHintMode('WEIGHT')}
                />
              </>
            )}
          </>
        }
      />

      <Separator orientation="horizontal" />

      <LeftRight
        left={
          <RawHint
            cobotConfig={cobotConfig}
            cobotInfo={cobotInfo}
            product={product}
            hintMode={hintMode}
          />
        }
        right={<RoundRectHint product={product} cobotConfig={cobotConfig} />}
      />
    </Container>
  );
}
