import SettingsIcon from '@mui/icons-material/Settings';
import { ProgramState } from 'dart-api';
import React from 'react';
import {
  BackButton,
  Button,
  Container,
  Debug,
  LeftRight,
  ProductCircleIcon,
  Separator,
  Title,
  TopBar,
} from '../components';
import { useCobotConfig } from '../hooks/useCobotConfig';
import { useNavigate } from '../hooks/useNavigate';
import { useProduct } from '../hooks/useProduct';
import { ProductDetailConfiguration } from './components/ProductDetailConfiguration/ProductDetailConfiguration';
import { ProductDetailInfo } from './components/ProductDetailInfo/ProductDetailInfo';
import { ProductFabricateBar } from './components/ProductFabricateBar/ProductFabricateBar';
import { useFabricationState } from './hooks/useFabricationState';
import { useProgramState } from './hooks/useProgramState';
import { useT } from '../hooks/useT';
import { truncate } from '../utils/string';
import { CobotConfig } from '../core/models/cobot-config-types';
import { Product } from '../core/models/product-types';
import { useCobotInfo } from '../hooks/useCobotInfo';

type Props = {
  productID: string;
};

export function ProductDetail({ productID }: Props) {
  const [product] = useProduct(productID);
  const [cobotConfig] = useCobotConfig();

  if (!product || !cobotConfig) {
    return null;
  }

  return <ProductDetailLoaded product={product} cobotConfig={cobotConfig} />;
}

export function ProductDetailLoaded({
  product,
  cobotConfig,
}: {
  product: Product;
  cobotConfig: CobotConfig;
}) {
  const t = useT();

  const navigateTo = useNavigate();

  const programState = useProgramState();

  const fabricationState = useFabricationState(cobotConfig, product);

  const cobotInfo = useCobotInfo();

  if (!cobotInfo) {
    return null;
  }

  return (
    <Container>
      <TopBar padRight={false}>
        <BackButton
          onClick={() => navigateTo({ page: 'PRODUCTS' })}
          disabled={programState !== ProgramState.NONE}
        >
          {t('PRODUCTS')}
        </BackButton>

        <Title className="tw-flex tw-items-center tw-gap-2">
          <ProductCircleIcon product={product} className="tw-mt-1" />
          {truncate(product.name, 20)}
        </Title>

        <Button
          icon={SettingsIcon}
          onClick={() =>
            navigateTo({
              page: 'PRODUCT_EDIT',
              productID: product.id,
              subPage: { page: 'INFO' },
            })
          }
          disabled={programState !== ProgramState.NONE}
        >
          {t('CONFIGURE')}
        </Button>
      </TopBar>

      <ProductFabricateBar
        product={product}
        cobotConfig={cobotConfig}
        cobotInfo={cobotInfo}
        fabricationState={fabricationState}
      />

      <Separator orientation="horizontal" />

      <LeftRight
        left={
          <ProductDetailConfiguration
            key={fabricationState.phase}
            product={product}
            cobotConfig={cobotConfig}
            fabricationState={fabricationState}
          />
        }
        right={
          <ProductDetailInfo
            key={fabricationState.productsToFabricate}
            product={product}
          />
        }
      />

      <Debug value={product} />
    </Container>
  );
}
