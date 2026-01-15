import AddIcon from '@mui/icons-material/Add';
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
};

export function EmptyProductsCard({ onClick }: Props) {
  const t = useT();

  return (
    <Center>
      <Card className="tw-w-96">
        <CardHeader>
          <CardTitle>{t('PRODUCT_EMPTY_TITLE')}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="tw-flex tw-justify-center tw-mb-4">
            <FeedBackIcon className="tw-h-16 tw-w-16 tw-text-muted-foreground" />
          </div>

          <p>{t('PRODUCT_EMPTY_CONTENT')}</p>
        </CardContent>

        <CardFooter>
          <Button full icon={AddIcon} onClick={() => onClick()}>
            {t('PRODUCT_ADD')}
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}
