export type Fabrication = {
  id: string;
  // Points to a historical product configuration
  productId: string;
  productIteration: number;
  // Points to a historical cobot configuration
  configurationId: string;
  data: FabricationData;
  createdAt: string;
  // The current migration version, used whenever there is an update
  // of the application to migrate the `Product` to the latest
  // database version.
  migration: number;
};

export type FabricationData = {
  success: boolean;
  error: string;
  duration: number;
};
