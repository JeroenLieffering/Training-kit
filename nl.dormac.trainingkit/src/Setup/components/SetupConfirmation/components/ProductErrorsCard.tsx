import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from '../../../../components';
import { ProductErrors } from '../types';
import { useT } from '../../../../hooks/useT';
import { truncate } from '../../../../utils/string';

type Props = {
  productErrors: ProductErrors;
};

export function ProductErrorsCard({ productErrors }: Props) {
  const t = useT();

  const [show, setShow] = useState(false);

  const { product, errors } = productErrors;

  const Icon = show ? ExpandLessIcon : ExpandMoreIcon;

  return (
    <Card key={product.id}>
      <CardHeader className="tw-flex-row tw-items-center tw-justify-between">
        <CardTitle className="tw-text-md tw-line-clamp-1">
          {truncate(product.name, 30)}
        </CardTitle>

        <button
          className="tw-flex tw-gap-4 tw-items-center"
          onClick={() => setShow(!show)}
        >
          <Badge variant="destructive">
            {t('ERRORS', { count: errors.length })}
          </Badge>

          <Icon
            className="tw-mr-2 tw-h-6 tw-w-6"
            onClick={() => setShow(!show)}
          />
        </button>
      </CardHeader>
      {show ? (
        <CardContent className="tw-grid tw-gap-2">
          {errors.map((error) => (
            <Alert
              key={error.type}
              variant="destructive"
              title={t(error.type, { ...error, name: t(error.label) })}
            />
          ))}
        </CardContent>
      ) : null}
    </Card>
  );
}
