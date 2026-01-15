import { GRIPPER_SUPPLIERS } from '../../config';
import { useToolWeight } from '../../hooks/useToolWeight';
import {
  configEasyloaderWithPinnedGrid,
  configEasyloaderWithStaticGrid,
  configMetaLoaderWithPinnedGrid,
  configMetaLoaderWithStaticGrid,
  configProFeederWithPinnedGrid,
} from '../fixtures/cobot-config-fixtures';
import {
  getAmountOfSquaresMainDrawer,
  getAmountOfSquaresSecondDrawer,
  getDrawerCount,
  getSecondDrawerStaticGridConfig,
  getMainDrawerStaticGridConfig,
  isConfiguredWithStaticEasyLoaderWithSecondDrawer,
  isConfiguredWithStaticGrid,
  isConfiguredWithSupportForMultipleDrawers,
  maxCarryWeight,
} from './cobot-config-service';

describe('service: CobotConfig', () => {
  describe('isConfiguredWithStaticGrid', () => {
    it('should when feeder is META_LOADER listen to the GRID_TYPE', () => {
      expect(isConfiguredWithStaticGrid(configMetaLoaderWithStaticGrid())).toBe(
        true,
      );
      expect(isConfiguredWithStaticGrid(configMetaLoaderWithPinnedGrid())).toBe(
        false,
      );
    });

    it('should when feeder is EASY_LOADER listen to the GRID_TYPE', () => {
      expect(isConfiguredWithStaticGrid(configEasyloaderWithStaticGrid())).toBe(
        true,
      );
      expect(isConfiguredWithStaticGrid(configEasyloaderWithPinnedGrid())).toBe(
        false,
      );
    });

    it('should when feeder is PRO_FEEDER ignore the GRID_TYPE and always return static', () => {
      expect(isConfiguredWithStaticGrid(configProFeederWithPinnedGrid())).toBe(
        false,
      );

      const cobotConfig = configProFeederWithPinnedGrid();
      cobotConfig.config.GRID_TYPE = 'STATIC';
      expect(isConfiguredWithStaticGrid(cobotConfig)).toBe(false);
    });
  });

  describe('getMainDrawerStaticGridConfig', () => {
    it('should return the static grid configuration based on the STATIC_GRID_INDEX', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();

      expect(getMainDrawerStaticGridConfig(cobotConfig)).toEqual({
        name: '5 x 4',

        DRAWER_LEFT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_LEFT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],

        AMOUNT_SQUARES_X_AXIS: '5',
        AMOUNT_SQUARES_Y_AXIS: '4',
      });

      cobotConfig.config.STATIC_GRID_INDEX = '1';

      expect(getMainDrawerStaticGridConfig(cobotConfig)).toEqual({
        name: '7 x 4',

        DRAWER_LEFT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_LEFT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],

        AMOUNT_SQUARES_X_AXIS: '7',
        AMOUNT_SQUARES_Y_AXIS: '4',
      });
    });
  });

  describe('getSecondDrawerStaticGridConfig', () => {
    it('should return the static grid configuration based on the STATIC_GRID_INDEX', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();

      expect(getSecondDrawerStaticGridConfig(cobotConfig)).toEqual({
        name: '5 x 4',

        DRAWER_LEFT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_LEFT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],

        AMOUNT_SQUARES_X_AXIS: '5',
        AMOUNT_SQUARES_Y_AXIS: '4',
      });

      cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX = '1';

      expect(getSecondDrawerStaticGridConfig(cobotConfig)).toEqual({
        name: '7 x 4',

        DRAWER_LEFT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_FRONT_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_LEFT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],
        DRAWER_RIGHT_BACK_TEACH_POSITION: [0, 0, 0, 0, 0, 0],

        AMOUNT_SQUARES_X_AXIS: '7',
        AMOUNT_SQUARES_Y_AXIS: '4',
      });
    });
  });

  describe('maxCarryWeight', () => {
    it('should know how to calculate the max carry weight when there are multiple grippers with addons', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

      cobotConfig.config.GR1_SUPPLIER = GRIPPER_SUPPLIERS[0].id;
      // GPD5010N-AL-A weighs 1.5 kg
      cobotConfig.config.GR1_TYPE = GRIPPER_SUPPLIERS[0].grippers[0].id;
      // 2x EB5010AL weighs 0.57 kg
      cobotConfig.config.GR1_ADDONS = [
        GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id,
        GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id,
        GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id,
      ];

      cobotConfig.config.GR2_SUPPLIER = GRIPPER_SUPPLIERS[0].id;
      // GPD5010N-AL-A weighs 1.5 kg
      cobotConfig.config.GR2_TYPE = GRIPPER_SUPPLIERS[0].grippers[0].id;
      // 2x EB5010AL weighs 0.57 kg
      cobotConfig.config.GR2_ADDONS = [
        GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id,
        GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id,
      ];

      const max = maxCarryWeight(
        {
          model: 'TEST',
          carryWeight: 90,
          carryWeightMax: 100,
        },
        toolWeight,
      );

      // 100 - 1.5 - 1.5 - (0.57 * 2) - (0.57 * 3)
      expect(max).toBe(94.15);
    });

    it('should know how to calculate the max carry weight when there are multiple grippers without addons', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

      cobotConfig.config.GR1_SUPPLIER = GRIPPER_SUPPLIERS[0].id;
      // GPD5010N-AL-A weighs 1.5 kg
      cobotConfig.config.GR1_TYPE = GRIPPER_SUPPLIERS[0].grippers[0].id;
      cobotConfig.config.GR1_ADDONS = [];

      cobotConfig.config.GR2_SUPPLIER = GRIPPER_SUPPLIERS[1].id;
      // 3FG25 weighs 1.6 kg
      cobotConfig.config.GR2_TYPE = GRIPPER_SUPPLIERS[1].grippers[0].id;
      cobotConfig.config.GR2_ADDONS = [];

      const max = maxCarryWeight(
        {
          model: 'TEST',
          carryWeight: 90,
          carryWeightMax: 100,
        },
        toolWeight,
      );

      // 100 - 1.5 - 1.6
      expect(max).toBe(96.9);
    });

    it('should know how to calculate the max carry weight when there is one gripper with addons', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

      cobotConfig.config.GR1_SUPPLIER = GRIPPER_SUPPLIERS[0].id;
      // GPP5010N-AL-A weighs 0.82 kg
      cobotConfig.config.GR1_TYPE = GRIPPER_SUPPLIERS[0].grippers[3].id;
      // EB5010AL weighs 0.38 kg
      cobotConfig.config.GR1_ADDONS = [
        GRIPPER_SUPPLIERS[0].grippers[3].addons[0].id,
        GRIPPER_SUPPLIERS[0].grippers[3].addons[0].id,
        GRIPPER_SUPPLIERS[0].grippers[3].addons[0].id,
      ];

      cobotConfig.config.HAS_SECOND_GRIPPER = false;

      cobotConfig.config.GR2_SUPPLIER = '';
      cobotConfig.config.GR2_TYPE = '';
      cobotConfig.config.GR2_ADDONS = [];

      const max = maxCarryWeight(
        {
          model: 'TEST',
          carryWeight: 90,
          carryWeightMax: 100,
        },
        toolWeight,
      );

      // 100 - 0.82 - (0.38 * 3)
      expect(max).toBe(98.04);
    });

    it('should know how to calculate the max carry weight when there is one gripper without addons', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

      cobotConfig.config.GR1_SUPPLIER = GRIPPER_SUPPLIERS[0].id;
      // GPP5010N-AL-A weighs 0.82 kg
      cobotConfig.config.GR1_TYPE = GRIPPER_SUPPLIERS[0].grippers[3].id;
      cobotConfig.config.GR1_ADDONS = [];

      cobotConfig.config.HAS_SECOND_GRIPPER = false;

      cobotConfig.config.GR2_SUPPLIER = '';
      cobotConfig.config.GR2_TYPE = '';
      cobotConfig.config.GR2_ADDONS = [];

      const max = maxCarryWeight(
        {
          model: 'TEST',
          carryWeight: 90,
          carryWeightMax: 100,
        },
        toolWeight,
      );

      // 100 - 0.82
      expect(max).toBe(99.18);
    });

    it('should know how to calculate the max carry weight when there are no grippers', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

      cobotConfig.config.GR1_SUPPLIER = '';
      cobotConfig.config.GR1_TYPE = '';
      cobotConfig.config.GR1_ADDONS = [];

      cobotConfig.config.HAS_SECOND_GRIPPER = true;

      cobotConfig.config.GR2_SUPPLIER = '';
      cobotConfig.config.GR2_TYPE = '';
      cobotConfig.config.GR2_ADDONS = [];

      const max = maxCarryWeight(
        {
          model: 'TEST',
          carryWeight: 90,
          carryWeightMax: 100,
        },
        toolWeight,
      );
      expect(max).toBe(100);
    });
  });

  describe('getDrawerCount', () => {
    it('should when feeder is META_LOADER listen to the NUMBER_OF_DRAWERS', () => {
      const cobotConfig = configMetaLoaderWithStaticGrid();
      cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS = '19';
      expect(getDrawerCount(cobotConfig)).toBe(19);
    });

    it('should when feeder is EASY_LOADER always return one', () => {
      expect(getDrawerCount(configEasyloaderWithStaticGrid())).toBe(1);

      const cobotConfig = configProFeederWithPinnedGrid();
      cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
      expect(getDrawerCount(cobotConfig)).toBe(1);
    });

    it('should when feeder is PRO_FEEDER listen to the NUMBER_OF_DRAWERS', () => {
      const cobotConfig = configProFeederWithPinnedGrid();
      cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS = '7';
      expect(getDrawerCount(cobotConfig)).toBe(7);
    });
  });

  describe('isConfiguredWithSupportForMultipleDrawers', () => {
    it('should when feeder is META_LOADER it should return true', () => {
      expect(
        isConfiguredWithSupportForMultipleDrawers(
          configMetaLoaderWithStaticGrid(),
        ),
      ).toBe(true);
    });

    it('should when feeder is EASY_LOADER it should return false', () => {
      expect(
        isConfiguredWithSupportForMultipleDrawers(
          configEasyloaderWithStaticGrid(),
        ),
      ).toBe(false);
    });

    it('should when feeder is PRO_FEEDER it should return true', () => {
      expect(
        isConfiguredWithSupportForMultipleDrawers(
          configProFeederWithPinnedGrid(),
        ),
      ).toBe(true);
    });
  });

  describe('isConfiguredWithStaticEasyLoaderWithSecondDrawer', () => {
    describe('when feeder is EASY_LOADER', () => {
      it('should return false when using a pinned grid', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        // This config is actually illegal but lets trigger it anyway
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

        expect(
          isConfiguredWithStaticEasyLoaderWithSecondDrawer(cobotConfig),
        ).toBe(false);
      });

      it('should return false when there is no second drawer but there is a static grid', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;

        expect(
          isConfiguredWithStaticEasyLoaderWithSecondDrawer(cobotConfig),
        ).toBe(false);
      });

      it('should return true when grid is static and there is a second drawer', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

        expect(
          isConfiguredWithStaticEasyLoaderWithSecondDrawer(cobotConfig),
        ).toBe(true);
      });
    });

    it('should when feeder is META_LOADER it should return false', () => {
      expect(
        isConfiguredWithStaticEasyLoaderWithSecondDrawer(
          configMetaLoaderWithStaticGrid(),
        ),
      ).toBe(false);
    });

    it('should when feeder is PRO_FEEDER it should return false', () => {
      expect(
        isConfiguredWithStaticEasyLoaderWithSecondDrawer(
          configProFeederWithPinnedGrid(),
        ),
      ).toBe(false);
    });
  });

  describe('getAmountOfSquaresMainDrawer', () => {
    it('should return the number of squares when the grid is a static grid', () => {
      const cobotConfig = configMetaLoaderWithStaticGrid();
      cobotConfig.config.STATIC_GRIDS[0].AMOUNT_SQUARES_X_AXIS = '2';
      cobotConfig.config.STATIC_GRIDS[0].AMOUNT_SQUARES_Y_AXIS = '4';
      expect(getAmountOfSquaresMainDrawer(cobotConfig)).toBe(8);
    });

    it('should throw and error when the grid is a pinned grid', () => {
      const cobotConfig = configEasyloaderWithPinnedGrid();
      expect(() => getAmountOfSquaresMainDrawer(cobotConfig)).toThrow(
        'pinned grid has no squares',
      );
    });
  });

  describe('getAmountOfSquaresSecondDrawer', () => {
    it('should return the number of squares when the grid is a static grid', () => {
      const cobotConfig = configMetaLoaderWithStaticGrid();
      cobotConfig.config.STATIC_GRIDS[0].AMOUNT_SQUARES_X_AXIS = '3';
      cobotConfig.config.STATIC_GRIDS[0].AMOUNT_SQUARES_Y_AXIS = '6';
      expect(getAmountOfSquaresSecondDrawer(cobotConfig)).toBe(18);
    });

    it('should throw and error when the grid is a pinned grid', () => {
      const cobotConfig = configEasyloaderWithPinnedGrid();
      expect(() => getAmountOfSquaresSecondDrawer(cobotConfig)).toThrow(
        'pinned grid has no squares',
      );
    });
  });
});
