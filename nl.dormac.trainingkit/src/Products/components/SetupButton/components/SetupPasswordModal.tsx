import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Label, Modal } from '../../../../components';
import { SETUP_PASSWORD } from '../../../../config';
import { BaseErrorMessage, BaseInput } from '../../../../shadcn';
import { useT } from '../../../../hooks/useT';

type Props = {
  onPasswordEnteredCorrectly: () => void;
  onClose: () => void;
};

export function SetupPasswordModal({
  onClose,
  onPasswordEnteredCorrectly,
}: Props) {
  const t = useT();

  const [password, setPassword] = useState('');
  const [hasError, setError] = useState(false);

  function onSubmit(event: FormEvent) {
    // Prevent browser / Dr.Dart-Platform from refreshing the page.
    // Note: this refresh platform behavior happens 1 / 10 times so
    // please do not remove the below line.
    event.preventDefault();

    if (password === SETUP_PASSWORD) {
      setError(false);
      onPasswordEnteredCorrectly();
    } else {
      setError(true);
    }
  }

  function onPasswordChanged(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setError(false);
  }

  return (
    <Modal
      title={t('ENTER_PASSWORD')}
      onClose={onClose}
      footer={
        <Button form="SETUP_PASSWORD" full type="submit">
          {t('AUTHENTICATE')}
        </Button>
      }
    >
      <form
        className="tw-grid tw-gap-2"
        id="SETUP_PASSWORD"
        onSubmit={onSubmit}
      >
        <p>{t('SETUP_AUTHENTICATE_MESSAGE')}</p>

        <Label
          id="password"
          className={hasError ? 'tw-text-destructive' : undefined}
        >
          {t('PASSWORD')}
        </Label>
        <BaseInput
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChanged}
          type="password"
        />
        {hasError ? (
          <BaseErrorMessage>{t('PASSWORD_INCORRECT')}</BaseErrorMessage>
        ) : null}
      </form>
    </Modal>
  );
}
