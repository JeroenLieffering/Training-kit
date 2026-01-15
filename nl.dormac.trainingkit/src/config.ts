import { CobotInfo, FeederInfo, GripperSupplier, MetaLoader } from './types';

/**
 * This is the migration indicator, it indicates for a `Product`,
 * `Fabrication` and `CobotConfig` on which version of the database
 * schema they are currently on.
 *
 * This value needs to be incremented by one whenever a new version
 * of MetaSuite / the application is released and the database changes
 *
 * NOTE: the migration code has not been implemented yet but in the
 * future the paragraph below will describe how it will work!
 *
 * The application will then on boot check if a migration needs to
 * be done and walk through all migrations until everything is
 * updated to the latest version.
 */
export const MIGRATION = 0;

/**
 * When true the application will show debug information, inside
 * of a open / close button. The information is then shown as JSON.
 *
 * Also the setup is not guarded by the SETUP_PASSWORD.
 */
export const DEBUG = false;

/**
 * Puts the application in DEMO mode:
 *
 * 1. The maintenance modes main- and sub spindle can be opened
 *   and closed even of port 13 does not send a signal.
 *
 * 2. The number of products on a drawer can be overridden via
 *    `DEMO_NO_PRODUCTS_PER_DRAWER`.
 */
export const DEMO = false;

/**
 * When `DEMO` is true `DEMO_NO_PRODUCTS_PER_DRAWER` overrides
 * the number of products on a drawer, useful for when you want to
 * show off drawer changes.
 *
 * When set to `0` it will ignore `DEMO` mode and just return the
 * actual amount of products for the drawer.
 */
export const DEMO_NO_PRODUCTS_PER_DRAWER = 4;

/**
 * When `DEMO` is true `DEMO_MAX_DRAWER_AMOUNT` overrides
 * the number of max drawers, useful for when you want to
 * show off drawer changes.
 *
 * When set to `0` it will ignore `DEMO` mode and just return the
 * actual amount of products for the drawer.
 */
export const DEMO_MAX_DRAWER_AMOUNT = 100;

/**
 * The password to get into the setup.
 */
export const SETUP_PASSWORD = 'Dormac1648!';

export const COBOTS: ReadonlyArray<Readonly<CobotInfo>> = [
  { model: 'M0617', carryWeight: 6, carryWeightMax: 6.6 },
  { model: 'M1013', carryWeight: 10, carryWeightMax: 11 },
  { model: 'H2017', carryWeight: 20, carryWeightMax: 22 },
  { model: 'H2515', carryWeight: 25, carryWeightMax: 27.5 },
] as const;

export const GRIPPER_SUPPLIERS: ReadonlyArray<Readonly<GripperSupplier>> = [
  {
    id: 'ZIMMER',
    name: 'Zimmer',
    grippers: [
      {
        id: 'b9e93294-a8e8-4a07-8919-84e30281a849',
        name: 'GPD5010N-AL-A',
        weight: 1.5,
        carryWeight: 233,
        addons: [
          {
            id: '10771b82-4f8f-4089-af36-fdee4fbb376c',
            name: 'EB5010AL',
            weight: 0.57,
          },
        ],
      },
      {
        id: 'fa248be8-8367-40f0-be30-dbcb00a67a3b',
        name: 'GPD5008N-AL-A',
        weight: 0.88,
        carryWeight: 128,
        addons: [
          {
            id: '3a428941-ce6e-4885-a973-7f1bebdbbd4b',
            name: 'EB5008AL',
            weight: 0.42,
          },
        ],
      },
      {
        id: 'f340169d-018e-4505-b429-ec02c7640e26',
        name: 'GPD5006N-AL-A',
        weight: 0.47,
        carryWeight: 75,
        addons: [
          {
            id: '98ea7193-d25f-47f1-8fbb-1382e3f2ec6f',
            name: 'EB5006AL',
            weight: 0.3,
          },
        ],
      },
      {
        id: '7c794eb1-b6aa-4dcc-88aa-b22772ac1dcc',
        name: 'GPP5010N-AL-A',
        weight: 0.82,
        carryWeight: 90,
        addons: [
          {
            id: '9fdb7021-4893-4280-87a4-c45fb1e3d698',
            name: 'EB5010AL',
            weight: 0.38,
          },
        ],
      },
      {
        id: '09155356-51c7-47d9-92d1-9295ce26c6ad',
        name: 'GPP5008N-AL-A',
        weight: 0.51,
        carryWeight: 53,
        addons: [
          {
            id: '3e0ea167-5412-4a91-85ff-de0895447807',
            name: 'EB5008AL',
            weight: 0.28,
          },
        ],
      },
      {
        id: '2b60f4d6-7967-46a1-9eb0-d78d9de24a42',
        name: 'GPP5006N-AL-A',
        weight: 0.28,
        carryWeight: 33,
        addons: [
          {
            id: 'af0e3b5c-42f2-47c8-9ecb-3c9d84b6b4e2',
            name: 'EB5006AL',
            weight: 0.2,
          },
        ],
      },
    ],
  },
  {
    id: 'ON_ROBOT',
    name: 'OnRobot',
    grippers: [
      {
        id: '37710780-4a7a-492a-baee-2f8226bf31c5',
        name: '3FG25',
        weight: 1.6,
        carryWeight: 25,
        addons: [],
      },
      {
        id: 'b44b8bec-746f-45b8-9dd0-87f72d7adc04',
        name: '3FG15',
        weight: 1.15,
        carryWeight: 15,
        addons: [],
      },
      {
        id: '63d59afd-b226-491c-9911-11a275cd5290',
        name: '2FG14',
        weight: 1.5,
        carryWeight: 20,
        addons: [],
      },
      {
        id: '02486133-74c5-40c1-a483-4db8e97aa13c',
        name: '2FG7',
        weight: 1.1,
        carryWeight: 11,
        addons: [],
      },
    ],
  },
] as const;

export const EASY_LOADER_TYPES: ReadonlyArray<Readonly<FeederInfo>> = [
  {
    id: '781437aa-7ebc-4cec-b442-a86c7d80cf1c',
    name: 'EasyLoader',
    height: {
      min: 5,
      // By making it so large the MACHINE_MAX_FEED_HEIGHT will be used.
      max: 9999,
    },
    length: {
      min: 5,
      max: 1000,
    },
    width: {
      min: 5,
      max: 580,
    },
  },
] as const;

// TODO these mins and maxes are made up, should provide real values
export const PRO_FEEDER_TYPES: ReadonlyArray<Readonly<FeederInfo>> = [
  {
    id: 'd66447ed-8111-40f6-876e-9461d1f8dc07',
    name: 'ProFeeder',
    height: {
      min: 5,
      max: 100,
    },
    length: {
      min: 5,
      max: 100,
    },
    width: {
      min: 5,
      max: 100,
    },
  },
] as const;

export const META_LOADER_TYPES: ReadonlyArray<Readonly<MetaLoader>> = [
  {
    id: '07375393-72ce-4a35-9b33-2def6ff7e492',
    name: 'MetaLoader',
    drawerHeight: 130,
    height: {
      min: 5,
      max: -1, // Should be calculated for a meta loader.
    },
    length: {
      min: 5,
      max: 710,
    },
    width: {
      min: 5,
      max: 580,
    },
  },
] as const;

export const TOOL_WEIGHT_NAME = 'Tool_Weight';
export const GRIPPER_1_TCP = 'Gripper_1';
export const GRIPPER_2_TCP = 'Gripper_2';
export const AIR_PURGE_TCP = 'Air_Purge';
