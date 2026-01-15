import React from 'react';
import { Fabrication } from '../../../../core/models/fabrication-type';
import { cn } from '../../../../shadcn/utils/cn';
import { Card } from '../../../../components';
import { useT } from '../../../../hooks/useT';

type Props = {
  fabrications: Fabrication[];
};

export function FabricationGraph({ fabrications }: Props) {
  const t = useT();

  const newestFirst = [...fabrications].sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
  });

  // Max 100 items
  const first100 = newestFirst.splice(0, 100);

  const padding: number[] = [];
  for (let i = 0; i < 100 - first100.length; i++) {
    padding.push(i);
  }

  return (
    <Card className="tw-grid tw-gap-1 tw-p-4 tw-pb-3">
      <div className="tw-overflow-hidden tw-flex tw-gap-1">
        {first100.map((fabrication) => (
          <div
            key={fabrication.id}
            className={cn(
              'tw-h-8 tw-w-1 tw-flex-shrink-0',
              fabrication.data.success ? 'tw-bg-lime-500' : 'tw-bg-red-500',
            )}
          ></div>
        ))}
        {padding.map((pad) => (
          <div
            key={pad}
            className="tw-h-8 tw-w-1 tw-flex-shrink-0 tw-bg-gray-100"
          ></div>
        ))}
      </div>

      <div className="tw-flex tw-justify-between">
        <small>{t('PRESENT')}</small>
        <small>{t('PAST')}</small>
      </div>
    </Card>
  );
}
