import React, { ChangeEvent, useEffect, useState } from 'react';
import { BaseErrorMessage, BaseInput } from '../../../../../../shadcn';
import { useT } from '../../../../../../hooks/useT';

type Props = {
  value: number;
  onChange: (value: number) => void;
  max: number;
};

export function AmountInput({ value, onChange, max }: Props) {
  const t = useT();

  const [innerValue, setInnerValue] = useState(value.toString());
  const [error, setError] = useState('');

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setInnerValue(event.target.value);

    const number = parseFloat(event.target.value);

    if (Number.isNaN(number)) {
      setError(t('NOT_A_NUMBER', { name: t('AMOUNT') }));
    } else {
      onChange(number);

      if (number < 1) {
        setError(t('MIN_NUMBER', { name: t('AMOUNT'), min: 1 }));
      } else if (number > max) {
        setError(t('MAX_NUMBER', { name: t('AMOUNT'), max }));
      } else {
        setError('');
      }
    }
  }

  useEffect(() => {
    setInnerValue(value.toString());
  }, [value]);

  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <div className="tw-w-40">
        <BaseInput
          value={innerValue}
          onChange={handleOnChange}
          addonRight="x"
        />
      </div>

      {error ? <BaseErrorMessage>{error}</BaseErrorMessage> : null}
    </div>
  );
}
