import React from 'react';
import { Icon } from '../../../../../../components/types';
import { Button } from '../../../../../../components';

type Props = {
  /**
   * The Material UI icon component to display.
   */
  icon: Icon;

  onClick(): void;
};

export function BigIconButton({ icon, onClick }: Props) {
  const Icon = icon;

  return (
    <Button
      onClick={onClick}
      icon={Icon}
      className="tw-rounded-full tw-h-16 tw-w-16 tw-justify-center"
      iconClass="tw-mr-0 tw-h-10 tw-w-10"
    />
  );
}
