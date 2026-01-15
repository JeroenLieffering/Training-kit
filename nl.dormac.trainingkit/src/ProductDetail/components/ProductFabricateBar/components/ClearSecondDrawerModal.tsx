import React from 'react';
import { Button, Modal, Separator } from '../../../../components';
import { useT } from '../../../../hooks/useT';

type Props = {
  sendResponse: (value: string) => void;
};

export function ClearSecondDrawerModal({ sendResponse }: Props) {
  const t = useT();

  function onDrawerClearedClicked() {
    sendResponse('True');
  }

  function onStopProgramClicked() {
    sendResponse('False');
  }

  return (
    <Modal
      title={t('CLEAR_SECOND_DRAWER')}
      onClose={() => undefined}
      canClose={false}
      footer={
        <Button full onClick={onDrawerClearedClicked}>
          {t('SECOND_DRAWER_CLEARED')}
        </Button>
      }
    >
      <p>{t('CLEAR_SECOND_DRAWER_MESSAGE')}</p>

      <Separator orientation="horizontal" />

      <p className="tw-flex tw-items-center tw-gap-1">
        {t('OR_ALTERNATIVELY_YOU_CAN')}

        <Button variant="outline" onClick={onStopProgramClicked}>
          {t('STOP_THE_PROGRAM')}
        </Button>
      </p>
    </Modal>
  );
}
