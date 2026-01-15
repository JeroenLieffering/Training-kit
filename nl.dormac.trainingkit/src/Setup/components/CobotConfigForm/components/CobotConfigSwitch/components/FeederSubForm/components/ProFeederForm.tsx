import React, { useEffect } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import {
  InputField,
  LeftRight,
  SubTitle,
  PoseField,
} from '../../../../../../../../components';
import { CobotConfig } from '../../../../../../../../core/models/cobot-config-types';
import { parseAsNumber } from '../../../../../../../../utils/number';
import { useT } from '../../../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

export function ProFeederForm({ form }: Props) {
  const t = useT();

  const { fields, remove, insert } = useFieldArray({
    control: form.control,
    name: 'config.PRO_FEEDER.POSITIONS',
  });

  const noDrawersString = form.watch('config.PRO_FEEDER.NUMBER_OF_DRAWERS');

  useEffect(() => {
    let noDrawers = parseAsNumber(noDrawersString, 1);
    noDrawers = noDrawers <= 0 ? 1 : noDrawers;

    noDrawers = Math.min(noDrawers, 24);

    if (noDrawers < fields.length) {
      // When the amount of drawers decreases remove the last N
      // drawers. Where N is the difference between the current
      // amount of drawers and the desired amount of drawers.

      const difference = fields.length - noDrawers + 1;

      for (let index = 0; index < difference; index++) {
        // Remove the last item
        remove(fields.length - index);
      }
    } else if (noDrawers > fields.length) {
      // When the amount of drawers increases add N drawers.
      // Where N is the difference between the current
      // amount of drawers and the desired amount of drawers.

      const difference = noDrawers - fields.length;

      for (let index = 0; index < difference; index++) {
        insert(fields.length, {
          open: [0, 0, 0, 0, 0, 0],
          closed: [0, 0, 0, 0, 0, 0],
        });
      }
    }
  }, [noDrawersString]);

  return (
    <div className="tw-grid tw-gap-4">
      <div className="tw-mx-auto tw-w-1/2">
        <InputField
          register={() => form.register('config.PRO_FEEDER.NUMBER_OF_DRAWERS')}
          label={t('NUMBER_OF_DRAWERS')}
        />
      </div>

      <LeftRight
        left={
          <>
            <SubTitle>{t('OPEN')}</SubTitle>

            {fields.map((field, index) => (
              <PoseField
                key={field.id}
                register={() =>
                  form.register(`config.PRO_FEEDER.POSITIONS.${index}.open`)
                }
                label={t('POSITION_DRAWER', { number: index + 1 })}
                mode="TASK"
              />
            ))}
          </>
        }
        right={
          <>
            <SubTitle>{t('CLOSED')}</SubTitle>

            {fields.map((field, index) => (
              <PoseField
                key={field.id}
                register={() =>
                  form.register(`config.PRO_FEEDER.POSITIONS.${index}.closed`)
                }
                label={t('POSITION_DRAWER', { number: index + 1 })}
                mode="TASK"
              />
            ))}
          </>
        }
      />
    </div>
  );
}
