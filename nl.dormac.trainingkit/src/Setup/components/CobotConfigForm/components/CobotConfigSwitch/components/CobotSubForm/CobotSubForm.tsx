import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
import {
  Container,
  HalfWidthCenter,
  Title,
} from '../../../../../../../components';
import { CobotConfig } from '../../../../../../../core/models/cobot-config-types';
import { useCobotInfo } from '../../../../../../../hooks/useCobotInfo';
import { useT } from '../../../../../../../hooks/useT';
import { BackupButton } from './components/BackupButton/BackupButton';
import { CobotInfoCard } from './components/CobotInfoCard/CobotInfoCard';
import { RestoreButton } from './components/ImportConfigButton/RestoreButton';

type Props = {
  form: UseFormReturn<CobotConfig, any, undefined>;
};

// All fields that are part of this sub form, used to show warning icon.
export const COBOT_SUB_FORM_FIELDS: Path<CobotConfig>[] = [];

export function CobotSubForm({ form }: Props) {
  const t = useT();

  const cobotInfo = useCobotInfo();

  if (!cobotInfo) {
    return null;
  }

  return (
    <Container>
      <Title center>{t('COBOT')}</Title>

      <HalfWidthCenter>
        <CobotInfoCard cobotInfo={cobotInfo} />

        {!form.formState.isDirty ? (
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <BackupButton />

            <RestoreButton />
          </div>
        ) : null}
      </HalfWidthCenter>
    </Container>
  );
}
