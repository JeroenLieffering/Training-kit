import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState } from 'react';
import { Button } from '../../../components';
import { DEBUG } from '../../../config';
import { useNavigate } from '../../../hooks/useNavigate';
import { useT } from '../../../hooks/useT';
import { useUser } from '../../../hooks/useUser';
import { SetupPasswordModal } from './components/SetupPasswordModal';

export function SetupButton() {
  const t = useT();

  const [showModal, setShowModal] = useState(false);

  const user = useUser();

  if (user === 'operator') {
    return null;
  }

  const navigateTo = useNavigate();

  function onPasswordEnteredCorrectly() {
    navigateTo({ page: 'SETUP', subPage: { page: 'COBOT' } });
  }

  function onSettingsClicked() {
    // Skip annoying password check for developers!
    if (DEBUG) {
      onPasswordEnteredCorrectly();
    } else {
      setShowModal(true);
    }
  }

  return (
    <>
      {showModal ? (
        <SetupPasswordModal
          onPasswordEnteredCorrectly={onPasswordEnteredCorrectly}
          onClose={() => setShowModal(false)}
        />
      ) : null}
      <Button
        variant="secondary"
        icon={SettingsIcon}
        onClick={onSettingsClicked}
      >
        {t('SETUP')}
      </Button>
    </>
  );
}
