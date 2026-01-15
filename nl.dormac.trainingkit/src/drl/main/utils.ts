import { MetaSuiteProgramJSON, MetaSuiteProgramPhase } from './types';

export function isMetaSuiteProgramStateMessage(value: string) {
  return value.startsWith('METASUITE:');
}

export function parseMetaSuiteProgramJSON(value: string) {
  const payload = value.split('METASUITE:')[1];
  const [
    state,
    productsToFabricate,
    productsFabricatedOnCurrentDrawer,
    productsPlacedOnCurrentDrawer,
    productsPickedOnCurrentDrawer,
    productsDroppedOnDropOff,
    xPick,
    yPick,
    zPick,
    xPlace,
    yPlace,
    zPlace,
    drawerCount,
    firstRawMaterialThatWasTakenFromDrawerIsInMachine,
    pickupFails,
    totalProductsFabricated,
    mainSpindleStatus,
    subSpindleStatus,
    gripper1Status,
    gripper2Status,
    phase,
  ] = JSON.parse(payload);

  const json = {
    state,
    productsToFabricate,
    productsFabricatedOnCurrentDrawer,
    productsPlacedOnCurrentDrawer,
    productsPickedOnCurrentDrawer,
    productsDroppedOnDropOff,
    xPick,
    yPick,
    zPick,
    xPlace,
    yPlace,
    zPlace,
    drawerCount,
    firstRawMaterialThatWasTakenFromDrawerIsInMachine,
    pickupFails,
    totalProductsFabricated,
    mainSpindleStatus,
    subSpindleStatus,
    gripper1Status,
    gripper2Status,
    phase: phaseToString(phase),
  } as MetaSuiteProgramJSON;

  return json;
}

function phaseToString(status: number): MetaSuiteProgramPhase {
  if (status === 0) {
    return 'CONFIGURE_MACHINE_PHASE';
  }

  if (status === 1) {
    return 'EXIT_PROGRAM_PHASE';
  }

  if (status === 2) {
    return 'DETERMINE_START_PHASE';
  }

  if (status === 3) {
    return 'PICK_RAW_MATERIAL_FROM_DRAWER_PHASE';
  }

  if (status === 4) {
    return 'PLACE_RAW_MATERIAL_IN_MACHINE_PHASE';
  }

  if (status === 5) {
    return 'PICK_FINISHED_PRODUCT_FROM_MACHINE_PHASE';
  }

  if (status === 6) {
    return 'PLACE_FINISHED_PRODUCT_ON_DRAWER_PHASE';
  }

  if (status === 7) {
    return 'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_PHASE';
  }

  if (status === 8) {
    return 'REACH_TEST_PHASE';
  }

  return 'CONFIGURE_MACHINE_PHASE';
}
