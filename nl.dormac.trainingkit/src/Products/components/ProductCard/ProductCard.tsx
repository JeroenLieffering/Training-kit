import React from 'react';
import {
  Badge,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  MonoText,
  ProductCircleIcon,
  Time,
} from '../../../components';
import { Product } from '../../../core/models/product-types';
import { useT } from '../../../hooks/useT';
import { cn } from '../../../shadcn/utils/cn';
import { truncate } from '../../../utils/string';

type Props = {
  product: Product;
  onClick: (product: Product) => void;
};

export function ProductCard({ product, onClick }: Props) {
  const t = useT();

  return (
    <Card onClick={() => onClick(product)} className="tw-rounded-none tw-h-60">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill={product.color}
          fillOpacity="1"
          d="M0,160L1440,64L1440,0L0,0Z"
        ></path>
      </svg>

      <CardHeader className="tw-my-0 tw-py-0 tw-relative -tw-top-6">
        <CardTitle>{truncate(product.name, 20)}</CardTitle>
        <CardDescription className="tw-h-16 tw-line-clamp-2">
          {truncate(product.description, 75)}
        </CardDescription>
      </CardHeader>

      <CardFooter
        className={cn(product.icon ? 'tw-justify-between' : 'tw-justify-end')}
      >
        <ProductCircleIcon product={product} />

        {product.state === 'deactivated' ? (
          <Badge className="tw-uppercase">{t('DEACTIVATED')}</Badge>
        ) : product.state === 'invalidated' ? (
          <Badge variant="destructive" className="tw-uppercase">
            {t('INVALID')}
          </Badge>
        ) : product.lastFabricationDuration ? (
          <MonoText>
            <Time ms={product.lastFabricationDuration} />
          </MonoText>
        ) : null}
      </CardFooter>
    </Card>
  );
}
