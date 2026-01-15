import React, { ReactNode } from 'react';
import { InfoCard } from '../../InfoCard';
import { useT } from '../../../../hooks/useT';

type Props = {
  title: ReactNode;
  height: string;
  depth: string;
};

export function ToolCard({ title, height, depth }: Props) {
  const t = useT();

  return (
    <InfoCard title={title}>
      <dl className="tw-grid tw-place-content-center">
        <div className="tw-flex tw-gap-2 tw-justify-end">
          <dt>{t('CLAW_HEIGHT')}:</dt>
          <dd>
            {height}
            {t('MM')}
          </dd>
        </div>

        <div className="tw-flex tw-gap-2 tw-justify-end">
          <dt>{t('CLAW_DEPTH')}:</dt>
          <dd>
            {depth}
            {t('MM')}
          </dd>
        </div>
      </dl>
    </InfoCard>
  );
}
