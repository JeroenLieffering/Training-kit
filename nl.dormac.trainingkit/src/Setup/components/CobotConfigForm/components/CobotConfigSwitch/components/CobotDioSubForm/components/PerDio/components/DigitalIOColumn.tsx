import React, { ReactNode } from 'react';
import { SubTitle } from '../../../../../../../../../../components';

type Props = {
  controllerLabel: string;
  controllerList: ReactNode;
  flangeLabel: string;
  flangeList: ReactNode;
};

export function DigitalIOColumn({
  controllerLabel,
  controllerList,
  flangeLabel,
  flangeList,
}: Props) {
  return (
    <div className="tw-grid tw-gap-4">
      <SubTitle>{controllerLabel}</SubTitle>

      <ol className="tw-grid tw-gap-2">{controllerList}</ol>

      <SubTitle>{flangeLabel}</SubTitle>

      <ol className="tw-grid tw-gap-2">{flangeList}</ol>
    </div>
  );
}
