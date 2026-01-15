import React from 'react';
import { ValidStatus } from '../../../../../../../../../../components';

type Props = {
  text: string;
  valid: boolean;
};

export function Status({ valid, text }: Props) {
  return (
    <div className="tw-flex tw-gap-2">
      <ValidStatus valid={valid} />

      <span className="tw-font-semibold">{text}</span>
    </div>
  );
}
