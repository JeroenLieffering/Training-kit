import FactoryIcon from '@mui/icons-material/Factory';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import React from 'react';
import { IOMode } from '../../../../core/models/product-types';
import { cn } from '../../../../shadcn/utils/cn';

type Props = {
  mode: IOMode;
};

export function ProcessFlowImage({ mode }: Props) {
  return (
    <div className="tw-flex tw-justify-center tw-items-center">
      <TrendingFlatIcon
        className={cn('tw-w-8 tw-h-8 tw-mt-2', {
          'tw-invisible': mode === 'OUTPUT',
        })}
      />
      <FactoryIcon className="tw-w-10 tw-h-10" />
      <TrendingFlatIcon
        className={cn('tw-w-8 tw-h-8 tw-mt-2', {
          'tw-invisible': mode === 'INPUT',
        })}
      />
    </div>
  );
}
