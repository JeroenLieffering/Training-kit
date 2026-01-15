import React, { ReactNode } from 'react';
import { Card, CardContent, CardTitle } from '../../components';

type Props = {
  title: ReactNode;
  children: ReactNode;
};

export function InfoCard({ title, children }: Props) {
  return (
    <Card className="tw-p-2">
      <CardTitle className="tw-text-md tw-text-center">{title}</CardTitle>

      <CardContent className="tw-text-center tw-mt-2 tw-pb-0">
        {children}
      </CardContent>
    </Card>
  );
}
