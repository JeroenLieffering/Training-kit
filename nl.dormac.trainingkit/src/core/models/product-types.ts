/**
 * The state of the product can be:
 *
 * 1. active: the product is valid and active, it can be fabricated.
 *
 * 2. inactive: the user marked the product as inactive, the user does
 *    not want the product to show up on the products page.
 *
 * 3. invalidated: due to a change in the Cobots config the product
 *    can no longer be produced. The user can fix the product by
 *    re-configuring the product
 */
export type ProductState = 'active' | 'deactivated' | 'invalidated';

export type Product = {
  id: string;
  name: string;
  description: string;
  color: string;
  state: ProductState;
  icon: ProductIcon;
  config: ProductConfig;
  // Last known fabrication duration null when never fabricated
  lastFabricationDuration: number | null;
  // Last known amount entered by the user for fabrication
  lastFabricationAmount: number | null;
  // Each save increases the iteration
  iteration: number;
  createdAt: string;
  updatedAt: string;
  // The current migration version, used whenever there is an update
  // of the application to migrate the `Product` to the latest
  // database version.
  migration: number;
};

export type ProductHistory = {
  id: string;
  productId: string;
  iteration: number;
  config: ProductConfig;
  createdAt: string;
  // The current migration version, used whenever there is an update
  // of the application to migrate the `Product` to the latest
  // database version.
  migration: number;
};

export const PRODUCT_ICONS = [
  'wrench',
  'gear',
  'hammer',
  'saw',
  'construction',
  'fan',
  'car',
  'truck',
  'motor',
  'boat',
  'rocket',
  'plane',
  'tube',
  'circle',
  'square',
  'hexagon',
  'lamp',
  'castle',
  'anchor',
  'briefcase',
  'puzzle',
  'heart',
  'star',
  'flag',
  'sun',
  'moon',
  'bolt',
] as const;

export type ProductIcon = (typeof PRODUCT_ICONS)[number];

export type IOMode = 'INPUT' | 'OUTPUT' | 'INPUT_OUTPUT';

export type ProductConfig = {
  IO_MODE: IOMode;
  STEPPED_AXIS: boolean;
  USE_SUB_SPINDLE: boolean;
  USE_SECOND_GRIPPER: boolean;

  ROUND_PRODUCT: boolean;
  PUSH_AFTER_PLACE: boolean;
  PUSH_GRIPPER_CLOSED: boolean;
  FORCE_INFEED: boolean;
  CLEAN_PRODUCT: boolean;
  AIRPURGE_BEFORE_INFEED: boolean;
  AIRPURGE_BEFORE_OUTFEED: boolean;
  AIRPURGE_AFTER_OUTFEED: boolean;

  PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION: boolean;
  PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX: string;

  RAW_MAT_HEIGHT: string;
  RAW_MAT_LENGTH: string;
  RAW_MAT_WIDTH: string;
  RAW_MAT_DIAMETER: string;
  RAW_MAT_WEIGHT: string;

  FIN_PRODUCT_HEIGHT: string;
  FIN_PRODUCT_LENGTH: string;
  FIN_PRODUCT_WIDTH: string;
  FIN_PRODUCT_DIAMETER: string;
  FIN_PRODUCT_WEIGHT: string;
  FIN_BOTTOM_OFFSET: string;
  FIN_TOP_OFFSET: string;

  POSITIONING_PIN_DIAMETER: string;
  DISTANCE_POSITIONING_PINS: string;
  POS_POSPIN1_X: string;
  POS_POSPIN1_Y: string;
  EQUAL_GRID: boolean;

  DRAWER_AMOUNT_PRODUCT_X: string;
  DRAWER_AMOUNT_PRODUCT_Y: string;
  DRAWER_AMOUNT_PRODUCT_Z: string;

  GR1_CLAW_DEPTH: string;
  GR1_CLAW_HEIGHT: string;

  GR2_CLAW_DEPTH: string;
  GR2_CLAW_HEIGHT: string;

  MAIN_CLAW_HEIGHT: string;
  MAIN_CLAW_DEPTH: string;

  SUB_CLAW_HEIGHT: string;
  SUB_CLAW_DEPTH: string;

  DRAWER_PICK_OFFSET_X: string;
  DRAWER_PICK_OFFSET_Y: string;
  DRAWER_PICK_OFFSET_Z: string;
  DRAWER_PLACE_OFFSET_X: string;
  DRAWER_PLACE_OFFSET_Y: string;
  DRAWER_PLACE_OFFSET_Z: string;

  MACHINE_PLACE_POSITION_INDEX: string;
  MACHINE_PICK_POSITION_INDEX: string;

  MACHINE_PICK_HEIGHT_OFFSET: string;
  MACHINE_PICK_DEPTH_OFFSET: string;

  MACHINE_PLACE_HEIGHT_OFFSET: string;
  MACHINE_PLACE_DEPTH_OFFSET: string;

  FORCE_FEEDING_NEWTON: string;
  FORCE_PUSHING_NEWTON: string;

  STATIC_GRID_INDEX: string;
  STATIC_GRID_INDEX_SECOND_DRAWER: string;

  /**
   * If the reach test program was ran for this product.
   *
   * The reach test will test if all squares can be reached for this
   * product configuration. The main.drl should only be allowed to
   * run if the reach has been tested.
   */
  REACH_TESTED: boolean;

  /**
   * The results of testing the reach each index maps to a square when
   * `true` the square can be reached, when `false` the square cannot
   * be reached and should not be used.
   */
  SPOT_STATUS: boolean[];

  /*
    The following types are applicable when the feeder is an 
    EASY_LOADER, the grid is static, and when the CobotConfig
    says HAS_SECOND_DRAWER is `true`.
  */
  PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER: boolean;
  SECOND_DRAWER_AMOUNT_PRODUCT_X: string;
  SECOND_DRAWER_AMOUNT_PRODUCT_Y: string;
  SECOND_DRAWER_AMOUNT_PRODUCT_Z: string;
  SECOND_DRAWER_REACH_TESTED: boolean;
  SECOND_DRAWER_SPOT_STATUS: boolean[];
};

export const PRODUCT_COLORS = [
  '#000000', //black:
  '#ef4444', //red:
  '#f97316', //orange:
  '#f59e0b', //amber:
  '#eab308', //yellow:
  '#84cc16', //lime:
  '#22c55e', //green:
  '#10b981', //emerald:
  '#14b8a6', //teal:
  '#06b6d4', //cyan:
  '#0ea5e9', //sky:
  '#3b82f6', //blue:
  '#6366f1', //indigo:
  '#8b5cf6', //violet:
  '#a855f7', //purple:
  '#d946ef', //fuchsia:
  '#ec4899', //pink:
  '#f43f5e', //rose:
] as const;
