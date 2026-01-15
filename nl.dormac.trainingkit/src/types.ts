import { ProductFormSubPage } from './ProductForm/types';
import { SetupSubPage } from './Setup/types';

export type CobotInfo = {
  model: string;
  carryWeight: number;
  carryWeightMax: number;
};

export type Page =
  | { page: 'PRODUCTS' }
  | { page: 'KITCHEN_SINK' }
  | { page: 'MAINTENANCE' }
  | { page: 'SETUP'; subPage: SetupSubPage }
  | { page: 'PRODUCT_DETAIL'; productID: string }
  | { page: 'PRODUCT_EDIT'; productID: string; subPage: ProductFormSubPage }
  | { page: 'PRODUCT_CREATE'; subPage: ProductFormSubPage };

export type GripperInfo = {
  supplier: GripperSupplier;
  gripper: Gripper;
};

export type GripperSupplier = {
  id: string;
  name: string;
  grippers: ReadonlyArray<Readonly<Gripper>>;
};

export type Gripper = {
  id: string;
  name: string;
  weight: number;
  carryWeight: number;
  addons: ReadonlyArray<Readonly<Addon>>;
};

export type Addon = {
  id: string;
  name: string;
  weight: number;
};

export type FeederInfo = {
  id: string;
  name: string;
  height: {
    min: number;
    max: number;
  };
  width: {
    min: number;
    max: number;
  };
  length: {
    min: number;
    max: number;
  };
};

export type MetaLoader = FeederInfo & {
  drawerHeight: number;
};

export type PinPair = [pin1: PinPosition, pin2: PinPosition];

export type PinTriplet = [
  pin1: PinPosition,
  pin2: PinPosition,
  pin3: PinPosition,
];

export type PinSpot = PinPair | PinTriplet;

export type PinPosition = {
  col: number;
  row: number;
};

export type PoseMode = 'TASK' | 'JOINT';
