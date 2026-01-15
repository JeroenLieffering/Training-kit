import WarningIcon from '@mui/icons-material/WarningAmberOutlined';
import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { Button } from '../../../../../../../../components';
import { CobotConfig } from '../../../../../../../../core/models/cobot-config-types';
import { truncate } from '../../../../../../../../utils/string';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
  index: number;
  onClick: (index: number) => void;
  isSelected: boolean;
  warning: boolean;
};

export function StaticGridSelectButton({
  index,
  form,
  onClick,
  isSelected,
  warning,
}: Props) {
  const staticGrid = useWatch({
    control: form.control,
    name: `config.STATIC_GRIDS.${index}`,
  });

  return (
    <Button
      variant="secondary"
      className={isSelected ? 'tw-font-black ' : ''}
      onClick={() => onClick(index)}
      type="button"
      full
    >
      <div className="tw-flex tw-justify-between tw-flex-1">
        <span
          className={warning ? 'tw-text-left tw-truncate tw-w-24' : undefined}
        >
          {truncate(staticGrid.name, 20)}
        </span>
        {warning ? (
          <WarningIcon className="h-6 w-6 tw-text-destructive" />
        ) : null}
      </div>
    </Button>
  );
}
