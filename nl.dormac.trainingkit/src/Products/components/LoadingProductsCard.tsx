import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Center,
  Spinner,
} from '../../components';
import { useT } from '../../hooks/useT';

export function LoadingProductsCard() {
  const t = useT();

  const [show, setShow] = useState(false);

  /* 
    Only show the loading spinner when it takes longer than
    200 milliseconds to load the products, this prevents flashing
    content.
  */
  useEffect(() => {
    const id = window.setTimeout(() => {
      setShow(true);
    }, 200);

    return () => {
      window.clearTimeout(id);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Center>
      <Card className="tw-w-52">
        <CardHeader>
          <CardTitle className="tw-text-center">{t('LOADING')}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="tw-flex tw-justify-center tw-mb-4">
            <Spinner size="xl" />
          </div>
        </CardContent>
      </Card>
    </Center>
  );
}
