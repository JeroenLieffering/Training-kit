import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import {
  BackButton,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Center,
  Container,
  TopBar,
} from '../../components';
import { useNavigate } from '../../hooks/useNavigate';
import { useRobotManager } from '../../hooks/useRobotManager';
import { useT } from '../../hooks/useT';

export function UnknownCobot() {
  const t = useT();

  const navigateTo = useNavigate();

  const robotManager = useRobotManager();
  const model = robotManager.getRobotModel();

  return (
    <Container>
      <TopBar>
        <BackButton onClick={() => navigateTo({ page: 'PRODUCTS' })}>
          {t('PRODUCTS')}
        </BackButton>
      </TopBar>

      <Center>
        <Card className="tw-w-96">
          <CardHeader>
            <CardTitle>{t('UNKNOWN_COBOT', { model })}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="tw-flex tw-justify-center tw-mb-4">
              <ErrorIcon className="tw-h-16 tw-w-16 tw-text-destructive" />
            </div>

            <p>{t('UNKNOWN_COBOT_MESSAGE')}</p>
          </CardContent>
        </Card>
      </Center>
    </Container>
  );
}
