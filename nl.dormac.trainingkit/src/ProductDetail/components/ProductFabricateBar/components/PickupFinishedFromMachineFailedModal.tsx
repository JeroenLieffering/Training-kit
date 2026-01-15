import React from 'react';
import { Button, HtmlParagraphs, Modal } from '../../../../components';
import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { useSendAlert } from '../../../../hooks/useSendAlert';
import { useT } from '../../../../hooks/useT';

type Props = {
  cobotConfig: CobotConfig;
  onClose: () => void;
};

export function PickupFinishedFromMachineFailedModal({
  onClose,
  cobotConfig,
}: Props) {
  const t = useT();

  const { off } = useSendAlert(cobotConfig);

  function close() {
    off();
    onClose();
  }

  return (
    <Modal
      title={t('PICK_FINISHED_PRODUCT_FROM_MACHINE_FAILED', { gripper: 1 })}
      onClose={close}
      footer={
        <Button onClick={close} full>
          {t('CLOSE')}
        </Button>
      }
    >
      <HtmlParagraphs
        text={t('PICK_FINISHED_PRODUCT_FROM_MACHINE_FAILED_MESSAGE')}
      />
    </Modal>
  );
}
