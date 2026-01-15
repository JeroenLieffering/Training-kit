import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Debug, ErrorBoundary } from '../../../components';
import { CobotConfig } from '../../../core/models/cobot-config-types';
import { cobotConfigValidator } from '../../../core/validators/cobot-config-validator';
import { errorToast } from '../../../utils/toast';
import { SetupSubPage } from '../../types';
import { CobotConfigFormSwitch } from './components/CobotConfigFormSwitch/CobotConfigFormSwitch';
import { SetupSideBar } from './components/SetupSideBar/SetupSideBar';
import { useT } from '../../../hooks/useT';

export const COBOT_CONFIG_FORM_ID = 'cobot-config-form';

type Props = {
  cobotConfig: CobotConfig;
  onSubmit: (cobotConfig: CobotConfig) => void;
  initialSubPage: SetupSubPage;
};

export function CobotConfigForm({
  cobotConfig,
  onSubmit,
  initialSubPage,
}: Props) {
  const [subPage, setSubPage] = useState<SetupSubPage>(initialSubPage);

  const t = useT();

  const form = useForm({
    defaultValues: { ...cobotConfig, config: { ...cobotConfig.config } },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: (cobotConfig) => cobotConfigValidator(cobotConfig),
  });

  function handleSubmitError() {
    errorToast(t, t('FORM_CONTAINS_ERRORS'));
  }

  return (
    <FormProvider {...form}>
      <form
        id={COBOT_CONFIG_FORM_ID}
        onSubmit={form.handleSubmit(onSubmit, handleSubmitError)}
        className="tw-h-full"
      >
        <div className="tw-h-full tw-flex">
          <SetupSideBar form={form} subPage={subPage} setSubPage={setSubPage} />
          <div className="tw-flex-1 tw-ml-4">
            <ErrorBoundary key={subPage.page}>
              <CobotConfigFormSwitch
                subPage={subPage}
                setSubPage={setSubPage}
                form={form}
              />
            </ErrorBoundary>
            <Debug value={form.getValues()} className="tw-mt-4" />
            <Debug value={form.formState.errors} className="tw-mt-4" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
