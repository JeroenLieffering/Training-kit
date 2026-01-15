import ClearAllIcon from '@mui/icons-material/ClearAll';
import FeedBackIcon from '@mui/icons-material/Feedback';
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Center,
} from '../../components';
import { useT } from '../../hooks/useT';

type Props = {
  onClick: () => void;
  areDefaultFiltersActive: boolean;
};

export function NoMatchProductCard({
  onClick,
  areDefaultFiltersActive,
}: Props) {
  const t = useT();

  return (
    <Center>
      <Card className="tw-w-96">
        <CardHeader>
          <CardTitle>{t('NO_MATCHES_FOUND')}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="tw-flex tw-justify-center tw-mb-4">
            <FeedBackIcon className="tw-h-16 tw-w-16 tw-text-muted-foreground" />
          </div>

          <p>{t('PRODUCT_NO_MATCH_FILTER')}</p>
        </CardContent>

        {areDefaultFiltersActive ? null : (
          <CardFooter>
            <Button full icon={ClearAllIcon} onClick={() => onClick()}>
              {t('CLEAR_FILTERS')}
            </Button>
          </CardFooter>
        )}
      </Card>
    </Center>
  );
}
