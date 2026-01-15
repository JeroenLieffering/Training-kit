import React, { ReactNode } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '../../components';

type Props = {
  title: ReactNode;
  children: ReactNode;
};

export function MaintenanceCard({ title, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardFooter className="tw-gap-4">{children}</CardFooter>
    </Card>
  );
}
