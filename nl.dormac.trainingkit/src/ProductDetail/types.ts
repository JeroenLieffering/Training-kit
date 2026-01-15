import { Drawer } from '../core/services/drawer-service';
import {
  MetaSuiteProgramJSON,
  MetaSuiteProgramPhase,
  MetaSuiteProgramSpindleStatus,
} from '../drl/main/types';

export type TimePeriod = {
  start: number;
  end: number;
  type: 'paused' | 'running';
};

export type ResumeForm = {
  mode: 'restart' | 'continue';
  MACHINE_CONTAINS_PRODUCT: boolean;
  USE_CURRENT_DRAWER: boolean;
};

export type FabricationState = {
  /**
   * The amount that is going to be produced.
   */
  amount: number;

  /**
   * The drawer that is active is either the main drawer or the second
   * drawer.
   *
   * The second drawer should only be given when the feeder is an
   * EASY_LOADER, the grid is static, and when the CobotConfig
   * says HAS_SECOND_DRAWER is `true` and if the ProductConfigs
   * `PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER` is true
   */
  activeDrawer: Drawer;

  /**
   * The phase the MetaSuiteProgram is in.
   */
  phase: MetaSuiteProgramPhase;

  /**
   * The amount of products left to be produced
   */
  productsToFabricate: number;

  /**
   * The amount the user entered that he / she wanted to
   * produce, but was interrupted by a non NORMAL stop.
   */
  amountBeforeStop: number;

  /**
   * The drawer the cobot is currently on.
   */
  drawerCount: number;

  /**
   * The finished products the cobot has placed back on the current
   * drawer. Will reset after each drawer changed.
   */
  productsPlacedOnCurrentDrawer: number;

  /**
   * The raw products the cobot has picked up from the current
   * drawer. Will reset after each drawer changed.
   */
  productsPickedOnCurrentDrawer: number;

  /**
   * The number of times for this run that the pickup failed
   */
  pickupFails: number;

  /**
   * The number of products successfully produced on current drawer
   */
  productsFabricatedOnCurrentDrawer: number;

  /**
   * The number of products successfully produced in run
   */
  totalProductsFabricated: number;

  /**
   * What is in gripper 1.
   */
  gripper1Status: MetaSuiteProgramSpindleStatus;

  /**
   * What is in gripper 2.
   */
  gripper2Status: MetaSuiteProgramSpindleStatus;

  /**
   * What is in gripper 1.
   */
  mainSpindleStatus: MetaSuiteProgramSpindleStatus;

  /**
   * What is in gripper 2.
   */
  subSpindleStatus: MetaSuiteProgramSpindleStatus;

  onStatusReceived: (status: MetaSuiteProgramJSON) => void;

  userChangedAmount: (newAmount: number) => void;

  startFabrication: (newAmount: number) => void;

  resumeFabrication: (newAmount: number) => void;

  onStop: () => void;

  resetState: () => void;
};

export type Timer = {
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  getDuration: () => number;
  resetTimer: () => void;
};
