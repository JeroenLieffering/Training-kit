import { SixNumArray } from 'dart-api';
import {
  configEasyloaderWithPinnedGrid,
  configEasyloaderWithStaticGrid,
  configMetaLoaderWithPinnedGrid,
  configMetaLoaderWithStaticGrid,
  configProFeederWithPinnedGrid,
  makedDropoffPosition,
  staticGridConfig5by4,
} from '../fixtures/cobot-config-fixtures';
import { cobotConfigValidator } from './cobot-config-validator';
import {
  DropOffPosition,
  MachinePosition,
  Positions,
  StaticGridConfig,
} from '../models/cobot-config-types';

describe('util: cobotConfigValidator', () => {
  describe('GRID_TYPE', () => {
    describe('with feeder EASY_LOADER', () => {
      it('should allow for a static grid when HAS_SECOND_DRAWER is true', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({});
      });

      it('should not allow for a pinned grid when HAS_SECOND_DRAWER is true', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({
          'config': {
            'GRID_TYPE': {
              'types': {
                'GRID_TYPE_MUST_BE_STATIC_WHEN_HAS_SECOND_DRAWER_IS_ON': {
                  'label': 'GRID_TYPE',
                  'name': 'config.GRID_TYPE',
                  'type':
                    'GRID_TYPE_MUST_BE_STATIC_WHEN_HAS_SECOND_DRAWER_IS_ON',
                },
              },
            },
          },
        });
      });

      it('should allow for a static grid when HAS_SECOND_DRAWER is false', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({});
      });

      it('should not allow for a pinned grid when HAS_SECOND_DRAWER is false', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({});
      });
    });

    describe('with feeder META_LOADER', () => {
      it('should allow for a static grid', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not allow for a pinned grid', () => {
        const cobotConfig = configMetaLoaderWithPinnedGrid();

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({});
      });
    });

    describe('with feeder PRO_FEEDER', () => {
      it('should not allow for a static grid', () => {
        const cobotConfig = configProFeederWithPinnedGrid();
        cobotConfig.config.GRID_TYPE = 'STATIC';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'GRID_TYPE': {
              'types': {
                'GRID_TYPE_MUST_BE_PINNED_WHEN_USING_PRO_FEEDER': {
                  'label': 'GRID_TYPE',
                  'name': 'config.GRID_TYPE',
                  'type': 'GRID_TYPE_MUST_BE_PINNED_WHEN_USING_PRO_FEEDER',
                },
              },
            },
          },
        });
      });

      it('should not allow for a pinned grid', () => {
        const cobotConfig = configMetaLoaderWithPinnedGrid();

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({});
      });
    });
  });

  describe('GRID_Y_OFFSET', () => {
    describe('with static grid', () => {
      it('should consider every value valid when there is a static grid', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.GRID_Y_OFFSET = value;

          return cobotConfigValidator(cobotConfig);
        }

        let result = check('49');
        expect(result.errors).toEqual({});

        result = check('50');
        expect(result.errors).toEqual({});

        result = check('51');
        expect(result.errors).toEqual({});

        result = check('299');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual({});
      });
    });

    describe('with pinned grid', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.GRID_Y_OFFSET = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'GRID_Y_OFFSET': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'GRID_Y_OFFSET',
                  'name': 'config.GRID_Y_OFFSET',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 50 and 300', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.GRID_Y_OFFSET = value;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'GRID_Y_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'GRID_Y_OFFSET',
                  'name': 'config.GRID_Y_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': 50,
                  'max': 300,
                },
              },
            },
          },
        };

        let result = check('49');
        expect(result.errors).toEqual(expectedError);

        result = check('50');
        expect(result.errors).toEqual({});

        result = check('51');
        expect(result.errors).toEqual({});

        result = check('299');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual(expectedError);
      });
    });
  });

  describe('X_OFFSET_ORIGIN', () => {
    describe('with static grid', () => {
      it('should consider every value valid when there is a static grid', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.X_OFFSET_ORIGIN = value;

          return cobotConfigValidator(cobotConfig);
        }

        let result = check('-1');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('349');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual({});
      });
    });

    describe('with pinned grid', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.X_OFFSET_ORIGIN = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'X_OFFSET_ORIGIN': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'X_OFFSET_ORIGIN',
                  'name': 'config.X_OFFSET_ORIGIN',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 0 and 300', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.X_OFFSET_ORIGIN = value;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'X_OFFSET_ORIGIN': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'X_OFFSET_ORIGIN',
                  'name': 'config.X_OFFSET_ORIGIN',
                  'type': 'NUMBER_BETWEEN',
                  'min': 0,
                  'max': 300,
                },
              },
            },
          },
        };

        let result = check('-1');
        expect(result.errors).toEqual(expectedError);

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('299');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual(expectedError);
      });
    });
  });

  describe('Y_OFFSET_ORIGIN', () => {
    describe('with static grid', () => {
      it('should consider every value valid when there is a static grid', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.Y_OFFSET_ORIGIN = value;

          return cobotConfigValidator(cobotConfig);
        }

        let result = check('-1');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('349');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual({});
      });
    });

    describe('with pinned grid', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.Y_OFFSET_ORIGIN = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'Y_OFFSET_ORIGIN': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'Y_OFFSET_ORIGIN',
                  'name': 'config.Y_OFFSET_ORIGIN',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 0 and 300', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.Y_OFFSET_ORIGIN = value;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'Y_OFFSET_ORIGIN': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'Y_OFFSET_ORIGIN',
                  'name': 'config.Y_OFFSET_ORIGIN',
                  'type': 'NUMBER_BETWEEN',
                  'min': 0,
                  'max': 300,
                },
              },
            },
          },
        };

        let result = check('-1');
        expect(result.errors).toEqual(expectedError);

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('299');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual(expectedError);
      });
    });
  });

  describe('Z_OFFSET_ORIGIN', () => {
    describe('with static grid', () => {
      it('should consider every value valid when there is a static grid', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.Z_OFFSET_ORIGIN = value;

          return cobotConfigValidator(cobotConfig);
        }

        let result = check('-1');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('349');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual({});
      });
    });

    describe('with pinned grid', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.Z_OFFSET_ORIGIN = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'Z_OFFSET_ORIGIN': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'Z_OFFSET_ORIGIN',
                  'name': 'config.Z_OFFSET_ORIGIN',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 0 and 300', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.Z_OFFSET_ORIGIN = value;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'Z_OFFSET_ORIGIN': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'Z_OFFSET_ORIGIN',
                  'name': 'config.Z_OFFSET_ORIGIN',
                  'type': 'NUMBER_BETWEEN',
                  'min': 0,
                  'max': 300,
                },
              },
            },
          },
        };

        let result = check('-1');
        expect(result.errors).toEqual(expectedError);

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('299');
        expect(result.errors).toEqual({});

        result = check('300');
        expect(result.errors).toEqual({});

        result = check('301');
        expect(result.errors).toEqual(expectedError);
      });
    });
  });

  describe('MACHINE_HAS_SUB_SPINDLE', () => {
    it('should when machine type is lathe allow a sub spindle', () => {
      function check(value: boolean) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_TYPE = 'LATHE';
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = value;

        return cobotConfigValidator(cobotConfig);
      }

      let result = check(true);
      expect(result.errors).toEqual({});

      result = check(false);
      expect(result.errors).toEqual({});
    });

    it('when machine type is mill not allow a sub spindle', () => {
      function check(value: boolean) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_TYPE = 'MILL';
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = value;

        return cobotConfigValidator(cobotConfig);
      }

      let result = check(true);
      expect(result.errors).toEqual({
        'config': {
          'MACHINE_HAS_SUB_SPINDLE': {
            'types': {
              'MILL_CANNOT_HAVE_A_SUB_SPINDLE': {
                'label': 'MACHINE_HAS_SUB_SPINDLE',
                'name': 'config.MACHINE_HAS_SUB_SPINDLE',
                'type': 'MILL_CANNOT_HAVE_A_SUB_SPINDLE',
              },
            },
          },
        },
      });

      result = check(false);
      expect(result.errors).toEqual({});
    });
  });

  describe('MACHINE_MAX_FEED_HEIGHT', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.MACHINE_MAX_FEED_HEIGHT = '';

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'MACHINE_MAX_FEED_HEIGHT': {
            'types': {
              'NOT_A_NUMBER': {
                'label': 'MACHINE_MAX_FEED_HEIGHT',
                'name': 'config.MACHINE_MAX_FEED_HEIGHT',
                'type': 'NOT_A_NUMBER',
              },
            },
          },
        },
      });
    });

    it('should be between 0.1 and 1000', () => {
      function check(value: string) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_MAX_FEED_HEIGHT = value;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'MACHINE_MAX_FEED_HEIGHT': {
            'types': {
              'NUMBER_BETWEEN': {
                'label': 'MACHINE_MAX_FEED_HEIGHT',
                'name': 'config.MACHINE_MAX_FEED_HEIGHT',
                'type': 'NUMBER_BETWEEN',
                'min': 0.1,
                'max': 1000,
              },
            },
          },
        },
      };

      let result = check('-1');
      expect(result.errors).toEqual(expectedError);

      result = check('0');
      expect(result.errors).toEqual(expectedError);

      result = check('0.1');
      expect(result.errors).toEqual({});

      result = check('1');
      expect(result.errors).toEqual({});

      result = check('100');
      expect(result.errors).toEqual({});

      result = check('1001');
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('MACHINE_MAX_FEED_LENGTH', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '';

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'MACHINE_MAX_FEED_LENGTH': {
            'types': {
              'NOT_A_NUMBER': {
                'label': 'MACHINE_MAX_FEED_LENGTH',
                'name': 'config.MACHINE_MAX_FEED_LENGTH',
                'type': 'NOT_A_NUMBER',
              },
            },
          },
        },
      });
    });

    it('should be between 0.1 and 1000', () => {
      function check(value: string) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_MAX_FEED_LENGTH = value;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'MACHINE_MAX_FEED_LENGTH': {
            'types': {
              'NUMBER_BETWEEN': {
                'label': 'MACHINE_MAX_FEED_LENGTH',
                'name': 'config.MACHINE_MAX_FEED_LENGTH',
                'type': 'NUMBER_BETWEEN',
                'min': 0.1,
                'max': 1000,
              },
            },
          },
        },
      };

      let result = check('-1');
      expect(result.errors).toEqual(expectedError);

      result = check('0');
      expect(result.errors).toEqual(expectedError);

      result = check('0.1');
      expect(result.errors).toEqual({});

      result = check('1');
      expect(result.errors).toEqual({});

      result = check('100');
      expect(result.errors).toEqual({});

      result = check('1001');
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('MACHINE_MAX_FEED_WIDTH', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '';

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'MACHINE_MAX_FEED_WIDTH': {
            'types': {
              'NOT_A_NUMBER': {
                'label': 'MACHINE_MAX_FEED_WIDTH',
                'name': 'config.MACHINE_MAX_FEED_WIDTH',
                'type': 'NOT_A_NUMBER',
              },
            },
          },
        },
      });
    });

    it('should be between 0.1 and 1000', () => {
      function check(value: string) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_MAX_FEED_WIDTH = value;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'MACHINE_MAX_FEED_WIDTH': {
            'types': {
              'NUMBER_BETWEEN': {
                'label': 'MACHINE_MAX_FEED_WIDTH',
                'name': 'config.MACHINE_MAX_FEED_WIDTH',
                'type': 'NUMBER_BETWEEN',
                'min': 0.1,
                'max': 1000,
              },
            },
          },
        },
      };

      let result = check('-1');
      expect(result.errors).toEqual(expectedError);

      result = check('0');
      expect(result.errors).toEqual(expectedError);

      result = check('0.1');
      expect(result.errors).toEqual({});

      result = check('1');
      expect(result.errors).toEqual({});

      result = check('100');
      expect(result.errors).toEqual({});

      result = check('1001');
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('META_LOADER.NUMBER_OF_DRAWERS', () => {
    it('should be required', () => {
      const cobotConfig = configMetaLoaderWithStaticGrid();
      cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS = '';

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'META_LOADER': {
            'NUMBER_OF_DRAWERS': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'NUMBER_OF_DRAWERS',
                  'name': 'config.META_LOADER.NUMBER_OF_DRAWERS',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        },
      });
    });

    it('should be between 1 and 24', () => {
      function check(value: string) {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.META_LOADER.NUMBER_OF_DRAWERS = value;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'META_LOADER': {
            'NUMBER_OF_DRAWERS': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'NUMBER_OF_DRAWERS',
                  'max': 24,
                  'min': 1,
                  'name': 'config.META_LOADER.NUMBER_OF_DRAWERS',
                  'type': 'NUMBER_BETWEEN',
                },
              },
            },
          },
        },
      };

      let result = check('0');
      expect(result.errors).toEqual(expectedError);

      result = check('1');
      expect(result.errors).toEqual({});

      result = check('2');
      expect(result.errors).toEqual({});

      result = check('24');
      expect(result.errors).toEqual({});

      result = check('25');
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('PRO_FEEDER.NUMBER_OF_DRAWERS', () => {
    it('should be required', () => {
      const cobotConfig = configProFeederWithPinnedGrid();
      cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS = '';

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PRO_FEEDER': {
            'NUMBER_OF_DRAWERS': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'NUMBER_OF_DRAWERS',
                  'name': 'config.PRO_FEEDER.NUMBER_OF_DRAWERS',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        },
      });
    });

    it('should be between 1 and 24', () => {
      function check(value: string) {
        const cobotConfig = configProFeederWithPinnedGrid();
        cobotConfig.config.PRO_FEEDER.NUMBER_OF_DRAWERS = value;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PRO_FEEDER': {
            'NUMBER_OF_DRAWERS': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'NUMBER_OF_DRAWERS',
                  'max': 24,
                  'min': 1,
                  'name': 'config.PRO_FEEDER.NUMBER_OF_DRAWERS',
                  'type': 'NUMBER_BETWEEN',
                },
              },
            },
          },
        },
      };

      let result = check('0');
      expect(result.errors).toEqual(expectedError);

      result = check('1');
      expect(result.errors).toEqual({});

      result = check('2');
      expect(result.errors).toEqual({});

      result = check('24');
      expect(result.errors).toEqual({});

      result = check('25');
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE', () => {
    it('should be an array of valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE = [
        { value: [] as unknown as SixNumArray },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should be an array between 0 and 5 items', () => {
      function check(positions: Positions[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE =
          positions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE': {
            'types': {
              'ARRAY_SIZE': {
                'label': 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PLACE',
                'type': 'ARRAY_SIZE',
                'max': 5,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual({});

      result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK', () => {
    it('should be an array of valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK = [
        { value: [] as unknown as SixNumArray },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
                'name': 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should be an array between 0 and 5 items', () => {
      function check(positions: Positions[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK =
          positions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK': {
            'types': {
              'ARRAY_SIZE': {
                'label': 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
                'name': 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_MACHINE_PICK',
                'type': 'ARRAY_SIZE',
                'max': 5,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual({});

      result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('AIRPURGE_BEFORE_INFEED_POSITION', () => {
    it('should be a valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.AIRPURGE_BEFORE_INFEED_POSITION =
        [] as unknown as SixNumArray;

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'AIRPURGE_BEFORE_INFEED_POSITION': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'AIRPURGE_BEFORE_INFEED_POSITION',
                'name': 'config.AIRPURGE_BEFORE_INFEED_POSITION',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });
  });

  // describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW', () => {
  //   it('should be an array of valid cobot position', () => {
  //     const cobotConfig = configEasyloaderWithStaticGrid();
  //     cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW =
  //       [{ value: [] as unknown as SixNumArray }];

  //     const result = cobotConfigValidator(cobotConfig);

  //     expect(result.errors).toEqual({
  //       'config': {
  //         'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW': {
  //           'types': {
  //             'INVALID_COBOT_POSITION': {
  //               'label':
  //                 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW',
  //               'name':
  //                 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW',
  //               'type': 'INVALID_COBOT_POSITION',
  //             },
  //           },
  //         },
  //       },
  //     });
  //   });

  //   it('should be an array between 0 and 5 items', () => {
  //     function check(positions: Positions[]) {
  //       const cobotConfig = configEasyloaderWithStaticGrid();
  //       cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW =
  //         positions;

  //       return cobotConfigValidator(cobotConfig);
  //     }

  //     const expectedError = {
  //       'config': {
  //         'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW': {
  //           'types': {
  //             'ARRAY_SIZE': {
  //               'label':
  //                 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW',
  //               'name':
  //                 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_MAIN_CLAW',
  //               'type': 'ARRAY_SIZE',
  //               'max': 5,
  //               'min': 0,
  //             },
  //           },
  //         },
  //       },
  //     };

  //     let result = check([]);
  //     expect(result.errors).toEqual({});

  //     result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual(expectedError);
  //   });
  // });  

  //   describe('AIRPURGE_AT_MAIN_CLAW', () => {
  //   it('should be a valid cobot position', () => {
  //     const cobotConfig = configEasyloaderWithStaticGrid();
  //     cobotConfig.config.AIRPURGE_AT_MAIN_CLAW =
  //       [] as unknown as SixNumArray;

  //     const result = cobotConfigValidator(cobotConfig);

  //     expect(result.errors).toEqual({
  //       'config': {
  //         'AIRPURGE_AT_MAIN_CLAW': {
  //           'types': {
  //             'INVALID_COBOT_POSITION': {
  //               'label': 'AIRPURGE_AT_MAIN_CLAW',
  //               'name': 'config.AIRPURGE_AT_MAIN_CLAW',
  //               'type': 'INVALID_COBOT_POSITION',
  //             },
  //           },
  //         },
  //       },
  //     });
  //   });
  // });


  
  // describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW', () => {
  //   it('should be an array of valid cobot position', () => {
  //     const cobotConfig = configEasyloaderWithStaticGrid();
  //     cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW =
  //       [{ value: [] as unknown as SixNumArray }];

  //     const result = cobotConfigValidator(cobotConfig);

  //     expect(result.errors).toEqual({
  //       'config': {
  //         'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW': {
  //           'types': {
  //             'INVALID_COBOT_POSITION': {
  //               'label':
  //                 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW',
  //               'name':
  //                 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW',
  //               'type': 'INVALID_COBOT_POSITION',
  //             },
  //           },
  //         },
  //       },
  //     });
  //   });

  //   it('should be an array between 0 and 5 items', () => {
  //     function check(positions: Positions[]) {
  //       const cobotConfig = configEasyloaderWithStaticGrid();
  //       cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW =
  //         positions;

  //       return cobotConfigValidator(cobotConfig);
  //     }

  //     const expectedError = {
  //       'config': {
  //         'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW': {
  //           'types': {
  //             'ARRAY_SIZE': {
  //               'label':
  //                 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW',
  //               'name':
  //                 'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_SUB_CLAW',
  //               'type': 'ARRAY_SIZE',
  //               'max': 5,
  //               'min': 0,
  //             },
  //           },
  //         },
  //       },
  //     };

  //     let result = check([]);
  //     expect(result.errors).toEqual({});

  //     result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual({});

  //     result = check([
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //       { value: [1, 1, 1, 1, 1, 1] },
  //     ]);
  //     expect(result.errors).toEqual(expectedError);
  //   });
  // });

  //   describe('AIRPURGE_AT_SUB_CLAW', () => {
  //   it('should be a valid cobot position', () => {
  //     const cobotConfig = configEasyloaderWithStaticGrid();
  //     cobotConfig.config.AIRPURGE_AT_SUB_CLAW =
  //       [] as unknown as SixNumArray;

  //     const result = cobotConfigValidator(cobotConfig);

  //     expect(result.errors).toEqual({
  //       'config': {
  //         'AIRPURGE_AT_SUB_CLAW': {
  //           'types': {
  //             'INVALID_COBOT_POSITION': {
  //               'label': 'AIRPURGE_AT_SUB_CLAW',
  //               'name': 'config.AIRPURGE_AT_SUB_CLAW',
  //               'type': 'INVALID_COBOT_POSITION',
  //             },
  //           },
  //         },
  //       },
  //     });
  //   });
  // });


  describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED', () => {
    it('should be an array of valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED =
        [{ value: [] as unknown as SixNumArray }];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label':
                  'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should be an array between 0 and 5 items', () => {
      function check(positions: Positions[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED =
          positions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED': {
            'types': {
              'ARRAY_SIZE': {
                'label':
                  'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_INFEED',
                'type': 'ARRAY_SIZE',
                'max': 5,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual({});

      result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('AIRPURGE_BEFORE_OUTFEED_POSITION', () => {
    it('should be a valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.AIRPURGE_BEFORE_OUTFEED_POSITION =
        [] as unknown as SixNumArray;

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'AIRPURGE_BEFORE_OUTFEED_POSITION': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'AIRPURGE_BEFORE_OUTFEED_POSITION',
                'name': 'config.AIRPURGE_BEFORE_OUTFEED_POSITION',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });
  });

  describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED', () => {
    it('should be an array of valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED =
        [{ value: [] as unknown as SixNumArray }];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label':
                  'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should be an array between 0 and 5 items', () => {
      function check(positions: Positions[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED =
          positions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED': {
            'types': {
              'ARRAY_SIZE': {
                'label':
                  'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_BEFORE_OUTFEED',
                'type': 'ARRAY_SIZE',
                'max': 5,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual({});

      result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('AIRPURGE_AFTER_OUTFEED_POSITION', () => {
    it('should be a valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.AIRPURGE_AFTER_OUTFEED_POSITION =
        [] as unknown as SixNumArray;

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'AIRPURGE_AFTER_OUTFEED_POSITION': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'AIRPURGE_AFTER_OUTFEED_POSITION',
                'name': 'config.AIRPURGE_AFTER_OUTFEED_POSITION',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });
  });

  describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED', () => {
    it('should be an array of valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED =
        [{ value: [] as unknown as SixNumArray }];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label':
                  'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should be an array between 0 and 5 items', () => {
      function check(positions: Positions[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED =
          positions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED': {
            'types': {
              'ARRAY_SIZE': {
                'label':
                  'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_AIRPURGE_AFTER_OUTFEED',
                'type': 'ARRAY_SIZE',
                'max': 5,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual({});

      result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT', () => {
    it('should be an array of valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT = [
        { value: [] as unknown as SixNumArray },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should be an array between 0 and 5 items', () => {
      function check(positions: Positions[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT =
          positions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT': {
            'types': {
              'ARRAY_SIZE': {
                'label': 'PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
                'name':
                  'config.PATH_FROM_OUTSIDE_MACHINE_DOOR_TO_CLEAN_PRODUCT',
                'type': 'ARRAY_SIZE',
                'max': 5,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual({});

      result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('CLEAN_PRODUCT_POSITION', () => {
    it('should be a valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.CLEAN_PRODUCT_POSITION = [] as unknown as SixNumArray;

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'CLEAN_PRODUCT_POSITION': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'CLEAN_PRODUCT_POSITION',
                'name': 'config.CLEAN_PRODUCT_POSITION',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });
  });

  describe('MACHINE_PICK_POSITIONS', () => {
    describe('the positions', () => {
      it('should be an array of valid cobot position', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_PICK_POSITIONS = [
          { name: 'Main', position: [] as unknown as SixNumArray },
        ];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PICK_POSITIONS': {
              '0': {
                'position': {
                  'types': {
                    'INVALID_COBOT_POSITION': {
                      'label': 'MACHINE_PICK_POSITIONS',
                      'name': 'config.MACHINE_PICK_POSITIONS.0.position',
                      'type': 'INVALID_COBOT_POSITION',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should be an array between 1 and 10 items', () => {
        function check(machinePositions: MachinePosition[]) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PICK_POSITIONS = machinePositions;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'MACHINE_PICK_POSITIONS': {
              'types': {
                'ARRAY_SIZE': {
                  'label': 'MACHINE_PICK_POSITIONS',
                  'name': 'config.MACHINE_PICK_POSITIONS',
                  'type': 'ARRAY_SIZE',
                  'max': 10,
                  'min': 1,
                },
              },
            },
          },
        };

        let result = check([]);
        expect(result.errors).toEqual(expectedError);

        result = check([{ name: 'Main', position: [1, 1, 1, 1, 1, 1] }]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual(expectedError);
      });
    });

    describe('the names', () => {
      describe('MACHINE_TYPE is MILL', () => {
        it('should be required', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;
          cobotConfig.config.MACHINE_PICK_POSITIONS = [
            { name: '', position: [1, 2, 3, 4, 5, 6] },
          ];

          const result = cobotConfigValidator(cobotConfig);

          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PICK_POSITIONS': {
                '0': {
                  'name': {
                    'types': {
                      'REQUIRED': {
                        'label': 'NAME',
                        'name': 'config.MACHINE_PICK_POSITIONS.0.name',
                        'type': 'REQUIRED',
                      },
                    },
                  },
                },
              },
            },
          });
        });

        it('should allow up to 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;
          cobotConfig.config.MACHINE_PICK_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfa',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({});
        });

        it('should not be longer than 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;
          cobotConfig.config.MACHINE_PICK_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfas',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PICK_POSITIONS': {
                '0': {
                  'name': {
                    'types': {
                      'MAX_LENGTH': {
                        'label': 'NAME',
                        'name': 'config.MACHINE_PICK_POSITIONS.0.name',
                        'type': 'MAX_LENGTH',
                        'max': 100,
                      },
                    },
                  },
                },
              },
            },
          });
        });
      });

      describe('MACHINE_TYPE is LATHE', () => {
        it('should not be required', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PICK_POSITIONS = [
            { name: '', position: [1, 2, 3, 4, 5, 6] },
          ];

          const result = cobotConfigValidator(cobotConfig);

          expect(result.errors).toEqual({});
        });

        it('should allow up to 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PICK_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfa',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({});
        });

        it('should not be longer than 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PICK_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfas',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PICK_POSITIONS': {
                '0': {
                  'name': {
                    'types': {
                      'MAX_LENGTH': {
                        'label': 'NAME',
                        'name': 'config.MACHINE_PICK_POSITIONS.0.name',
                        'type': 'MAX_LENGTH',
                        'max': 100,
                      },
                    },
                  },
                },
              },
            },
          });
        });
      });
    });
  });

  describe('MACHINE_PLACE_POSITIONS', () => {
    describe('the positions', () => {
      it('should be an array of valid cobot position', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_PLACE_POSITIONS = [
          { name: 'Main', position: [] as unknown as SixNumArray },
        ];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PLACE_POSITIONS': {
              '0': {
                'position': {
                  'types': {
                    'INVALID_COBOT_POSITION': {
                      'label': 'MACHINE_PLACE_POSITIONS',
                      'name': 'config.MACHINE_PLACE_POSITIONS.0.position',
                      'type': 'INVALID_COBOT_POSITION',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should be an array between 1 and 10 items', () => {
        function check(machinePositions: MachinePosition[]) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PLACE_POSITIONS = machinePositions;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'MACHINE_PLACE_POSITIONS': {
              'types': {
                'ARRAY_SIZE': {
                  'label': 'MACHINE_PLACE_POSITIONS',
                  'name': 'config.MACHINE_PLACE_POSITIONS',
                  'type': 'ARRAY_SIZE',
                  'max': 10,
                  'min': 1,
                },
              },
            },
          },
        };

        let result = check([]);
        expect(result.errors).toEqual(expectedError);

        result = check([{ name: 'Main', position: [1, 1, 1, 1, 1, 1] }]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
          { name: 'Main', position: [1, 1, 1, 1, 1, 1] },
        ]);
        expect(result.errors).toEqual(expectedError);
      });
    });

    describe('the names', () => {
      describe('MACHINE_TYPE is MILL', () => {
        it('should be required', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;
          cobotConfig.config.MACHINE_PLACE_POSITIONS = [
            { name: '', position: [1, 2, 3, 4, 5, 6] },
          ];

          const result = cobotConfigValidator(cobotConfig);

          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PLACE_POSITIONS': {
                '0': {
                  'name': {
                    'types': {
                      'REQUIRED': {
                        'label': 'NAME',
                        'name': 'config.MACHINE_PLACE_POSITIONS.0.name',
                        'type': 'REQUIRED',
                      },
                    },
                  },
                },
              },
            },
          });
        });

        it('should allow up to 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;
          cobotConfig.config.MACHINE_PLACE_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfa',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({});
        });

        it('should not be longer than 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;
          cobotConfig.config.MACHINE_PLACE_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfas',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PLACE_POSITIONS': {
                '0': {
                  'name': {
                    'types': {
                      'MAX_LENGTH': {
                        'label': 'NAME',
                        'name': 'config.MACHINE_PLACE_POSITIONS.0.name',
                        'type': 'MAX_LENGTH',
                        'max': 100,
                      },
                    },
                  },
                },
              },
            },
          });
        });
      });

      describe('MACHINE_TYPE is LATHE', () => {
        it('should not be required', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PLACE_POSITIONS = [
            { name: '', position: [1, 2, 3, 4, 5, 6] },
          ];

          const result = cobotConfigValidator(cobotConfig);

          expect(result.errors).toEqual({});
        });

        it('should allow up to 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PLACE_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfa',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({});
        });

        it('should not be longer than 100 characters', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.MACHINE_PLACE_POSITIONS = [
            {
              name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfas',
              position: [1, 2, 3, 4, 5, 6],
            },
          ];

          const result = cobotConfigValidator(cobotConfig);
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PLACE_POSITIONS': {
                '0': {
                  'name': {
                    'types': {
                      'MAX_LENGTH': {
                        'label': 'NAME',
                        'name': 'config.MACHINE_PLACE_POSITIONS.0.name',
                        'type': 'MAX_LENGTH',
                        'max': 100,
                      },
                    },
                  },
                },
              },
            },
          });
        });
      });
    });
  });

  describe('GRIPPER1_AT_DRAWER_POSITION', () => {
    it('should be a valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.GRIPPER1_AT_DRAWER_POSITION =
        [] as unknown as SixNumArray;

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'GRIPPER1_AT_DRAWER_POSITION': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'GRIPPER1_AT_DRAWER_POSITION',
                'name': 'config.GRIPPER1_AT_DRAWER_POSITION',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });
  });

  describe('GRIPPER2_AT_DRAWER_POSITION', () => {
    it('should be a valid cobot position when there is a second gripper', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.GRIPPER2_AT_DRAWER_POSITION =
        [] as unknown as SixNumArray;

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'GRIPPER2_AT_DRAWER_POSITION': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'GRIPPER2_AT_DRAWER_POSITION',
                'name': 'config.GRIPPER2_AT_DRAWER_POSITION',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should consider every value valid when there is no second gripper', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.HAS_SECOND_GRIPPER = false;
      cobotConfig.config.GRIPPER2_AT_DRAWER_POSITION =
        [] as unknown as SixNumArray;

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({});
    });
  });

  describe('PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR', () => {
    it('should be an array of valid cobot position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR = [
        { value: [] as unknown as SixNumArray },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR': {
            'types': {
              'INVALID_COBOT_POSITION': {
                'label': 'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                'name': 'config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                'type': 'INVALID_COBOT_POSITION',
              },
            },
          },
        },
      });
    });

    it('should be an array between 1 and 10 items', () => {
      function check(positions: Positions[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR = positions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR': {
            'types': {
              'ARRAY_SIZE': {
                'label': 'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                'name': 'config.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                'type': 'ARRAY_SIZE',
                'max': 10,
                'min': 1,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual(expectedError);

      result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual({});

      result = check([
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
        { value: [1, 1, 1, 1, 1, 1] },
      ]);
      expect(result.errors).toEqual(expectedError);
    });
  });

  describe('EASY_LOADER.SECOND_DRAWER', () => {
    describe('STATIC_GRID_INDEX', () => {
      it('should with easy loader, static grid, and second drawer be a required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'EASY_LOADER': {
              'SECOND_DRAWER': {
                'STATIC_GRID_INDEX': {
                  'types': {
                    'REQUIRED': {
                      'label': 'STATIC_GRID_CONFIGURATION',
                      'name':
                        'config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX',
                      'type': 'REQUIRED',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should with easy loader, static grid, and second drawer be a valid static grid index', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX =
            value;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'EASY_LOADER': {
              'SECOND_DRAWER': {
                'STATIC_GRID_INDEX': {
                  'types': {
                    'UNDEFINED_STATIC_GRID_CONFIGURATION': {
                      'label': 'STATIC_GRID_CONFIGURATION',
                      'name':
                        'config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX',
                      'type': 'UNDEFINED_STATIC_GRID_CONFIGURATION',
                    },
                  },
                },
              },
            },
          },
        };

        let result = check('-1');
        expect(result.errors).toEqual(expectedError);

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('2');
        expect(result.errors).toEqual(expectedError);
      });

      it('should not be required when the feeder is not an easy loader', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when there is no second drawer', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when easy loader has a pinned grid', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX = '';
      });
    });

    describe('GRIPPER1_AT_DRAWER_POSITION', () => {
      it('should with easy loader, static grid, and second drawer be a valid cobot position', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'EASY_LOADER': {
              'SECOND_DRAWER': {
                'GRIPPER1_AT_DRAWER_POSITION': {
                  'types': {
                    'INVALID_COBOT_POSITION': {
                      'label': 'GRIPPER1_AT_DRAWER_POSITION',
                      'name':
                        'config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION',
                      'type': 'INVALID_COBOT_POSITION',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should not be required when the feeder is not an easy loader', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when there is no second drawer', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when easy loader has a pinned grid', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER1_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(
          result.errors.config?.EASY_LOADER?.SECOND_DRAWER
            ?.GRIPPER1_AT_DRAWER_POSITION,
        ).toBe(undefined);
      });
    });

    describe('GRIPPER2_AT_DRAWER_POSITION', () => {
      it('should with easy loader, static grid, second gripper,  and second drawer be a valid cobot position', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'EASY_LOADER': {
              'SECOND_DRAWER': {
                'GRIPPER2_AT_DRAWER_POSITION': {
                  'types': {
                    'INVALID_COBOT_POSITION': {
                      'label': 'GRIPPER2_AT_DRAWER_POSITION',
                      'name':
                        'config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION',
                      'type': 'INVALID_COBOT_POSITION',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should not be required when the feeder is not an easy loader', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when there is no second drawer', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when easy loader has a pinned grid', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(
          result.errors.config?.EASY_LOADER?.SECOND_DRAWER
            ?.GRIPPER2_AT_DRAWER_POSITION,
        ).toBe(undefined);
      });

      it('should not be required when there is no second gripper', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.HAS_SECOND_GRIPPER = false;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.GRIPPER2_AT_DRAWER_POSITION =
          [] as unknown as SixNumArray;

        const result = cobotConfigValidator(cobotConfig);

        expect(
          result.errors.config?.EASY_LOADER?.SECOND_DRAWER
            ?.GRIPPER2_AT_DRAWER_POSITION,
        ).toBe(undefined);
      });
    });

    describe('PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR', () => {
      describe('with easy loader, static grid, and second drawer', () => {
        it('should be an array of valid cobot position', () => {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR =
            [{ value: [] as unknown as SixNumArray }];

          const result = cobotConfigValidator(cobotConfig);

          expect(result.errors).toEqual({
            'config': {
              'EASY_LOADER': {
                'SECOND_DRAWER': {
                  'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR': {
                    'types': {
                      'INVALID_COBOT_POSITION': {
                        'label': 'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                        'name':
                          'config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                        'type': 'INVALID_COBOT_POSITION',
                      },
                    },
                  },
                },
              },
            },
          });
        });

        it('should be an array between 1 and 10 items', () => {
          function check(positions: Positions[]) {
            const cobotConfig = configEasyloaderWithStaticGrid();
            cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
            cobotConfig.config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR =
              positions;

            return cobotConfigValidator(cobotConfig);
          }

          const expectedError = {
            'config': {
              'EASY_LOADER': {
                'SECOND_DRAWER': {
                  'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR': {
                    'types': {
                      'ARRAY_SIZE': {
                        'label': 'PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                        'name':
                          'config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR',
                        'type': 'ARRAY_SIZE',
                        'max': 10,
                        'min': 1,
                      },
                    },
                  },
                },
              },
            },
          };

          let result = check([]);
          expect(result.errors).toEqual(expectedError);

          result = check([{ value: [1, 1, 1, 1, 1, 1] }]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual({});

          result = check([
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
            { value: [1, 1, 1, 1, 1, 1] },
          ]);
          expect(result.errors).toEqual(expectedError);
        });
      });

      it('should not be required when the feeder is not an easy loader', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR =
          [{ value: [] as unknown as SixNumArray }];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when there is no second drawer', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR =
          [{ value: [] as unknown as SixNumArray }];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not be required when easy loader has a pinned grid', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR =
          [{ value: [] as unknown as SixNumArray }];

        const result = cobotConfigValidator(cobotConfig);

        expect(
          result.errors.config?.EASY_LOADER?.SECOND_DRAWER
            ?.PATH_FROM_DRAWER_TO_OUTSIDE_MACHINE_DOOR,
        ).toBe(undefined);
      });
    });
  });

  describe('DO_GRIPPER1_OPEN', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_GRIPPER1_OPEN = { type: 'controller', value: -1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_GRIPPER1_OPEN': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DO_GRIPPER1_OPEN',
                'name': 'config.DO_GRIPPER1_OPEN',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_GRIPPER1_OPEN = { type: 'controller', value: 42 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_GRIPPER1_OPEN': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DO_GRIPPER1_OPEN',
                'name': 'config.DO_GRIPPER1_OPEN',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_GRIPPER1_OPEN = { type: 'controller', value: 2 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DO_GRIPPER1_OPEN).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DO_GRIPPER1_OPEN',
            'name': 'config.DO_GRIPPER1_OPEN',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DO_GRIPPER1_CLOSE', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_GRIPPER1_CLOSE = { type: 'controller', value: -1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_GRIPPER1_CLOSE': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DO_GRIPPER1_CLOSE',
                'name': 'config.DO_GRIPPER1_CLOSE',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_GRIPPER1_CLOSE = { type: 'controller', value: 42 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_GRIPPER1_CLOSE': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DO_GRIPPER1_CLOSE',
                'name': 'config.DO_GRIPPER1_CLOSE',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_GRIPPER1_CLOSE = { type: 'controller', value: 1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DO_GRIPPER1_CLOSE).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DO_GRIPPER1_CLOSE',
            'name': 'config.DO_GRIPPER1_CLOSE',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DO_GRIPPER2_OPEN', () => {
    describe('when config HAS_SECOND_GRIPPER is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_GRIPPER2_OPEN = { type: 'controller', value: -1 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_GRIPPER2_OPEN': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DO_GRIPPER2_OPEN',
                  'name': 'config.DO_GRIPPER2_OPEN',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_GRIPPER2_OPEN = { type: 'controller', value: 42 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_GRIPPER2_OPEN': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DO_GRIPPER2_OPEN',
                  'name': 'config.DO_GRIPPER2_OPEN',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_GRIPPER2_OPEN = { type: 'controller', value: 2 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_GRIPPER2_OPEN).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DO_GRIPPER2_OPEN',
              'name': 'config.DO_GRIPPER2_OPEN',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config HAS_SECOND_GRIPPER is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DO_GRIPPER2_OPEN = { type: 'controller', value: -1 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DO_GRIPPER2_OPEN = { type: 'controller', value: 42 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DO_GRIPPER2_OPEN = { type: 'controller', value: 2 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_GRIPPER2_OPEN).toBe(undefined);
      });
    });
  });

  describe('DO_GRIPPER2_CLOSE', () => {
    describe('when config HAS_SECOND_GRIPPER is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_GRIPPER2_CLOSE = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_GRIPPER2_CLOSE': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DO_GRIPPER2_CLOSE',
                  'name': 'config.DO_GRIPPER2_CLOSE',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_GRIPPER2_CLOSE = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_GRIPPER2_CLOSE': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DO_GRIPPER2_CLOSE',
                  'name': 'config.DO_GRIPPER2_CLOSE',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_GRIPPER2_CLOSE = { type: 'controller', value: 2 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_GRIPPER2_CLOSE).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DO_GRIPPER2_CLOSE',
              'name': 'config.DO_GRIPPER2_CLOSE',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config HAS_SECOND_GRIPPER is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DO_GRIPPER2_CLOSE = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DO_GRIPPER2_CLOSE = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DO_GRIPPER2_CLOSE = { type: 'controller', value: 2 };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_GRIPPER2_CLOSE).toBe(undefined);
      });
    });
  });

  describe('DO_AIRPURGE', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_AIRPURGE = { type: 'controller', value: -1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_AIRPURGE': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DO_AIRPURGE',
                'name': 'config.DO_AIRPURGE',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_AIRPURGE = { type: 'controller', value: 42 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_AIRPURGE': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DO_AIRPURGE',
                'name': 'config.DO_AIRPURGE',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_AIRPURGE = { type: 'controller', value: 2 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DO_AIRPURGE).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DO_AIRPURGE',
            'name': 'config.DO_AIRPURGE',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DO_MAIN_SPINDLE_OPEN', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_MAIN_SPINDLE_OPEN = {
        type: 'controller',
        value: -1,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_MAIN_SPINDLE_OPEN': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DO_MAIN_SPINDLE_OPEN',
                'name': 'config.DO_MAIN_SPINDLE_OPEN',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_MAIN_SPINDLE_OPEN = {
        type: 'controller',
        value: 42,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_MAIN_SPINDLE_OPEN': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DO_MAIN_SPINDLE_OPEN',
                'name': 'config.DO_MAIN_SPINDLE_OPEN',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_MAIN_SPINDLE_OPEN = {
        type: 'controller',
        value: 2,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DO_MAIN_SPINDLE_OPEN).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DO_MAIN_SPINDLE_OPEN',
            'name': 'config.DO_MAIN_SPINDLE_OPEN',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DO_MAIN_SPINDLE_CLOSE', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_MAIN_SPINDLE_CLOSE = {
        type: 'controller',
        value: -1,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_MAIN_SPINDLE_CLOSE': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DO_MAIN_SPINDLE_CLOSE',
                'name': 'config.DO_MAIN_SPINDLE_CLOSE',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_MAIN_SPINDLE_CLOSE = {
        type: 'controller',
        value: 42,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_MAIN_SPINDLE_CLOSE': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DO_MAIN_SPINDLE_CLOSE',
                'name': 'config.DO_MAIN_SPINDLE_CLOSE',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_MAIN_SPINDLE_CLOSE = {
        type: 'controller',
        value: 2,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DO_MAIN_SPINDLE_CLOSE).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DO_MAIN_SPINDLE_CLOSE',
            'name': 'config.DO_MAIN_SPINDLE_CLOSE',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DO_SUB_SPINDLE_OPEN', () => {
    describe('when config MACHINE_HAS_SUB_SPINDLE is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_SUB_SPINDLE_OPEN = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_SUB_SPINDLE_OPEN': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DO_SUB_SPINDLE_OPEN',
                  'name': 'config.DO_SUB_SPINDLE_OPEN',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_SUB_SPINDLE_OPEN = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_SUB_SPINDLE_OPEN': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DO_SUB_SPINDLE_OPEN',
                  'name': 'config.DO_SUB_SPINDLE_OPEN',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_SUB_SPINDLE_OPEN = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_SUB_SPINDLE_OPEN).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DO_SUB_SPINDLE_OPEN',
              'name': 'config.DO_SUB_SPINDLE_OPEN',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config MACHINE_HAS_SUB_SPINDLE is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DO_SUB_SPINDLE_OPEN = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DO_SUB_SPINDLE_OPEN = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DO_SUB_SPINDLE_OPEN = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_SUB_SPINDLE_OPEN).toBe(undefined);
      });
    });
  });

  describe('DO_SUB_SPINDLE_CLOSE', () => {
    describe('when config MACHINE_HAS_SUB_SPINDLE is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_SUB_SPINDLE_CLOSE = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_SUB_SPINDLE_CLOSE': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DO_SUB_SPINDLE_CLOSE',
                  'name': 'config.DO_SUB_SPINDLE_CLOSE',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_SUB_SPINDLE_CLOSE = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_SUB_SPINDLE_CLOSE': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DO_SUB_SPINDLE_CLOSE',
                  'name': 'config.DO_SUB_SPINDLE_CLOSE',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_SUB_SPINDLE_CLOSE = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_SUB_SPINDLE_CLOSE).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DO_SUB_SPINDLE_CLOSE',
              'name': 'config.DO_SUB_SPINDLE_CLOSE',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config MACHINE_HAS_SUB_SPINDLE is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DO_SUB_SPINDLE_CLOSE = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DO_SUB_SPINDLE_CLOSE = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DO_SUB_SPINDLE_CLOSE = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_SUB_SPINDLE_CLOSE).toBe(undefined);
      });
    });
  });

  describe('DO_REQUEST_NEW_DRAWER', () => {
    describe('when drawer system is used', () => {
      it('should be required', () => {
        const cobotConfig = configProFeederWithPinnedGrid();
        cobotConfig.config.DO_REQUEST_NEW_DRAWER = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_REQUEST_NEW_DRAWER': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DO_REQUEST_NEW_DRAWER',
                  'name': 'config.DO_REQUEST_NEW_DRAWER',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.DO_REQUEST_NEW_DRAWER = {
          type: 'flange',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DO_REQUEST_NEW_DRAWER': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DO_REQUEST_NEW_DRAWER',
                  'name': 'config.DO_REQUEST_NEW_DRAWER',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'flange',
                  'min': 1,
                  'max': 6,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.DO_REQUEST_NEW_DRAWER = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_REQUEST_NEW_DRAWER).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DO_REQUEST_NEW_DRAWER',
              'name': 'config.DO_REQUEST_NEW_DRAWER',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when no drawer system is used', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.DO_REQUEST_NEW_DRAWER = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_REQUEST_NEW_DRAWER = {
          type: 'flange',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DO_REQUEST_NEW_DRAWER = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DO_REQUEST_NEW_DRAWER).toBe(undefined);
      });
    });
  });

  describe('DO_RUN_MACHINE', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_RUN_MACHINE = { type: 'controller', value: -1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_RUN_MACHINE': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DO_RUN_MACHINE',
                'name': 'config.DO_RUN_MACHINE',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_RUN_MACHINE = { type: 'controller', value: 42 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_RUN_MACHINE': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DO_RUN_MACHINE',
                'name': 'config.DO_RUN_MACHINE',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_RUN_MACHINE = { type: 'controller', value: 2 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DO_RUN_MACHINE).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DO_RUN_MACHINE',
            'name': 'config.DO_RUN_MACHINE',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DO_SEND_ALERT', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_SEND_ALERT = { type: 'controller', value: -1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_SEND_ALERT': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DO_SEND_ALERT',
                'name': 'config.DO_SEND_ALERT',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_SEND_ALERT = { type: 'controller', value: 42 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DO_SEND_ALERT': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DO_SEND_ALERT',
                'name': 'config.DO_SEND_ALERT',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DO_SEND_ALERT = { type: 'controller', value: 2 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DO_SEND_ALERT).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DO_SEND_ALERT',
            'name': 'config.DO_SEND_ALERT',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DI_GRIPPER1_IS_OPENED', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_GRIPPER1_IS_OPENED = {
        type: 'controller',
        value: -1,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_GRIPPER1_IS_OPENED': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DI_GRIPPER1_IS_OPENED',
                'name': 'config.DI_GRIPPER1_IS_OPENED',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_GRIPPER1_IS_OPENED = {
        type: 'controller',
        value: 42,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_GRIPPER1_IS_OPENED': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DI_GRIPPER1_IS_OPENED',
                'name': 'config.DI_GRIPPER1_IS_OPENED',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_GRIPPER1_IS_OPENED = {
        type: 'controller',
        value: 2,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DI_GRIPPER1_IS_OPENED).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DI_GRIPPER1_IS_OPENED',
            'name': 'config.DI_GRIPPER1_IS_OPENED',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DI_GRIPPER1_IS_CLOSED', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_GRIPPER1_IS_CLOSED = {
        type: 'controller',
        value: -1,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_GRIPPER1_IS_CLOSED': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DI_GRIPPER1_IS_CLOSED',
                'name': 'config.DI_GRIPPER1_IS_CLOSED',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_GRIPPER1_IS_CLOSED = {
        type: 'controller',
        value: 42,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_GRIPPER1_IS_CLOSED': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DI_GRIPPER1_IS_CLOSED',
                'name': 'config.DI_GRIPPER1_IS_CLOSED',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_GRIPPER1_IS_CLOSED = {
        type: 'controller',
        value: 8,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DI_GRIPPER1_IS_CLOSED).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DI_GRIPPER1_IS_CLOSED',
            'name': 'config.DI_GRIPPER1_IS_CLOSED',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DI_GRIPPER2_IS_OPENED', () => {
    describe('when config HAS_SECOND_GRIPPER is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_GRIPPER2_IS_OPENED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_GRIPPER2_IS_OPENED': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DI_GRIPPER2_IS_OPENED',
                  'name': 'config.DI_GRIPPER2_IS_OPENED',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_GRIPPER2_IS_OPENED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_GRIPPER2_IS_OPENED': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DI_GRIPPER2_IS_OPENED',
                  'name': 'config.DI_GRIPPER2_IS_OPENED',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_GRIPPER2_IS_OPENED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_GRIPPER2_IS_OPENED).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DI_GRIPPER2_IS_OPENED',
              'name': 'config.DI_GRIPPER2_IS_OPENED',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config HAS_SECOND_GRIPPER is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DI_GRIPPER2_IS_OPENED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DI_GRIPPER2_IS_OPENED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DI_GRIPPER2_IS_OPENED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_GRIPPER2_IS_OPENED).toBe(undefined);
      });
    });
  });

  describe('DI_GRIPPER2_IS_CLOSED', () => {
    describe('when config HAS_SECOND_GRIPPER is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_GRIPPER2_IS_CLOSED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_GRIPPER2_IS_CLOSED': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DI_GRIPPER2_IS_CLOSED',
                  'name': 'config.DI_GRIPPER2_IS_CLOSED',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_GRIPPER2_IS_CLOSED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_GRIPPER2_IS_CLOSED': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DI_GRIPPER2_IS_CLOSED',
                  'name': 'config.DI_GRIPPER2_IS_CLOSED',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_GRIPPER2_IS_CLOSED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_GRIPPER2_IS_CLOSED).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DI_GRIPPER2_IS_CLOSED',
              'name': 'config.DI_GRIPPER2_IS_CLOSED',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config HAS_SECOND_GRIPPER is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DI_GRIPPER2_IS_CLOSED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DI_GRIPPER2_IS_CLOSED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.HAS_SECOND_GRIPPER = false;

        cobotConfig.config.DI_GRIPPER2_IS_CLOSED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_GRIPPER2_IS_CLOSED).toBe(undefined);
      });
    });
  });

  describe('DI_DOOR_IS_OPENED', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_DOOR_IS_OPENED = { type: 'controller', value: -1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_DOOR_IS_OPENED': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DI_DOOR_IS_OPENED',
                'name': 'config.DI_DOOR_IS_OPENED',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_DOOR_IS_OPENED = { type: 'controller', value: 42 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_DOOR_IS_OPENED': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DI_DOOR_IS_OPENED',
                'name': 'config.DI_DOOR_IS_OPENED',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_DOOR_IS_OPENED = { type: 'controller', value: 2 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DI_DOOR_IS_OPENED).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DI_DOOR_IS_OPENED',
            'name': 'config.DI_DOOR_IS_OPENED',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DI_MAIN_SPINDLE_IS_OPENED', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_MAIN_SPINDLE_IS_OPENED = {
        type: 'controller',
        value: -1,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_MAIN_SPINDLE_IS_OPENED': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DI_MAIN_SPINDLE_IS_OPENED',
                'name': 'config.DI_MAIN_SPINDLE_IS_OPENED',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_MAIN_SPINDLE_IS_OPENED = {
        type: 'controller',
        value: 42,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_MAIN_SPINDLE_IS_OPENED': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DI_MAIN_SPINDLE_IS_OPENED',
                'name': 'config.DI_MAIN_SPINDLE_IS_OPENED',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_MAIN_SPINDLE_IS_OPENED = {
        type: 'controller',
        value: 2,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DI_MAIN_SPINDLE_IS_OPENED).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DI_MAIN_SPINDLE_IS_OPENED',
            'name': 'config.DI_MAIN_SPINDLE_IS_OPENED',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DI_MAIN_SPINDLE_IS_CLOSED', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_MAIN_SPINDLE_IS_CLOSED = {
        type: 'controller',
        value: -1,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_MAIN_SPINDLE_IS_CLOSED': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DI_MAIN_SPINDLE_IS_CLOSED',
                'name': 'config.DI_MAIN_SPINDLE_IS_CLOSED',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_MAIN_SPINDLE_IS_CLOSED = {
        type: 'controller',
        value: 42,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_MAIN_SPINDLE_IS_CLOSED': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DI_MAIN_SPINDLE_IS_CLOSED',
                'name': 'config.DI_MAIN_SPINDLE_IS_CLOSED',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_MAIN_SPINDLE_IS_CLOSED = {
        type: 'controller',
        value: 2,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DI_MAIN_SPINDLE_IS_CLOSED).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DI_MAIN_SPINDLE_IS_CLOSED',
            'name': 'config.DI_MAIN_SPINDLE_IS_CLOSED',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DI_SUB_SPINDLE_IS_OPENED', () => {
    describe('when config MACHINE_HAS_SUB_SPINDLE is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_SUB_SPINDLE_IS_OPENED': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DI_SUB_SPINDLE_IS_OPENED',
                  'name': 'config.DI_SUB_SPINDLE_IS_OPENED',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_SUB_SPINDLE_IS_OPENED': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DI_SUB_SPINDLE_IS_OPENED',
                  'name': 'config.DI_SUB_SPINDLE_IS_OPENED',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_SUB_SPINDLE_IS_OPENED).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DI_SUB_SPINDLE_IS_OPENED',
              'name': 'config.DI_SUB_SPINDLE_IS_OPENED',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config MACHINE_HAS_SUB_SPINDLE is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DI_SUB_SPINDLE_IS_OPENED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_SUB_SPINDLE_IS_OPENED).toBe(undefined);
      });
    });
  });

  describe('DI_SUB_SPINDLE_IS_CLOSED', () => {
    describe('when config MACHINE_HAS_SUB_SPINDLE is true', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_SUB_SPINDLE_IS_CLOSED': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DI_SUB_SPINDLE_IS_CLOSED',
                  'name': 'config.DI_SUB_SPINDLE_IS_CLOSED',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_SUB_SPINDLE_IS_CLOSED': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DI_SUB_SPINDLE_IS_CLOSED',
                  'name': 'config.DI_SUB_SPINDLE_IS_CLOSED',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_SUB_SPINDLE_IS_CLOSED).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DI_SUB_SPINDLE_IS_CLOSED',
              'name': 'config.DI_SUB_SPINDLE_IS_CLOSED',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when config MACHINE_HAS_SUB_SPINDLE is false', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

        cobotConfig.config.DI_SUB_SPINDLE_IS_CLOSED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_SUB_SPINDLE_IS_CLOSED).toBe(undefined);
      });
    });
  });

  describe('DI_NEW_DRAWER_IS_REQUESTED', () => {
    describe('when drawer system is used', () => {
      it('should be required', () => {
        const cobotConfig = configProFeederWithPinnedGrid();
        cobotConfig.config.DI_NEW_DRAWER_IS_REQUESTED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_NEW_DRAWER_IS_REQUESTED': {
              'types': {
                'IO_PORT_NOT_DEFINED': {
                  'label': 'DI_NEW_DRAWER_IS_REQUESTED',
                  'name': 'config.DI_NEW_DRAWER_IS_REQUESTED',
                  'type': 'IO_PORT_NOT_DEFINED',
                },
              },
            },
          },
        });
      });

      it('should be valid port', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.DI_NEW_DRAWER_IS_REQUESTED = {
          type: 'controller',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DI_NEW_DRAWER_IS_REQUESTED': {
              'types': {
                'IO_PORT_OUT_OF_RANGE': {
                  'label': 'DI_NEW_DRAWER_IS_REQUESTED',
                  'name': 'config.DI_NEW_DRAWER_IS_REQUESTED',
                  'type': 'IO_PORT_OUT_OF_RANGE',
                  'kind': 'controller',
                  'min': 1,
                  'max': 16,
                },
              },
            },
          },
        });
      });

      it('should be a unique port', () => {
        const cobotConfig = configMetaLoaderWithStaticGrid();
        cobotConfig.config.DI_NEW_DRAWER_IS_REQUESTED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_NEW_DRAWER_IS_REQUESTED).toEqual({
          'types': {
            'IO_PORT_NOT_UNIQUE': {
              'label': 'DI_NEW_DRAWER_IS_REQUESTED',
              'name': 'config.DI_NEW_DRAWER_IS_REQUESTED',
              'type': 'IO_PORT_NOT_UNIQUE',
            },
          },
        });
      });
    });

    describe('when no drawer system is used', () => {
      it('should be optional', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.DI_NEW_DRAWER_IS_REQUESTED = {
          type: 'controller',
          value: -1,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a valid port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_NEW_DRAWER_IS_REQUESTED = {
          type: 'flange',
          value: 42,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });

      it('should not have to be a unique port', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DI_NEW_DRAWER_IS_REQUESTED = {
          type: 'controller',
          value: 2,
        };

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors.config?.DI_NEW_DRAWER_IS_REQUESTED).toBe(
          undefined,
        );
      });
    });
  });

  describe('DI_COBOT_IS_CALLED', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_COBOT_IS_CALLED = { type: 'controller', value: -1 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_COBOT_IS_CALLED': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DI_COBOT_IS_CALLED',
                'name': 'config.DI_COBOT_IS_CALLED',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_COBOT_IS_CALLED = { type: 'controller', value: 42 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_COBOT_IS_CALLED': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DI_COBOT_IS_CALLED',
                'name': 'config.DI_COBOT_IS_CALLED',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_COBOT_IS_CALLED = { type: 'controller', value: 2 };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DI_COBOT_IS_CALLED).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DI_COBOT_IS_CALLED',
            'name': 'config.DI_COBOT_IS_CALLED',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DI_COBOT_CAN_CONTROL_MACHINE', () => {
    it('should be required', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_COBOT_CAN_CONTROL_MACHINE = {
        type: 'controller',
        value: -1,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_COBOT_CAN_CONTROL_MACHINE': {
            'types': {
              'IO_PORT_NOT_DEFINED': {
                'label': 'DI_COBOT_CAN_CONTROL_MACHINE',
                'name': 'config.DI_COBOT_CAN_CONTROL_MACHINE',
                'type': 'IO_PORT_NOT_DEFINED',
              },
            },
          },
        },
      });
    });

    it('should be valid port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_COBOT_CAN_CONTROL_MACHINE = {
        type: 'controller',
        value: 42,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DI_COBOT_CAN_CONTROL_MACHINE': {
            'types': {
              'IO_PORT_OUT_OF_RANGE': {
                'label': 'DI_COBOT_CAN_CONTROL_MACHINE',
                'name': 'config.DI_COBOT_CAN_CONTROL_MACHINE',
                'type': 'IO_PORT_OUT_OF_RANGE',
                'kind': 'controller',
                'min': 1,
                'max': 16,
              },
            },
          },
        },
      });
    });

    it('should be a unique port', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DI_COBOT_CAN_CONTROL_MACHINE = {
        type: 'controller',
        value: 2,
      };

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors.config?.DI_COBOT_CAN_CONTROL_MACHINE).toEqual({
        'types': {
          'IO_PORT_NOT_UNIQUE': {
            'label': 'DI_COBOT_CAN_CONTROL_MACHINE',
            'name': 'config.DI_COBOT_CAN_CONTROL_MACHINE',
            'type': 'IO_PORT_NOT_UNIQUE',
          },
        },
      });
    });
  });

  describe('DROP_OFF_POSITIONS', () => {
    it('can have a minimum of 0 and a maximum of 10 drop off positions', () => {
      function check(dropOffPositions: DropOffPosition[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DROP_OFF_POSITIONS = dropOffPositions;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'DROP_OFF_POSITIONS': {
            'types': {
              'ARRAY_SIZE': {
                'label': 'DROP_OFF_POSITIONS',
                'name': 'config.DROP_OFF_POSITIONS',
                'type': 'ARRAY_SIZE',
                'max': 10,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      expect(result.errors).toEqual({});

      result = check([makedDropoffPosition()]);
      expect(result.errors).toEqual({});

      result = check([makedDropoffPosition(), makedDropoffPosition()]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
        makedDropoffPosition(),
      ]);
      expect(result.errors).toEqual(expectedError);
    });

    it('should have a valid cobot position as the position', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.DROP_OFF_POSITIONS = [
        {
          name: 'Dropoff',
          position: [] as unknown as SixNumArray,
          pathFromOutsideMachineDoor: [{ value: [1, 2, 3, 4, 5, 6] }],
        },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'DROP_OFF_POSITIONS': {
            '0': {
              'position': {
                'types': {
                  'INVALID_COBOT_POSITION': {
                    'label': 'DROP_OFF_POSITION',
                    'name': 'config.DROP_OFF_POSITIONS.0.position',
                    'type': 'INVALID_COBOT_POSITION',
                  },
                },
              },
            },
          },
        },
      });
    });

    describe('the pathFromOutsideMachineDoor', () => {
      it('should be an array of valid cobot position', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DROP_OFF_POSITIONS = [
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [
              { value: [] as unknown as SixNumArray },
            ],
          },
        ];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DROP_OFF_POSITIONS': {
              '0': {
                'pathFromOutsideMachineDoor': {
                  'types': {
                    'INVALID_COBOT_POSITION': {
                      'label':
                        'PATH_FROM_DROP_OFF_POSITION_TO_OUTSIDE_MACHINE_DOOR',
                      'name':
                        'config.DROP_OFF_POSITIONS.0.pathFromOutsideMachineDoor',
                      'type': 'INVALID_COBOT_POSITION',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should be an array between 1 and 5 items', () => {
        function check(dropOffPositions: DropOffPosition[]) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.DROP_OFF_POSITIONS = dropOffPositions;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'DROP_OFF_POSITIONS': {
              '0': {
                'pathFromOutsideMachineDoor': {
                  'types': {
                    'ARRAY_SIZE': {
                      'label':
                        'PATH_FROM_DROP_OFF_POSITION_TO_OUTSIDE_MACHINE_DOOR',
                      'name':
                        'config.DROP_OFF_POSITIONS.0.pathFromOutsideMachineDoor',
                      'type': 'ARRAY_SIZE',
                      'max': 5,
                      'min': 0,
                    },
                  },
                },
              },
            },
          },
        };

        let result = check([
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [],
          },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [{ value: [1, 1, 1, 1, 1, 1] }],
          },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
            ],
          },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
            ],
          },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
            ],
          },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
            ],
          },
        ]);
        expect(result.errors).toEqual({});

        result = check([
          {
            name: 'Main',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
              { value: [1, 1, 1, 1, 1, 1] },
            ],
          },
        ]);
        expect(result.errors).toEqual(expectedError);
      });
    });

    describe('the names', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DROP_OFF_POSITIONS = [
          {
            name: '',
            position: [1, 2, 3, 4, 5, 6],
            pathFromOutsideMachineDoor: [],
          },
        ];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'DROP_OFF_POSITIONS': {
              '0': {
                'name': {
                  'types': {
                    'REQUIRED': {
                      'label': 'NAME',
                      'name': 'config.DROP_OFF_POSITIONS.0.name',
                      'type': 'REQUIRED',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should allow up to 100 characters', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DROP_OFF_POSITIONS = [
          {
            name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfa',
            position: [1, 2, 3, 4, 5, 6],
            pathFromOutsideMachineDoor: [],
          },
        ];

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({});
      });

      it('should not be longer than 100 characters', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.DROP_OFF_POSITIONS = [
          {
            name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfas',
            position: [1, 2, 3, 4, 5, 6],
            pathFromOutsideMachineDoor: [],
          },
        ];

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({
          'config': {
            'DROP_OFF_POSITIONS': {
              '0': {
                'name': {
                  'types': {
                    'MAX_LENGTH': {
                      'label': 'NAME',
                      'name': 'config.DROP_OFF_POSITIONS.0.name',
                      'type': 'MAX_LENGTH',
                      'max': 100,
                    },
                  },
                },
              },
            },
          },
        });
      });
    });
  });

  describe('STATIC_GRIDS', () => {
    it('can have a minimum of 0 and a maximum of 10 static grids', () => {
      function check(staticGrids: StaticGridConfig[]) {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.STATIC_GRIDS = staticGrids;

        return cobotConfigValidator(cobotConfig);
      }

      const expectedError = {
        'config': {
          'STATIC_GRIDS': {
            'types': {
              'ARRAY_SIZE': {
                'label': 'STATIC_GRIDS',
                'name': 'config.STATIC_GRIDS',
                'type': 'ARRAY_SIZE',
                'max': 10,
                'min': 0,
              },
            },
          },
        },
      };

      let result = check([]);
      // Note this causes an error in the STATIC_GRID_INDEX not the STATIC_GRIDS
      expect(result.errors).toEqual({
        'config': {
          'STATIC_GRID_INDEX': {
            'types': {
              'UNDEFINED_STATIC_GRID_CONFIGURATION': {
                'label': 'STATIC_GRID_CONFIGURATION',
                'name': 'config.STATIC_GRID_INDEX',
                'type': 'UNDEFINED_STATIC_GRID_CONFIGURATION',
              },
            },
          },
        },
      });

      result = check([staticGridConfig5by4()]);
      expect(result.errors).toEqual({});

      result = check([staticGridConfig5by4(), staticGridConfig5by4()]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual({});

      result = check([
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
        staticGridConfig5by4(),
      ]);
      expect(result.errors).toEqual(expectedError);
    });

    describe('AMOUNT_SQUARES_X_AXIS', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.STATIC_GRIDS = [
          {
            ...staticGridConfig5by4(),
            AMOUNT_SQUARES_X_AXIS: '',
          },
        ];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'STATIC_GRIDS': {
              '0': {
                'AMOUNT_SQUARES_X_AXIS': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'AMOUNT_SQUARES_X_AXIS',
                      'name': 'config.STATIC_GRIDS.0.AMOUNT_SQUARES_X_AXIS',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should be between 1 and 50', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.STATIC_GRIDS = [
            {
              ...staticGridConfig5by4(),
              AMOUNT_SQUARES_X_AXIS: value,
            },
          ];

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'STATIC_GRIDS': {
              '0': {
                'AMOUNT_SQUARES_X_AXIS': {
                  'types': {
                    'NUMBER_BETWEEN': {
                      'label': 'AMOUNT_SQUARES_X_AXIS',
                      'name': 'config.STATIC_GRIDS.0.AMOUNT_SQUARES_X_AXIS',
                      'type': 'NUMBER_BETWEEN',
                      'min': 1,
                      'max': 50,
                    },
                  },
                },
              },
            },
          },
        };

        let result = check('0');
        expect(result.errors).toEqual(expectedError);

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('2');
        expect(result.errors).toEqual({});

        result = check('49');
        expect(result.errors).toEqual({});

        result = check('50');
        expect(result.errors).toEqual({});

        result = check('51');
        expect(result.errors).toEqual(expectedError);
      });
    });

    describe('AMOUNT_SQUARES_Y_AXIS', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.STATIC_GRIDS = [
          {
            ...staticGridConfig5by4(),
            AMOUNT_SQUARES_Y_AXIS: '',
          },
        ];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'STATIC_GRIDS': {
              '0': {
                'AMOUNT_SQUARES_Y_AXIS': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'AMOUNT_SQUARES_Y_AXIS',
                      'name': 'config.STATIC_GRIDS.0.AMOUNT_SQUARES_Y_AXIS',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should be between 1 and 50', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.STATIC_GRIDS = [
            {
              ...staticGridConfig5by4(),
              AMOUNT_SQUARES_Y_AXIS: value,
            },
          ];

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'STATIC_GRIDS': {
              '0': {
                'AMOUNT_SQUARES_Y_AXIS': {
                  'types': {
                    'NUMBER_BETWEEN': {
                      'label': 'AMOUNT_SQUARES_Y_AXIS',
                      'name': 'config.STATIC_GRIDS.0.AMOUNT_SQUARES_Y_AXIS',
                      'type': 'NUMBER_BETWEEN',
                      'min': 1,
                      'max': 50,
                    },
                  },
                },
              },
            },
          },
        };

        let result = check('0');
        expect(result.errors).toEqual(expectedError);

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('2');
        expect(result.errors).toEqual({});

        result = check('49');
        expect(result.errors).toEqual({});

        result = check('50');
        expect(result.errors).toEqual({});

        result = check('51');
        expect(result.errors).toEqual(expectedError);
      });
    });

    it('should require a valid cobot position for the DRAWER_LEFT_FRONT_TEACH_POSITION', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.STATIC_GRIDS = [
        {
          ...staticGridConfig5by4(),
          DRAWER_LEFT_FRONT_TEACH_POSITION: [] as unknown as SixNumArray,
        },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'STATIC_GRIDS': {
            '0': {
              'DRAWER_LEFT_FRONT_TEACH_POSITION': {
                'types': {
                  'INVALID_COBOT_POSITION': {
                    'label': 'DRAWER_LEFT_FRONT_TEACH_POSITION',
                    'name':
                      'config.STATIC_GRIDS.0.DRAWER_LEFT_FRONT_TEACH_POSITION',
                    'type': 'INVALID_COBOT_POSITION',
                  },
                },
              },
            },
          },
        },
      });
    });

    it('should require a valid cobot position for the DRAWER_LEFT_BACK_TEACH_POSITION', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.STATIC_GRIDS = [
        {
          ...staticGridConfig5by4(),
          DRAWER_LEFT_BACK_TEACH_POSITION: [] as unknown as SixNumArray,
        },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'STATIC_GRIDS': {
            '0': {
              'DRAWER_LEFT_BACK_TEACH_POSITION': {
                'types': {
                  'INVALID_COBOT_POSITION': {
                    'label': 'DRAWER_LEFT_BACK_TEACH_POSITION',
                    'name':
                      'config.STATIC_GRIDS.0.DRAWER_LEFT_BACK_TEACH_POSITION',
                    'type': 'INVALID_COBOT_POSITION',
                  },
                },
              },
            },
          },
        },
      });
    });

    it('should require a valid cobot position for the DRAWER_RIGHT_FRONT_TEACH_POSITION', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.STATIC_GRIDS = [
        {
          ...staticGridConfig5by4(),
          DRAWER_RIGHT_FRONT_TEACH_POSITION: [] as unknown as SixNumArray,
        },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'STATIC_GRIDS': {
            '0': {
              'DRAWER_RIGHT_FRONT_TEACH_POSITION': {
                'types': {
                  'INVALID_COBOT_POSITION': {
                    'label': 'DRAWER_RIGHT_FRONT_TEACH_POSITION',
                    'name':
                      'config.STATIC_GRIDS.0.DRAWER_RIGHT_FRONT_TEACH_POSITION',
                    'type': 'INVALID_COBOT_POSITION',
                  },
                },
              },
            },
          },
        },
      });
    });

    it('should require a valid cobot position for the DRAWER_RIGHT_BACK_TEACH_POSITION', () => {
      const cobotConfig = configEasyloaderWithStaticGrid();
      cobotConfig.config.STATIC_GRIDS = [
        {
          ...staticGridConfig5by4(),
          DRAWER_RIGHT_BACK_TEACH_POSITION: [] as unknown as SixNumArray,
        },
      ];

      const result = cobotConfigValidator(cobotConfig);

      expect(result.errors).toEqual({
        'config': {
          'STATIC_GRIDS': {
            '0': {
              'DRAWER_RIGHT_BACK_TEACH_POSITION': {
                'types': {
                  'INVALID_COBOT_POSITION': {
                    'label': 'DRAWER_RIGHT_BACK_TEACH_POSITION',
                    'name':
                      'config.STATIC_GRIDS.0.DRAWER_RIGHT_BACK_TEACH_POSITION',
                    'type': 'INVALID_COBOT_POSITION',
                  },
                },
              },
            },
          },
        },
      });
    });

    describe('the names', () => {
      it('should be required', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.STATIC_GRIDS = [
          {
            ...staticGridConfig5by4(),
            name: '',
          },
        ];

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'STATIC_GRIDS': {
              '0': {
                'name': {
                  'types': {
                    'REQUIRED': {
                      'label': 'NAME',
                      'name': 'config.STATIC_GRIDS.0.name',
                      'type': 'REQUIRED',
                    },
                  },
                },
              },
            },
          },
        });
      });

      it('should allow up to 100 characters', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.STATIC_GRIDS = [
          {
            ...staticGridConfig5by4(),
            name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfa',
          },
        ];

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({});
      });

      it('should not be longer than 100 characters', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.STATIC_GRIDS = [
          {
            ...staticGridConfig5by4(),
            name: 'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfas',
          },
        ];

        const result = cobotConfigValidator(cobotConfig);
        expect(result.errors).toEqual({
          'config': {
            'STATIC_GRIDS': {
              '0': {
                'name': {
                  'types': {
                    'MAX_LENGTH': {
                      'label': 'NAME',
                      'name': 'config.STATIC_GRIDS.0.name',
                      'type': 'MAX_LENGTH',
                      'max': 100,
                    },
                  },
                },
              },
            },
          },
        });
      });
    });
  });

  describe('STATIC_GRID_INDEX', () => {
    describe('when grid is static', () => {
      it('should be required ', () => {
        const cobotConfig = configEasyloaderWithStaticGrid();
        cobotConfig.config.STATIC_GRID_INDEX = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({
          'config': {
            'STATIC_GRID_INDEX': {
              'types': {
                'REQUIRED': {
                  'label': 'STATIC_GRID_CONFIGURATION',
                  'name': 'config.STATIC_GRID_INDEX',
                  'type': 'REQUIRED',
                },
              },
            },
          },
        });
      });

      it('should be a valid static grid index', () => {
        function check(value: string) {
          const cobotConfig = configMetaLoaderWithStaticGrid();
          cobotConfig.config.STATIC_GRID_INDEX = value;

          return cobotConfigValidator(cobotConfig);
        }

        const expectedError = {
          'config': {
            'STATIC_GRID_INDEX': {
              'types': {
                'UNDEFINED_STATIC_GRID_CONFIGURATION': {
                  'label': 'STATIC_GRID_CONFIGURATION',
                  'name': 'config.STATIC_GRID_INDEX',
                  'type': 'UNDEFINED_STATIC_GRID_CONFIGURATION',
                },
              },
            },
          },
        };

        let result = check('-1');
        expect(result.errors).toEqual(expectedError);

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('2');
        expect(result.errors).toEqual(expectedError);
      });
    });

    describe('when grid is pinned', () => {
      it('should not be required', () => {
        const cobotConfig = configMetaLoaderWithPinnedGrid();
        cobotConfig.config.EASY_LOADER.SECOND_DRAWER.STATIC_GRID_INDEX = '';

        const result = cobotConfigValidator(cobotConfig);

        expect(result.errors).toEqual({});
      });
    });
  });
});
