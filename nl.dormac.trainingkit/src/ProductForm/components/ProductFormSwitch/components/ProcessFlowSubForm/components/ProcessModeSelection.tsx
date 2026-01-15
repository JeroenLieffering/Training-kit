import React from 'react';
import FactoryIcon from '@mui/icons-material/Factory';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { UseFormReturn } from 'react-hook-form';
import { Card, Help, Label } from '../../../../../../components';
import {
  Product,
  IOMode,
} from '../../../../../../core/models/product-types';
import { BaseFormItemWrapper } from '../../../../../../shadcn';
import { cn } from '../../../../../../shadcn/utils/cn';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  form: UseFormReturn<Product, any, undefined>;
};

export function ProcessModeSelection({ form }: Props) {
  const t = useT();

  const field = form.register('config.IO_MODE');

  const value = form.watch(field.name);

  function onChange(mode: IOMode) {
    form.setValue(field.name, mode, {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.trigger();
  }

  return (
    <BaseFormItemWrapper>
      <Label>
        {t('MODE')} <Help text={t('IO_MODE_HELP')} />
      </Label>

      <div className="tw-flex tw-gap-4">
        <Option
          selected={value}
          mode="INPUT_OUTPUT"
          onClick={onChange}
          label={t('INPUT_AND_OUTPUT')}
        />

        <Option
          selected={value}
          mode="INPUT"
          onClick={onChange}
          label={t('INPUT')}
        />

        <Option
          selected={value}
          mode="OUTPUT"
          onClick={onChange}
          label={t('OUTPUT')}
        />
      </div>
    </BaseFormItemWrapper>
  );
}

function Option({
  selected,
  mode,
  onClick,
  label,
}: {
  selected: IOMode;
  mode: IOMode;
  onClick: (mode: IOMode) => void;
  label: string;
}) {
  return (
    <button type="button" onClick={() => onClick(mode)}>
      <Card
        className={cn(
          'tw-w-44 tw-h-28 tw-grid tw-gap-1 tw-p-1',
          selected === mode ? 'tw-border-primary tw-border-2' : 'tw-opacity-60',
        )}
      >
        <div className="tw-flex tw-justify-center tw-items-center">
          <TrendingFlatIcon
            className={cn('tw-w-10 tw-h-10 tw-mt-5', {
              'tw-invisible': mode === 'OUTPUT',
            })}
          />
          <FactoryIcon className="tw-w-16 tw-h-16" />
          <TrendingFlatIcon
            className={cn('tw-w-10 tw-h-10 tw-mt-5', {
              'tw-invisible': mode === 'INPUT',
            })}
          />
        </div>
        <div
          className={cn(
            'tw-text-center',
            selected === mode ? 'tw-font-semibold' : null,
          )}
        >
          {label}
        </div>
      </Card>
    </button>
  );
}
