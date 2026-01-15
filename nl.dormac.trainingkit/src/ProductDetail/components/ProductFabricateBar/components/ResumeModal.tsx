import { ProgramStopCause } from 'dart-api';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Alert,
  Button,
  Modal,
  RadioField,
  SwitchField,
} from '../../../../components';
import { ResumeForm } from '../../../types';
import { CobotConfig } from '../../../../core/models/cobot-config-types';
import { isConfiguredWithSupportForMultipleDrawers } from '../../../../core/services/cobot-config-service';
import { useT } from '../../../../hooks/useT';

type Props = {
  onClose: () => void;
  onSubmit: (form: ResumeForm) => void;
  programStopCause: ProgramStopCause;
  cobotConfig: CobotConfig;
  amount: number;
  amountRemaining: number;
};

export function ResumeModal({
  onClose,
  programStopCause,
  cobotConfig,
  onSubmit,
  amount,
  amountRemaining,
}: Props) {
  const t = useT();

  const form = useForm<ResumeForm>({
    defaultValues: {
      mode: 'continue',
      MACHINE_CONTAINS_PRODUCT: false,
      USE_CURRENT_DRAWER: false,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const mode = form.watch('mode');

  useEffect(() => {
    if (mode === 'restart') {
      form.setValue('MACHINE_CONTAINS_PRODUCT', false);
      form.setValue('USE_CURRENT_DRAWER', false);
    }
  }, [mode]);

  return (
    <FormProvider {...form}>
      <form id="RESUME_FORM" onSubmit={form.handleSubmit(onSubmit)}>
        <Modal
          title={t('FABRICATE')}
          onClose={onClose}
          footer={
            <Button form="RESUME_FORM" type="submit">
              {t('FABRICATE')}
            </Button>
          }
        >
          <div className="tw-grid tw-gap-4">
            {programStopCause === ProgramStopCause.FORCE ? (
              <Alert title={t('INTERRUPTED_OPERATOR')} variant="destructive" />
            ) : (
              <Alert title={t('INTERRUPTED_ERROR')} variant="destructive" />
            )}

            <RadioField
              register={() => form.register('mode')}
              label={t('CONTINUE_OR_RESTART')}
              orientation="vertical"
              options={[
                {
                  id: 'restart',
                  value: 'restart',
                  label: t('RESTART', { count: amount }),
                },
                {
                  id: 'continue',
                  value: 'continue',
                  label: t('CONTINUE', { count: amountRemaining }),
                },
              ]}
            />

            {mode === 'continue' ? (
              <>
                <SwitchField
                  register={() => form.register('MACHINE_CONTAINS_PRODUCT')}
                  label={t('MACHINE_CONTAINS_PRODUCT')}
                  description={t('MACHINE_CONTAINS_PRODUCT_DESCRIPTION')}
                />

                {isConfiguredWithSupportForMultipleDrawers(cobotConfig) ? (
                  <SwitchField
                    register={() => form.register('USE_CURRENT_DRAWER')}
                    label={t('USE_CURRENT_DRAWER')}
                    description={t('USE_CURRENT_DRAWER_DESCRIPTION')}
                  />
                ) : null}
              </>
            ) : null}
          </div>
        </Modal>
      </form>
    </FormProvider>
  );
}
