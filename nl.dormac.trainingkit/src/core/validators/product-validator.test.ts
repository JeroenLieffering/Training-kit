import { COBOTS, GRIPPER_SUPPLIERS } from '../../config';
import { useToolWeight } from '../../hooks/useToolWeight';
import {
  configEasyloaderWithPinnedGrid,
  configEasyloaderWithStaticGrid,
  configMetaLoaderWithPinnedGrid,
  configMetaLoaderWithStaticGrid,
  configProFeederWithPinnedGrid,
} from '../fixtures/cobot-config-fixtures';
import { makeCar, makeWrench } from '../fixtures/product-fixtures';
import { ProductIcon } from '../models/product-types';
import { productValidator } from './product-validator';

describe('util: productValidator', () => {
  describe('name', () => {
    it('should be required', () => {
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);
      
                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      
      product.name = '';

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
        toolWeight,
      );

      expect(result.errors).toEqual({
        'name': {
          'types': {
            'REQUIRED': {
              'label': 'PRODUCT_NAME',
              'name': 'name',
              'type': 'REQUIRED',
            },
          },
        },
      });
    });

    it('should allow up to 100 characters', () => {
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      product.name =
        'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfa';

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
        toolWeight,
      );

      expect(result.errors).toEqual({});
    });

    it('should not be longer than 100 characters', () => {
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      product.name =
        'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfax';

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
        toolWeight,
      );

      expect(result.errors).toEqual({
        'name': {
          'types': {
            'MAX_LENGTH': {
              'label': 'PRODUCT_NAME',
              'name': 'name',
              'max': 100,
              'type': 'MAX_LENGTH',
            },
          },
        },
      });
    });
  });

  describe('description', () => {
    it('should not be required', () => {
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      product.description = '';

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
        toolWeight,
      );

      expect(result.errors).toEqual({});
    });

    it('should allow up to 255 characters', () => {
                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      product.description =
        'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfa';

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
      );

      expect(result.errors).toEqual({});
    });

    it('should not be longer than 255 characters', () => {
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      product.description =
        'asdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfax';

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
        toolWeight,
      );

      expect(result.errors).toEqual({
        'description': {
          'types': {
            'MAX_LENGTH': {
              'label': 'PRODUCT_DESCRIPTION',
              'name': 'description',
              'max': 255,
              'type': 'MAX_LENGTH',
            },
          },
        },
      });
    });
  });

  describe('icon', () => {
    it('should be required', () => {
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      product.icon = '' as ProductIcon;

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
        toolWeight,
      );

      expect(result.errors).toEqual({
        'icon': {
          'types': {
            'REQUIRED': {
              'label': 'PRODUCT_ICON',
              'type': 'REQUIRED',
              'name': 'icon',
            },
          },
        },
      });
    });

    it('should be a known ProductIcon', () => {
      const toolWeightStr = useToolWeight() ?? "0";
      const toolWeight = parseFloat(toolWeightStr);

                const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
      product.icon = 'dlfjalkdfjalsdjfasfj' as ProductIcon;

      const result = productValidator(
        product,
        configEasyloaderWithStaticGrid(),
        COBOTS[2],
        toolWeight,
      );

      expect(result.errors).toEqual({
        'icon': {
          'types': {
            'REQUIRED': {
              'label': 'PRODUCT_ICON',
              'type': 'REQUIRED',
              'name': 'icon',
            },
          },
        },
      });
    });
  });

  describe('config', () => {
    describe('FORCE_FEEDING_NEWTON', () => {
      describe('when FORCE_INFEED is true', () => {
        it('should be required', () => {
          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);


          const product = makeWrench();
          product.config.FORCE_INFEED = true;
          product.config.FORCE_FEEDING_NEWTON = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
            toolWeight,
          );

          expect(result.errors).toEqual({
            'config': {
              'FORCE_FEEDING_NEWTON': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FORCE_FEEDING_NEWTON',
                    'name': 'config.FORCE_FEEDING_NEWTON',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 5 and 80', () => {
          function check(value: string) {
            const toolWeightStr = useToolWeight() ?? "0";
            const toolWeight = parseFloat(toolWeightStr);

                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.FORCE_INFEED = true;
            product.config.FORCE_FEEDING_NEWTON = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
              toolWeight,
            );
          }

          let result = check('5');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('42');
          expect(result.errors).toEqual({});

          result = check('79');
          expect(result.errors).toEqual({});

          result = check('80');
          expect(result.errors).toEqual({});

          result = check('81');
          expect(result.errors).toEqual({
            'config': {
              'FORCE_FEEDING_NEWTON': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FORCE_FEEDING_NEWTON',
                    'name': 'config.FORCE_FEEDING_NEWTON',
                    'type': 'NUMBER_BETWEEN',
                    'min': 5,
                    'max': 80,
                  },
                },
              },
            },
          });

          result = check('4');
          expect(result.errors).toEqual({
            'config': {
              'FORCE_FEEDING_NEWTON': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FORCE_FEEDING_NEWTON',
                    'name': 'config.FORCE_FEEDING_NEWTON',
                    'type': 'NUMBER_BETWEEN',
                    'min': 5,
                    'max': 80,
                  },
                },
              },
            },
          });
        });
      });

      describe('when FORCE_INFEED is false', () => {
        it('should not be required', () => {
          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);


          const product = makeWrench();
          product.config.FORCE_INFEED = false;
          product.config.FORCE_FEEDING_NEWTON = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
            toolWeight,
          );

          expect(result.errors).toEqual({});
        });
      });
    });

    describe('FORCE_PUSHING_NEWTON', () => {
      describe('when PUSH_AFTER_PLACE is true', () => {
        it('should be required', () => {
          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);


          const product = makeWrench();
          product.config.PUSH_AFTER_PLACE = true;
          product.config.FORCE_PUSHING_NEWTON = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
            toolWeight,
          );

          expect(result.errors).toEqual({
            'config': {
              'FORCE_PUSHING_NEWTON': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FORCE_PUSHING_NEWTON',
                    'name': 'config.FORCE_PUSHING_NEWTON',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 5 and 80', () => {
          function check(value: string) {
            const toolWeightStr = useToolWeight() ?? "0";
            const toolWeight = parseFloat(toolWeightStr);

                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.PUSH_AFTER_PLACE = true;
            product.config.FORCE_PUSHING_NEWTON = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
              toolWeight,
            );
          }

          let result = check('4');
          expect(result.errors).toEqual({
            'config': {
              'FORCE_PUSHING_NEWTON': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FORCE_PUSHING_NEWTON',
                    'name': 'config.FORCE_PUSHING_NEWTON',
                    'type': 'NUMBER_BETWEEN',
                    'min': 5,
                    'max': 80,
                  },
                },
              },
            },
          });

          result = check('5');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('42');
          expect(result.errors).toEqual({});

          result = check('79');
          expect(result.errors).toEqual({});

          result = check('80');
          expect(result.errors).toEqual({});

          result = check('81');
          expect(result.errors).toEqual({
            'config': {
              'FORCE_PUSHING_NEWTON': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FORCE_PUSHING_NEWTON',
                    'name': 'config.FORCE_PUSHING_NEWTON',
                    'type': 'NUMBER_BETWEEN',
                    'min': 5,
                    'max': 80,
                  },
                },
              },
            },
          });
        });
      });

      describe('when PUSH_AFTER_PLACE is false', () => {
        it('should not be required', () => {
          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PUSH_AFTER_PLACE = false;
          product.config.FORCE_PUSHING_NEWTON = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
            toolWeight,
          );

          expect(result.errors).toEqual({});
        });
      });
    });

    describe('PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER', () => {
      describe('with easy loader, static grid, and second drawer', () => {
        it('should allow a place finished product on second drawer', () => {
          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });

        it('should allow not using a place finished product on second drawer', () => {
          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });

        it('should not allow it to be used in combination with place finished product on drop off point', () => {
          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
          product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.DROP_OFF_POSITIONS = [
            {
              name: 'Dropoff',
              position: [0, 0, 0, 0, 0, 0],
              pathFromOutsideMachineDoor: [],
            },
          ];

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER': {
                'types': {
                  'PLACE_FINISHED_PRODUCT_CANNOT_GO_ON_SECOND_DRAWER_AND_DROP_OFF_POSITION_AT_SAME_TIME':
                    {
                      'label': 'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'name': 'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'type':
                        'PLACE_FINISHED_PRODUCT_CANNOT_GO_ON_SECOND_DRAWER_AND_DROP_OFF_POSITION_AT_SAME_TIME',
                    },
                },
              },
            },
          });
        });

        it('should allow using place finished product on drop off point when not placing on second drawer', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;
          product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;
          cobotConfig.config.DROP_OFF_POSITIONS = [
            {
              name: 'Dropoff',
              position: [0, 0, 0, 0, 0, 0],
              pathFromOutsideMachineDoor: [],
            },
          ];

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });

      describe('when using easy loader, static grid, but no second drawer', () => {
        it('should not allow a place finished product on second drawer', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER': {
                'types': {
                  'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER':
                    {
                      'label': 'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'name': 'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'type':
                        'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER',
                    },
                },
              },
            },
          });
        });

        it('should allow not using a place finished product on second drawer', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = false;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });

      describe('when using easy loader, second drawer, but with a pinned grid', () => {
        it('should not allow a place finished product on second drawer', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER': {
                'types': {
                  'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER':
                    {
                      'label': 'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'name': 'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'type':
                        'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER',
                    },
                },
              },
            },
          });
        });

        it('should allow not using a place finished product on second drawer', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });

      describe('when using second drawer, with static grid, but with no easy loader', () => {
        it('should not allow a place finished product on second drawer', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;

          const cobotConfig = configMetaLoaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER': {
                'types': {
                  'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER':
                    {
                      'label': 'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'name': 'config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER',
                      'type':
                        'PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER_REQUIRES_EASY_LOADER_AND_STATIC_GRID_WITH_A_SECOND_DRAWER',
                    },
                },
              },
            },
          });
        });

        it('should allow not using a place finished product on second drawer', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;

          const cobotConfig = configMetaLoaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });
    });

    describe('PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX', () => {
      it('should be required when using a drop off position', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();
        cobotConfig.config.DROP_OFF_POSITIONS = [
          {
            name: 'Dropoff',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [{ value: [0, 0, 0, 0, 0, 0] }],
          },
          {
            name: 'Dropoff',
            position: [0, 0, 0, 0, 0, 0],
            pathFromOutsideMachineDoor: [{ value: [0, 0, 0, 0, 0, 0] }],
          },
        ];

                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
        product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX = '';

        const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

        expect(result.errors).toEqual({
          'config': {
            'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX': {
              'types': {
                'REQUIRED': {
                  'label': 'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
                  'name':
                    'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX',
                  'type': 'REQUIRED',
                },
              },
            },
          },
        });
      });

      it('should not be required when not using a drop off position', () => {
        const cobotConfig = configEasyloaderWithPinnedGrid();

                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = false;
        product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX = '5';

        const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

        expect(result.errors).toEqual({});
      });

      it('should be set to a valid index', () => {
        function check(value: string) {
          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.DROP_OFF_POSITIONS = [
            {
              name: 'Dropoff',
              position: [0, 0, 0, 0, 0, 0],
              pathFromOutsideMachineDoor: [{ value: [0, 0, 0, 0, 0, 0] }],
            },
            {
              name: 'Dropoff',
              position: [0, 0, 0, 0, 0, 0],
              pathFromOutsideMachineDoor: [{ value: [0, 0, 0, 0, 0, 0] }],
            },
          ];

                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION = true;
          product.config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX =
            value;

          return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
        }

        let result = check('-1');
        expect(result.errors).toEqual({
          'config': {
            'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX': {
              'types': {
                'UNDEFINED_DROP_OFF_POSITION': {
                  'label': 'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
                  'name':
                    'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX',
                  'type': 'UNDEFINED_DROP_OFF_POSITION',
                },
              },
            },
          },
        });

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('2');
        expect(result.errors).toEqual({
          'config': {
            'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX': {
              'types': {
                'UNDEFINED_DROP_OFF_POSITION': {
                  'label': 'PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION',
                  'name':
                    'config.PLACE_FINISHED_PRODUCT_ON_DROP_OFF_POSITION_INDEX',
                  'type': 'UNDEFINED_DROP_OFF_POSITION',
                },
              },
            },
          },
        });
      });
    });

    describe('RAW_MAT_HEIGHT', () => {
      describe('with feeder MetaLoader', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_HEIGHT = 'foo';

          const result = productValidator(
            product,
            configMetaLoaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_HEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_HEIGHT',
                    'name': 'config.RAW_MAT_HEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        describe('when machine is smaller than drawer', () => {
          it('should be a number between min grid and max height of the machine', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_HEIGHT = value;
              product.config.FIN_PRODUCT_HEIGHT = '0.1';

              const cobotConfig = configMetaLoaderWithStaticGrid();
              cobotConfig.config.MACHINE_MAX_FEED_HEIGHT = '10';

              return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_HEIGHT',
                  'name': 'config.RAW_MAT_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                  'max': 10,
                  'min': 5,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('4');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('5');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('10');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('11');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);
          });
        });

        describe('when machine is larger than drawer', () => {
          it('should be a number between min and max height of the drawer', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_HEIGHT = value;

              return productValidator(
                product,
                configMetaLoaderWithStaticGrid(),
                COBOTS[2],
              );
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_HEIGHT',
                  'name': 'config.RAW_MAT_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                  'max': 120,
                  'min': 5,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('4');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('5');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('120');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('121');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);
          });
        });
      });

      describe('with feeder EasyLoader', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_HEIGHT = 'foo';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_HEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_HEIGHT',
                    'name': 'config.RAW_MAT_HEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be a number between min and max height of the MACHINE_MAX_FEED_HEIGHT for EasyLoaders', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_HEIGHT = value;
            product.config.FIN_PRODUCT_HEIGHT = '0.1';

            const cobotConfig = configEasyloaderWithStaticGrid();
            cobotConfig.config.MACHINE_MAX_FEED_HEIGHT = '100';

            return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
          }

          const expectedError = {
            'config': {
              'RAW_MAT_HEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_HEIGHT',
                    'name': 'config.RAW_MAT_HEIGHT',
                    'type': 'NUMBER_BETWEEN',
                    'max': 100,
                    'min': 5,
                  },
                },
              },
            },
          };

          let result = check('0');
          expect(result.errors).toEqual(expectedError);

          result = check('4');
          expect(result.errors).toEqual(expectedError);

          result = check('5');
          expect(result.errors).toEqual({});

          result = check('100');
          expect(result.errors).toEqual({});

          result = check('101');
          expect(result.errors).toEqual(expectedError);
        });
      });

      describe('with feeder ProLoader', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_HEIGHT = 'foo';
          product.config.RAW_MAT_LENGTH = '50';
          product.config.FIN_PRODUCT_LENGTH = '25';

          const result = productValidator(
            product,
            configProFeederWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_HEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_HEIGHT',
                    'name': 'config.RAW_MAT_HEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        describe('when machine is smaller than grid', () => {
          it('should be a number between min grid and max height of the machine', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_HEIGHT = value;
              product.config.FIN_PRODUCT_HEIGHT = '0.1';

              const cobotConfig = configProFeederWithPinnedGrid();
              cobotConfig.config.MACHINE_MAX_FEED_HEIGHT = '10';

              return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_HEIGHT',
                  'name': 'config.RAW_MAT_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                  'max': 10,
                  'min': 5,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('4');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('5');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('10');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('11');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);
          });
        });

        describe('when machine is larger than grid', () => {
          it('should be a number between min and max height of the feeder', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_HEIGHT = value;

              return productValidator(
                product,
                configProFeederWithPinnedGrid(),
                COBOTS[2],
              );
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_HEIGHT',
                  'name': 'config.RAW_MAT_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                  'max': 100,
                  'min': 5,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('4');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);

            result = check('5');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('100');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(undefined);

            result = check('101');
            expect(result.errors.config?.RAW_MAT_HEIGHT).toEqual(expectedError);
          });
        });
      });
    });

    describe('RAW_MAT_LENGTH', () => {
      describe('with feeder MetaLoader', () => {
        describe('with static grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual({
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'RAW_MAT_LENGTH',
                  'name': 'config.RAW_MAT_LENGTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max length of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;

                const cobotConfig = configMetaLoaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 710,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('710');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('711');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });
        });

        describe('with pinned grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual({
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'RAW_MAT_LENGTH',
                  'name': 'config.RAW_MAT_LENGTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 46,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('45');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('46');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max length of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;
                product.config.POSITIONING_PIN_DIAMETER = '20';

                const cobotConfig = configMetaLoaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 710,
                    'min': 40,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('39');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('40');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('710');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('711');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });
        });
      });

      describe('with feeder EasyLoader', () => {
        describe('with static grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({
              'config': {
                'RAW_MAT_LENGTH': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'RAW_MAT_LENGTH',
                      'name': 'config.RAW_MAT_LENGTH',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({});
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max length of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;

                const cobotConfig = configEasyloaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 1000,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('1000');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('1001');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });
        });

        describe('with pinned grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({
              'config': {
                'RAW_MAT_LENGTH': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'RAW_MAT_LENGTH',
                      'name': 'config.RAW_MAT_LENGTH',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_LENGTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({});
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 46,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('45');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('46');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max length of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_LENGTH = value;
                product.config.POSITIONING_PIN_DIAMETER = '16';

                const cobotConfig = configEasyloaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 1000,
                    'min': 42,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('41');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );

              result = check('42');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('1000');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

              result = check('1001');
              expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(
                expectedError,
              );
            });
          });
        });
      });

      describe('with feeder ProLoader, which is always a pinned grid', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_LENGTH = 'foo';

          const result = productValidator(
            product,
            configProFeederWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_LENGTH': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_LENGTH',
                    'name': 'config.RAW_MAT_LENGTH',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should consider all round products valid', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_LENGTH = 'foo';
          product.config.RAW_MAT_DIAMETER = '50';
          product.config.FIN_PRODUCT_DIAMETER = '40';

          const result = productValidator(
            product,
            configProFeederWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({});
        });

        describe('when machine is smaller than grid', () => {
          it('should be a number between min grid and max length of the machine', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_LENGTH = value;
              product.config.FIN_PRODUCT_HEIGHT = '0.1';

              const cobotConfig = configProFeederWithPinnedGrid();
              cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '80';

              return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_LENGTH',
                  'name': 'config.RAW_MAT_LENGTH',
                  'type': 'NUMBER_BETWEEN',
                  'max': 80,
                  'min': 46,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(expectedError);

            result = check('45');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(expectedError);

            result = check('46');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

            result = check('80');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

            result = check('81');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(expectedError);
          });
        });

        describe('when machine is larger than grid', () => {
          it('should be a number between min and max length of the feeder', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_LENGTH = value;
              product.config.POSITIONING_PIN_DIAMETER = '12';

              return productValidator(
                product,
                configProFeederWithPinnedGrid(),
                COBOTS[2],
              );
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_LENGTH',
                  'name': 'config.RAW_MAT_LENGTH',
                  'type': 'NUMBER_BETWEEN',
                  'max': 100,
                  'min': 44,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(expectedError);

            result = check('43');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(expectedError);

            result = check('44');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

            result = check('100');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(undefined);

            result = check('101');
            expect(result.errors.config?.RAW_MAT_LENGTH).toEqual(expectedError);
          });
        });
      });
    });

    describe('RAW_MAT_WIDTH', () => {
      describe('with feeder MetaLoader', () => {
        describe('with static grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual({
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'RAW_MAT_WIDTH',
                  'name': 'config.RAW_MAT_WIDTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;

                const cobotConfig = configMetaLoaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });
        });

        describe('with pinned grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual({
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'RAW_MAT_WIDTH',
                  'name': 'config.RAW_MAT_WIDTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 46,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('45');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('46');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;
                product.config.POSITIONING_PIN_DIAMETER = '20';

                const cobotConfig = configMetaLoaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 40,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('39');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('40');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });
        });
      });

      describe('with feeder EasyLoader', () => {
        describe('with static grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({
              'config': {
                'RAW_MAT_WIDTH': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'RAW_MAT_WIDTH',
                      'name': 'config.RAW_MAT_WIDTH',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({});
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;

                const cobotConfig = configEasyloaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });
        });

        describe('with pinned grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({
              'config': {
                'RAW_MAT_WIDTH': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'RAW_MAT_WIDTH',
                      'name': 'config.RAW_MAT_WIDTH',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            });
          });

          it('should consider all round products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WIDTH = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({});
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 46,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('45');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('46');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
                product.config.RAW_MAT_WIDTH = value;
                product.config.POSITIONING_PIN_DIAMETER = '16';

                const cobotConfig = configEasyloaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 42,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('41');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );

              result = check('42');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(
                expectedError,
              );
            });
          });
        });
      });

      describe('with feeder ProLoader, which is always a pinned grid', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_WIDTH = 'foo';
          product.config.RAW_MAT_DIAMETER = '50';
          product.config.RAW_MAT_LENGTH = '50';
          product.config.FIN_PRODUCT_LENGTH = '50';
          product.config.FIN_PRODUCT_DIAMETER = '40';

          const result = productValidator(
            product,
            configProFeederWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_WIDTH': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_WIDTH',
                    'name': 'config.RAW_MAT_WIDTH',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should consider all round products valid', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_WIDTH = 'foo';
          product.config.RAW_MAT_DIAMETER = '50';
          product.config.FIN_PRODUCT_DIAMETER = '40';

          const result = productValidator(
            product,
            configProFeederWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({});
        });

        describe('when machine is smaller than grid', () => {
          it('should be a number between min grid and max width of the machine', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_WIDTH = value;
              product.config.FIN_PRODUCT_HEIGHT = '0.1';

              const cobotConfig = configProFeederWithPinnedGrid();
              cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '80';

              return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_WIDTH',
                  'name': 'config.RAW_MAT_WIDTH',
                  'type': 'NUMBER_BETWEEN',
                  'max': 80,
                  'min': 46,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(expectedError);

            result = check('45');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(expectedError);

            result = check('46');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

            result = check('80');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

            result = check('81');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(expectedError);
          });
        });

        describe('when machine is larger than grid', () => {
          it('should be a number between min and max width of the feeder', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
              product.config.RAW_MAT_WIDTH = value;
              product.config.POSITIONING_PIN_DIAMETER = '12';

              return productValidator(
                product,
                configProFeederWithPinnedGrid(),
                COBOTS[2],
              );
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_WIDTH',
                  'name': 'config.RAW_MAT_WIDTH',
                  'type': 'NUMBER_BETWEEN',
                  'max': 100,
                  'min': 44,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(expectedError);

            result = check('43');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(expectedError);

            result = check('44');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

            result = check('100');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(undefined);

            result = check('101');
            expect(result.errors.config?.RAW_MAT_WIDTH).toEqual(expectedError);
          });
        });
      });
    });

    describe('RAW_MAT_DIAMETER', () => {
      describe('with feeder MetaLoader', () => {
        describe('with static grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual({
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'RAW_MAT_DIAMETER',
                  'name': 'config.RAW_MAT_DIAMETER',
                  'type': 'NOT_A_NUMBER',
                },
              },
            });
          });

          it('should consider all rectangular products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });

            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;

                const cobotConfig = configMetaLoaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });
        });

        describe('with pinned grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual({
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'RAW_MAT_DIAMETER',
                  'name': 'config.RAW_MAT_DIAMETER',
                  'type': 'NOT_A_NUMBER',
                },
              },
            });
          });

          it('should consider all rectangular products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configMetaLoaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 17,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('16');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('17');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });

            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configMetaLoaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 17,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('16');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('17');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.POSITIONING_PIN_DIAMETER = '20';

                const cobotConfig = configMetaLoaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });
        });
      });

      describe('with feeder EasyLoader', () => {
        describe('with static grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({
              'config': {
                'RAW_MAT_DIAMETER': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'RAW_MAT_DIAMETER',
                      'name': 'config.RAW_MAT_DIAMETER',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            });
          });

          it('should consider all rectangular products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({});
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });

            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '10';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 10,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('10');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('11');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;

                const cobotConfig = configEasyloaderWithStaticGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 5,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('4');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('5');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });
        });

        describe('with pinned grid', () => {
          it('should be a number', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({
              'config': {
                'RAW_MAT_DIAMETER': {
                  'types': {
                    'NOT_A_NUMBER': {
                      'label': 'RAW_MAT_DIAMETER',
                      'name': 'config.RAW_MAT_DIAMETER',
                      'type': 'NOT_A_NUMBER',
                    },
                  },
                },
              },
            });
          });

          it('should consider all rectangular products valid', () => {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_DIAMETER = 'foo';

            const result = productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );

            expect(result.errors).toEqual({});
          });

          describe('when machine is smaller than grid', () => {
            it('should be a number between min grid and max width of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 17,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('16');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('17');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });

            it('should be a number between min grid and max length of the machine', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.FIN_PRODUCT_HEIGHT = '0.1';

                const cobotConfig = configEasyloaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '80';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 80,
                    'min': 17,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('16');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('17');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('80');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('81');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });

          describe('when machine is larger than grid', () => {
            it('should be a number between min and max width of the feeder', () => {
              function check(value: string) {
                          const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
                product.config.RAW_MAT_DIAMETER = value;
                product.config.POSITIONING_PIN_DIAMETER = '16';

                const cobotConfig = configEasyloaderWithPinnedGrid();
                cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '9999';
                cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '9999';

                return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
              }

              const expectedError = {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'max': 580,
                    'min': 9,
                  },
                },
              };

              let result = check('0');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('8');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );

              result = check('9');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('580');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

              result = check('581');
              expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
                expectedError,
              );
            });
          });
        });
      });

      describe('with feeder ProLoader, which is always a pinned grid', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_DIAMETER = 'foo';

          const result = productValidator(
            product,
            configProFeederWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_DIAMETER': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_DIAMETER',
                    'name': 'config.RAW_MAT_DIAMETER',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should consider all rectangular products valid', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_DIAMETER = 'foo';
          product.config.RAW_MAT_LENGTH = '50';
          product.config.FIN_PRODUCT_LENGTH = '20';

          const result = productValidator(
            product,
            configProFeederWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({});
        });

        describe('when machine is smaller than grid', () => {
          it('should be a number between min grid and max width of the machine', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
              product.config.RAW_MAT_DIAMETER = value;
              product.config.FIN_PRODUCT_HEIGHT = '0.1';

              const cobotConfig = configProFeederWithPinnedGrid();
              cobotConfig.config.MACHINE_MAX_FEED_WIDTH = '80';

              return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_DIAMETER',
                  'name': 'config.RAW_MAT_DIAMETER',
                  'type': 'NUMBER_BETWEEN',
                  'max': 80,
                  'min': 17,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );

            result = check('16');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );

            result = check('17');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

            result = check('80');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

            result = check('81');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );
          });

          it('should be a number between min grid and max width of the machine', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
              product.config.RAW_MAT_DIAMETER = value;
              product.config.FIN_PRODUCT_HEIGHT = '0.1';

              const cobotConfig = configProFeederWithPinnedGrid();
              cobotConfig.config.MACHINE_MAX_FEED_LENGTH = '80';

              return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_DIAMETER',
                  'name': 'config.RAW_MAT_DIAMETER',
                  'type': 'NUMBER_BETWEEN',
                  'max': 80,
                  'min': 17,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );

            result = check('16');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );

            result = check('17');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

            result = check('80');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

            result = check('81');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );
          });
        });

        describe('when machine is larger than grid', () => {
          it('should be a number between min and max width of the feeder', () => {
            function check(value: string) {
                        const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
              product.config.RAW_MAT_DIAMETER = value;
              product.config.POSITIONING_PIN_DIAMETER = '20';

              return productValidator(
                product,
                configProFeederWithPinnedGrid(),
                COBOTS[2],
              );
            }

            const expectedError = {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'RAW_MAT_DIAMETER',
                  'name': 'config.RAW_MAT_DIAMETER',
                  'type': 'NUMBER_BETWEEN',
                  'max': 100,
                  'min': 5,
                },
              },
            };

            let result = check('0');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );

            result = check('4');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );

            result = check('5');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

            result = check('100');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(undefined);

            result = check('101');
            expect(result.errors.config?.RAW_MAT_DIAMETER).toEqual(
              expectedError,
            );
          });
        });
      });
    });

    describe('RAW_MAT_WEIGHT', () => {
      describe('when gripper 1 can carry less than the cobot', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_WEIGHT = 'foo';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            { model: 'TEST', carryWeight: 9999, carryWeightMax: 9999 },
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_WEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_WEIGHT',
                    'name': 'config.RAW_MAT_WEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be a number between 0.1 and the carry weight of the gripper', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_WEIGHT = value;
            product.config.FIN_PRODUCT_WEIGHT = '0.1';

            const cobotConfig = configEasyloaderWithStaticGrid();

            cobotConfig.config.GR1_SUPPLIER = GRIPPER_SUPPLIERS[0].id;
            // GPD5010N-AL-A weighs 1.5 kg
            cobotConfig.config.GR1_TYPE = GRIPPER_SUPPLIERS[0].grippers[0].id;
            // 1x EB5010AL weighs 0.57 kg
            cobotConfig.config.GR1_ADDONS = [
              GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id,
            ];

            cobotConfig.config.GR2_SUPPLIER = '';
            cobotConfig.config.GR2_TYPE = '';
            cobotConfig.config.GR2_ADDONS = [];

            return productValidator(product, cobotConfig, {
              model: 'TEST',
              carryWeight: 9999,
              carryWeightMax: 9999,
            });
          }

          const expectedError = {
            'config': {
              'RAW_MAT_WEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WEIGHT',
                    'name': 'config.RAW_MAT_WEIGHT',
                    'type': 'NUMBER_BETWEEN',
                    'max': 233,
                    'min': 0.1,
                  },
                },
              },
            },
          };

          let result = check('0');
          expect(result.errors).toEqual(expectedError);

          result = check('0.1');
          expect(result.errors).toEqual({});

          result = check('232');
          expect(result.errors).toEqual({});

          result = check('233');
          expect(result.errors).toEqual({});

          result = check('234');
          expect(result.errors).toEqual(expectedError);
        });
      });

      describe('when gripper 1 can carry more than the cobot', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_WEIGHT = 'foo';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            { model: 'TEST', carryWeight: 5, carryWeightMax: 5 },
          );

          expect(result.errors).toEqual({
            'config': {
              'RAW_MAT_WEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'RAW_MAT_WEIGHT',
                    'name': 'config.RAW_MAT_WEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be a number between 0.1 and the carry weight of the cobot', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
            product.config.RAW_MAT_WEIGHT = value;
            product.config.FIN_PRODUCT_WEIGHT = '0.1';

            const cobotConfig = configEasyloaderWithStaticGrid();

            cobotConfig.config.GR1_SUPPLIER = GRIPPER_SUPPLIERS[0].id;
            // GPD5010N-AL-A weighs 1.5 kg
            cobotConfig.config.GR1_TYPE = GRIPPER_SUPPLIERS[0].grippers[0].id;
            // 1x EB5010AL weighs 0.57 kg
            cobotConfig.config.GR1_ADDONS = [
              GRIPPER_SUPPLIERS[0].grippers[0].addons[0].id,
            ];

            cobotConfig.config.GR2_SUPPLIER = '';
            cobotConfig.config.GR2_TYPE = '';
            cobotConfig.config.GR2_ADDONS = [];

            return productValidator(product, cobotConfig, {
              model: 'TEST',
              carryWeight: 5,
              carryWeightMax: 5,
            });
          }

          const expectedError = {
            'config': {
              'RAW_MAT_WEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'RAW_MAT_WEIGHT',
                    'name': 'config.RAW_MAT_WEIGHT',
                    'type': 'NUMBER_BETWEEN',
                    'max': 2.93,
                    'min': 0.1,
                  },
                },
              },
            },
          };

          let result = check('0');
          expect(result.errors).toEqual(expectedError);

          result = check('0.1');
          expect(result.errors).toEqual({});

          result = check('2.92');
          expect(result.errors).toEqual({});

          result = check('2.93');
          expect(result.errors).toEqual({});

          result = check('2.94');
          expect(result.errors).toEqual(expectedError);
        });
      });
    });

    describe('FIN_PRODUCT_HEIGHT', () => {
      it('should be a number', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
        product.config.RAW_MAT_HEIGHT = '15';
        product.config.FIN_PRODUCT_HEIGHT = 'foo';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_HEIGHT': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'FIN_PRODUCT_HEIGHT',
                  'name': 'config.FIN_PRODUCT_HEIGHT',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should consider valid when RAW_MAT_HEIGHT is not a number', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_HEIGHT = 'aap';
          product.config.FIN_PRODUCT_HEIGHT = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toEqual(undefined);
      });

      it('should consider valid when RAW_MAT_HEIGHT is zero', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_HEIGHT = '0';
          product.config.FIN_PRODUCT_HEIGHT = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_HEIGHT).toEqual(undefined);
      });

      it('should be a lower or equal than the RAW_MAT_HEIGHT', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_HEIGHT = '15';
          product.config.FIN_PRODUCT_HEIGHT = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_HEIGHT': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'FIN_PRODUCT_HEIGHT',
                  'min': 0.1,
                  'max': 15,
                  'name': 'config.FIN_PRODUCT_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                },
              },
            },
          },
        });

        result = check('15');
        expect(result.errors).toEqual({});

        result = check('14');
        expect(result.errors).toEqual({});
      });
    });

    describe('FIN_PRODUCT_LENGTH', () => {
      it('should be a number', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
        product.config.RAW_MAT_LENGTH = '15';
        product.config.FIN_PRODUCT_LENGTH = 'foo';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_LENGTH': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'FIN_PRODUCT_LENGTH',
                  'name': 'config.FIN_PRODUCT_LENGTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should consider valid when RAW_MAT_LENGTH is not a number', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_LENGTH = 'aap';
          product.config.FIN_PRODUCT_LENGTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toEqual(undefined);
      });

      it('should consider valid when RAW_MAT_LENGTH is zero', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_LENGTH = '0';
          product.config.FIN_PRODUCT_LENGTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_LENGTH).toEqual(undefined);
      });

      it('should be a lower or equal than the RAW_MAT_LENGTH', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_LENGTH = '15';
          product.config.FIN_PRODUCT_LENGTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_LENGTH': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'FIN_PRODUCT_LENGTH',
                  'min': 0.1,
                  'max': 15,
                  'name': 'config.FIN_PRODUCT_LENGTH',
                  'type': 'NUMBER_BETWEEN',
                },
              },
            },
          },
        });

        result = check('15');
        expect(result.errors).toEqual({});

        result = check('14');
        expect(result.errors).toEqual({});
      });

      it('should consider all round products valid', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_LENGTH = '15';
          product.config.FIN_PRODUCT_LENGTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors).toEqual({});

        result = check('15');
        expect(result.errors).toEqual({});

        result = check('14');
        expect(result.errors).toEqual({});

        result = check('foo');
        expect(result.errors).toEqual({});
      });
    });

    describe('FIN_PRODUCT_WIDTH', () => {
      it('should be a number', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
        product.config.RAW_MAT_WIDTH = '15';
        product.config.FIN_PRODUCT_WIDTH = 'foo';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_WIDTH': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'FIN_PRODUCT_WIDTH',
                  'name': 'config.FIN_PRODUCT_WIDTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should consider valid when RAW_MAT_WIDTH is not a number', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_WIDTH = 'aap';
          product.config.FIN_PRODUCT_WIDTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toEqual(undefined);
      });

      it('should consider valid when RAW_MAT_WIDTH is zero', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_WIDTH = '0';
          product.config.FIN_PRODUCT_WIDTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_WIDTH).toEqual(undefined);
      });

      it('should be a lower or equal than the RAW_MAT_WIDTH', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_WIDTH = '15';
          product.config.FIN_PRODUCT_WIDTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_WIDTH': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'FIN_PRODUCT_WIDTH',
                  'min': 0.1,
                  'max': 15,
                  'name': 'config.FIN_PRODUCT_WIDTH',
                  'type': 'NUMBER_BETWEEN',
                },
              },
            },
          },
        });

        result = check('15');
        expect(result.errors).toEqual({});

        result = check('14');
        expect(result.errors).toEqual({});
      });

      it('should consider all round products valid', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_WIDTH = '15';
          product.config.FIN_PRODUCT_WIDTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors).toEqual({});

        result = check('15');
        expect(result.errors).toEqual({});

        result = check('14');
        expect(result.errors).toEqual({});

        result = check('foo');
        expect(result.errors).toEqual({});
      });
    });

    describe('FIN_PRODUCT_DIAMETER', () => {
      it('should be a number', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.RAW_MAT_DIAMETER = '15';
        product.config.FIN_PRODUCT_DIAMETER = 'foo';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_DIAMETER': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'FIN_PRODUCT_DIAMETER',
                  'name': 'config.FIN_PRODUCT_DIAMETER',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should consider valid when RAW_MAT_DIAMETER is not a number', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_DIAMETER = 'aap';
          product.config.FIN_PRODUCT_DIAMETER = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toEqual(undefined);
      });

      it('should consider valid when RAW_MAT_DIAMETER is zero', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_DIAMETER = '0';
          product.config.FIN_PRODUCT_DIAMETER = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toBe(undefined);

        result = check('15');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toEqual(undefined);

        result = check('aap');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toEqual(undefined);

        result = check('');
        expect(result.errors.config?.FIN_PRODUCT_DIAMETER).toEqual(undefined);
      });

      it('should be a lower or equal than the RAW_MAT_DIAMETER', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_DIAMETER = '15';
          product.config.FIN_PRODUCT_DIAMETER = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors).toEqual({
          'config': {
            'FIN_PRODUCT_DIAMETER': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'FIN_PRODUCT_DIAMETER',
                  'min': 0.1,
                  'max': 15,
                  'name': 'config.FIN_PRODUCT_DIAMETER',
                  'type': 'NUMBER_BETWEEN',
                },
              },
            },
          },
        });

        result = check('15');
        expect(result.errors).toEqual({});

        result = check('14');
        expect(result.errors).toEqual({});
      });

      it('should consider all rectangular products valid', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeCar();
          product.config.RAW_MAT_DIAMETER = '15';
          product.config.FIN_PRODUCT_DIAMETER = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('16');
        expect(result.errors).toEqual({});

        result = check('15');
        expect(result.errors).toEqual({});

        result = check('14');
        expect(result.errors).toEqual({});

        result = check('foo');
        expect(result.errors).toEqual({});
      });
    });

    describe('FIN_PRODUCT_WEIGHT', () => {
      describe('USE_SECOND_GRIPPER is true', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_WEIGHT = '15';
          product.config.FIN_PRODUCT_WEIGHT = 'foo';
          product.config.USE_SECOND_GRIPPER = true;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'FIN_PRODUCT_WEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FIN_PRODUCT_WEIGHT',
                    'name': 'config.FIN_PRODUCT_WEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should consider valid when RAW_MAT_WEIGHT is not a number', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = 'aap';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = true;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('16');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toBe(undefined);

          result = check('15');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('aap');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);
        });

        it('should consider valid when RAW_MAT_WEIGHT is zero', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = '0';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = true;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('16');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toBe(undefined);

          result = check('15');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('aap');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);
        });

        it('should be a lower or equal than the RAW_MAT_WEIGHT', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = '15';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = true;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('16');
          expect(result.errors).toEqual({
            'config': {
              'FIN_PRODUCT_WEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_PRODUCT_WEIGHT',
                    'min': 0.1,
                    'max': 15,
                    'name': 'config.FIN_PRODUCT_WEIGHT',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });

          result = check('15');
          expect(result.errors).toEqual({});

          result = check('14');
          expect(result.errors).toEqual({});
        });

        it('should be a lower or equal than the second gripper carry weight', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = '50';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = true;

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('26');
          expect(result.errors).toEqual({
            'config': {
              'FIN_PRODUCT_WEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_PRODUCT_WEIGHT',
                    'min': 0.1,
                    'max': 25,
                    'name': 'config.FIN_PRODUCT_WEIGHT',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });

          result = check('25');
          expect(result.errors).toEqual({});

          result = check('24');
          expect(result.errors).toEqual({});
        });
      });

      describe('USE_SECOND_GRIPPER is false', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.RAW_MAT_WEIGHT = '15';
          product.config.FIN_PRODUCT_WEIGHT = 'foo';
          product.config.USE_SECOND_GRIPPER = false;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'FIN_PRODUCT_WEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FIN_PRODUCT_WEIGHT',
                    'name': 'config.FIN_PRODUCT_WEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should consider valid when RAW_MAT_WEIGHT is not a number', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = 'aap';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = false;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('16');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toBe(undefined);

          result = check('15');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('aap');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);
        });

        it('should consider valid when RAW_MAT_WEIGHT is zero', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = '0';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = false;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('16');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toBe(undefined);

          result = check('15');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('aap');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);

          result = check('');
          expect(result.errors.config?.FIN_PRODUCT_WEIGHT).toEqual(undefined);
        });

        it('should be a lower or equal than the RAW_MAT_WEIGHT', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = '15';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = false;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('16');
          expect(result.errors).toEqual({
            'config': {
              'FIN_PRODUCT_WEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_PRODUCT_WEIGHT',
                    'min': 0.1,
                    'max': 15,
                    'name': 'config.FIN_PRODUCT_WEIGHT',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });

          result = check('15');
          expect(result.errors).toEqual({});

          result = check('14');
          expect(result.errors).toEqual({});
        });

        it('should be a lower or equal than the first gripper carry weight', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.RAW_MAT_WEIGHT = '250';
            product.config.FIN_PRODUCT_WEIGHT = value;
            product.config.USE_SECOND_GRIPPER = false;

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 900,
              carryWeightMax: 1000,
            });
          }

          /*
            The scenario we are testing is that the finished product cannot 
            be picked up by the first gripper. Which is impossible because 
            the raw material can already be picked up. 

            So this test is just for completeness sake.

            We remove the `RAW_MAT_WEIGHT` from the errors because of this.
          */

          let result = check('234');
          delete result.errors.config?.RAW_MAT_WEIGHT;
          expect(result.errors).toEqual({
            'config': {
              'FIN_PRODUCT_WEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_PRODUCT_WEIGHT',
                    'min': 0.1,
                    'max': 233,
                    'name': 'config.FIN_PRODUCT_WEIGHT',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });

          result = check('233');
          delete result.errors.config?.RAW_MAT_WEIGHT;
          expect(result.errors).toEqual({ config: {} });

          result = check('232');
          delete result.errors.config?.RAW_MAT_WEIGHT;
          expect(result.errors).toEqual({ config: {} });
        });
      });
    });

    describe('FIN_TOP_OFFSET', () => {
      describe('USE_SECOND_GRIPPER is true', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.STEPPED_AXIS = true;
          product.config.FIN_TOP_OFFSET = 'foo';
          product.config.USE_SECOND_GRIPPER = true;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'FIN_TOP_OFFSET': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FIN_TOP_OFFSET',
                    'name': 'config.FIN_TOP_OFFSET',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be a lower or equal than GR2_CLAW_HEIGHT - GR2_CLAW_DEPTH - 0.5', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = true;
            product.config.FIN_TOP_OFFSET = value;
            product.config.USE_SECOND_GRIPPER = true;
            product.config.GR2_CLAW_HEIGHT = '10';
            product.config.GR2_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({
            'config': {
              'FIN_TOP_OFFSET': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_TOP_OFFSET',
                    'min': 0,
                    'max': 7,
                    'name': 'config.FIN_TOP_OFFSET',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });
        });

        it('should when STEPPED_AXIS is false consider all things valid', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = false;
            product.config.FIN_TOP_OFFSET = value;
            product.config.USE_SECOND_GRIPPER = true;
            product.config.GR2_CLAW_HEIGHT = '10';
            product.config.GR2_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({});

          result = check('foo');
          expect(result.errors).toEqual({});
        });
      });

      describe('USE_SECOND_GRIPPER is false', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.STEPPED_AXIS = true;
          product.config.FIN_TOP_OFFSET = 'foo';
          product.config.USE_SECOND_GRIPPER = false;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'FIN_TOP_OFFSET': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FIN_TOP_OFFSET',
                    'name': 'config.FIN_TOP_OFFSET',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be a lower or equal than GR1_CLAW_HEIGHT - GR1_CLAW_DEPTH - 0.5', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = true;
            product.config.FIN_TOP_OFFSET = value;
            product.config.USE_SECOND_GRIPPER = false;
            product.config.GR1_CLAW_HEIGHT = '10';
            product.config.GR1_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({
            'config': {
              'FIN_TOP_OFFSET': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_TOP_OFFSET',
                    'min': 0,
                    'max': 7,
                    'name': 'config.FIN_TOP_OFFSET',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });
        });

        it('should when STEPPED_AXIS is false consider all things valid', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = false;
            product.config.FIN_TOP_OFFSET = value;
            product.config.USE_SECOND_GRIPPER = false;
            product.config.GR1_CLAW_HEIGHT = '10';
            product.config.GR1_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({});

          result = check('foo');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('FIN_BOTTOM_OFFSET', () => {
      describe('USE_SUB_SPINDLE is true', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.STEPPED_AXIS = true;
          product.config.FIN_BOTTOM_OFFSET = 'foo';
          product.config.USE_SUB_SPINDLE = true;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'FIN_BOTTOM_OFFSET': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FIN_BOTTOM_OFFSET',
                    'name': 'config.FIN_BOTTOM_OFFSET',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be a lower or equal than GR2_CLAW_HEIGHT - GR2_CLAW_DEPTH - 0.5', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = true;
            product.config.FIN_BOTTOM_OFFSET = value;
            product.config.USE_SUB_SPINDLE = true;
            product.config.SUB_CLAW_HEIGHT = '10';
            product.config.SUB_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({
            'config': {
              'FIN_BOTTOM_OFFSET': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_BOTTOM_OFFSET',
                    'min': 0,
                    'max': 7,
                    'name': 'config.FIN_BOTTOM_OFFSET',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });
        });

        it('should when STEPPED_AXIS is false consider all things valid', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = false;
            product.config.FIN_BOTTOM_OFFSET = value;
            product.config.USE_SUB_SPINDLE = true;
            product.config.SUB_CLAW_HEIGHT = '10';
            product.config.SUB_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({});

          result = check('foo');
          expect(result.errors).toEqual({});
        });
      });

      describe('USE_SUB_SPINDLE is false', () => {
        it('should be a number', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.STEPPED_AXIS = true;
          product.config.FIN_BOTTOM_OFFSET = 'foo';
          product.config.USE_SUB_SPINDLE = false;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'FIN_BOTTOM_OFFSET': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'FIN_BOTTOM_OFFSET',
                    'name': 'config.FIN_BOTTOM_OFFSET',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be a lower or equal than GR1_CLAW_HEIGHT - GR1_CLAW_DEPTH - 0.5', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = true;
            product.config.FIN_BOTTOM_OFFSET = value;
            product.config.USE_SUB_SPINDLE = false;
            product.config.MAIN_CLAW_HEIGHT = '10';
            product.config.MAIN_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({
            'config': {
              'FIN_BOTTOM_OFFSET': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'FIN_BOTTOM_OFFSET',
                    'min': 0,
                    'max': 7,
                    'name': 'config.FIN_BOTTOM_OFFSET',
                    'type': 'NUMBER_BETWEEN',
                  },
                },
              },
            },
          });
        });

        it('should when STEPPED_AXIS is false consider all things valid', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.STEPPED_AXIS = false;
            product.config.FIN_BOTTOM_OFFSET = value;
            product.config.USE_SUB_SPINDLE = false;
            product.config.MAIN_CLAW_HEIGHT = '10';
            product.config.MAIN_CLAW_DEPTH = '2.5';

            return productValidator(product, configEasyloaderWithStaticGrid(), {
              model: 'FAKE',
              carryWeight: 90,
              carryWeightMax: 100,
            });
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});

          result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({});

          result = check('foo');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('MACHINE_PICK_POSITION_INDEX', () => {
      describe('when MACHINE_TYPE is LATHE', () => {
        it('should require that the MACHINE_PICK_POSITION_INDEX is "0" and therefore set to the first position', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.MACHINE_PICK_POSITION_INDEX = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PICK_POSITION_INDEX': {
                'types': {
                  'LATHE_REQUIRES_FIRST_MACHINE_PICK_POSITION': {
                    'label': 'MACHINE_PICK_POSITION',
                    'name': 'config.MACHINE_PICK_POSITION_INDEX',
                    'type': 'LATHE_REQUIRES_FIRST_MACHINE_PICK_POSITION',
                  },
                },
              },
            },
          });
        });
      });

      describe('when MACHINE_TYPE is MILL', () => {
        it('should be required', () => {
          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';

                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MACHINE_PICK_POSITION_INDEX = '';

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PICK_POSITION_INDEX': {
                'types': {
                  'REQUIRED': {
                    'label': 'MACHINE_PICK_POSITION',
                    'name': 'config.MACHINE_PICK_POSITION_INDEX',
                    'type': 'REQUIRED',
                  },
                },
              },
            },
          });
        });

        it('should be set to a valid index', () => {
          function check(value: string) {
            const cobotConfig = configEasyloaderWithPinnedGrid();
            cobotConfig.config.MACHINE_TYPE = 'MILL';
            cobotConfig.config.MACHINE_PICK_POSITIONS = [
              { name: 'A', position: [1, 2, 3, 4, 5, 6] },
              { name: 'B', position: [1, 2, 3, 4, 5, 6] },
              { name: 'C', position: [1, 2, 3, 4, 5, 6] },
            ];

                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.MACHINE_PICK_POSITION_INDEX = value;

            return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
          }

          let result = check('-1');
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PICK_POSITION_INDEX': {
                'types': {
                  'UNDEFINED_PICK_POSITION': {
                    'label': 'MACHINE_PICK_POSITION',
                    'name': 'config.MACHINE_PICK_POSITION_INDEX',
                    'type': 'UNDEFINED_PICK_POSITION',
                  },
                },
              },
            },
          });

          result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PICK_POSITION_INDEX': {
                'types': {
                  'UNDEFINED_PICK_POSITION': {
                    'label': 'MACHINE_PICK_POSITION',
                    'name': 'config.MACHINE_PICK_POSITION_INDEX',
                    'type': 'UNDEFINED_PICK_POSITION',
                  },
                },
              },
            },
          });
        });
      });
    });

    describe('MACHINE_PLACE_POSITION_INDEX', () => {
      describe('when MACHINE_TYPE is LATHE', () => {
        it('should require that the MACHINE_PLACE_POSITION_INDEX is "0" and therefore set to the first position', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.MACHINE_PLACE_POSITION_INDEX = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PLACE_POSITION_INDEX': {
                'types': {
                  'LATHE_REQUIRES_FIRST_MACHINE_PLACE_POSITION': {
                    'label': 'MACHINE_PLACE_POSITION',
                    'name': 'config.MACHINE_PLACE_POSITION_INDEX',
                    'type': 'LATHE_REQUIRES_FIRST_MACHINE_PLACE_POSITION',
                  },
                },
              },
            },
          });
        });
      });

      describe('when MACHINE_TYPE is MILL', () => {
        it('should be required', () => {
          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.MACHINE_TYPE = 'MILL';

                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MACHINE_PLACE_POSITION_INDEX = '';

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PLACE_POSITION_INDEX': {
                'types': {
                  'REQUIRED': {
                    'label': 'MACHINE_PLACE_POSITION',
                    'name': 'config.MACHINE_PLACE_POSITION_INDEX',
                    'type': 'REQUIRED',
                  },
                },
              },
            },
          });
        });

        it('should be set to a valid index', () => {
          function check(value: string) {
            const cobotConfig = configEasyloaderWithPinnedGrid();
            cobotConfig.config.MACHINE_TYPE = 'MILL';
            cobotConfig.config.MACHINE_PLACE_POSITIONS = [
              { name: 'A', position: [1, 2, 3, 4, 5, 6] },
              { name: 'B', position: [1, 2, 3, 4, 5, 6] },
              { name: 'C', position: [1, 2, 3, 4, 5, 6] },
            ];

                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.MACHINE_PLACE_POSITION_INDEX = value;

            return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
          }

          let result = check('-1');
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PLACE_POSITION_INDEX': {
                'types': {
                  'UNDEFINED_PLACE_POSITION': {
                    'label': 'MACHINE_PLACE_POSITION',
                    'name': 'config.MACHINE_PLACE_POSITION_INDEX',
                    'type': 'UNDEFINED_PLACE_POSITION',
                  },
                },
              },
            },
          });

          result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({
            'config': {
              'MACHINE_PLACE_POSITION_INDEX': {
                'types': {
                  'UNDEFINED_PLACE_POSITION': {
                    'label': 'MACHINE_PLACE_POSITION',
                    'name': 'config.MACHINE_PLACE_POSITION_INDEX',
                    'type': 'UNDEFINED_PLACE_POSITION',
                  },
                },
              },
            },
          });
        });
      });
    });

    describe('MACHINE_PICK_HEIGHT_OFFSET', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.MACHINE_PICK_HEIGHT_OFFSET = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PICK_HEIGHT_OFFSET': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'MACHINE_PICK_HEIGHT_OFFSET',
                  'name': 'config.MACHINE_PICK_HEIGHT_OFFSET',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MACHINE_PICK_HEIGHT_OFFSET = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PICK_HEIGHT_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PICK_HEIGHT_OFFSET',
                  'name': 'config.MACHINE_PICK_HEIGHT_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PICK_HEIGHT_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PICK_HEIGHT_OFFSET',
                  'name': 'config.MACHINE_PICK_HEIGHT_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('MACHINE_PICK_DEPTH_OFFSET', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.MACHINE_PICK_DEPTH_OFFSET = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PICK_DEPTH_OFFSET': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'MACHINE_PICK_DEPTH_OFFSET',
                  'name': 'config.MACHINE_PICK_DEPTH_OFFSET',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MACHINE_PICK_DEPTH_OFFSET = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PICK_DEPTH_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PICK_DEPTH_OFFSET',
                  'name': 'config.MACHINE_PICK_DEPTH_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PICK_DEPTH_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PICK_DEPTH_OFFSET',
                  'name': 'config.MACHINE_PICK_DEPTH_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('MACHINE_PLACE_HEIGHT_OFFSET', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.MACHINE_PLACE_HEIGHT_OFFSET = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PLACE_HEIGHT_OFFSET': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'MACHINE_PLACE_HEIGHT_OFFSET',
                  'name': 'config.MACHINE_PLACE_HEIGHT_OFFSET',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MACHINE_PLACE_HEIGHT_OFFSET = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PLACE_HEIGHT_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PLACE_HEIGHT_OFFSET',
                  'name': 'config.MACHINE_PLACE_HEIGHT_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PLACE_HEIGHT_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PLACE_HEIGHT_OFFSET',
                  'name': 'config.MACHINE_PLACE_HEIGHT_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('MACHINE_PLACE_DEPTH_OFFSET', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.MACHINE_PLACE_DEPTH_OFFSET = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PLACE_DEPTH_OFFSET': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'MACHINE_PLACE_DEPTH_OFFSET',
                  'name': 'config.MACHINE_PLACE_DEPTH_OFFSET',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MACHINE_PLACE_DEPTH_OFFSET = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PLACE_DEPTH_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PLACE_DEPTH_OFFSET',
                  'name': 'config.MACHINE_PLACE_DEPTH_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'MACHINE_PLACE_DEPTH_OFFSET': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MACHINE_PLACE_DEPTH_OFFSET',
                  'name': 'config.MACHINE_PLACE_DEPTH_OFFSET',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('GR1_CLAW_HEIGHT', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.GR1_CLAW_HEIGHT = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'GR1_CLAW_HEIGHT': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'GR1_CLAW_HEIGHT',
                  'name': 'config.GR1_CLAW_HEIGHT',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 10 and 150', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.GR1_CLAW_HEIGHT = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('9');
        expect(result.errors).toEqual({
          'config': {
            'GR1_CLAW_HEIGHT': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'GR1_CLAW_HEIGHT',
                  'name': 'config.GR1_CLAW_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                  'min': 10,
                  'max': 150,
                },
              },
            },
          },
        });

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('149');
        expect(result.errors).toEqual({});

        result = check('150');
        expect(result.errors).toEqual({});

        result = check('151');
        expect(result.errors).toEqual({
          'config': {
            'GR1_CLAW_HEIGHT': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'GR1_CLAW_HEIGHT',
                  'name': 'config.GR1_CLAW_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                  'min': 10,
                  'max': 150,
                },
              },
            },
          },
        });
      });
    });

    describe('GR1_CLAW_DEPTH', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.GR1_CLAW_DEPTH = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'GR1_CLAW_DEPTH': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'GR1_CLAW_DEPTH',
                  'name': 'config.GR1_CLAW_DEPTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 1 and 100', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.GR1_CLAW_DEPTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('0');
        expect(result.errors).toEqual({
          'config': {
            'GR1_CLAW_DEPTH': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'GR1_CLAW_DEPTH',
                  'name': 'config.GR1_CLAW_DEPTH',
                  'type': 'NUMBER_BETWEEN',
                  'min': 1,
                  'max': 100,
                },
              },
            },
          },
        });

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('99');
        expect(result.errors).toEqual({});

        result = check('100');
        expect(result.errors).toEqual({});

        result = check('101');
        expect(result.errors).toEqual({
          'config': {
            'GR1_CLAW_DEPTH': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'GR1_CLAW_DEPTH',
                  'name': 'config.GR1_CLAW_DEPTH',
                  'type': 'NUMBER_BETWEEN',
                  'min': 1,
                  'max': 100,
                },
              },
            },
          },
        });
      });
    });

    describe('GR2_CLAW_HEIGHT', () => {
      describe('USE_SECOND_GRIPPER is true', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.GR2_CLAW_HEIGHT = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'GR2_CLAW_HEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'GR2_CLAW_HEIGHT',
                    'name': 'config.GR2_CLAW_HEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 10 and 150', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.GR2_CLAW_HEIGHT = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('9');
          expect(result.errors).toEqual({
            'config': {
              'GR2_CLAW_HEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'GR2_CLAW_HEIGHT',
                    'name': 'config.GR2_CLAW_HEIGHT',
                    'type': 'NUMBER_BETWEEN',
                    'min': 10,
                    'max': 150,
                  },
                },
              },
            },
          });

          result = check('10');
          expect(result.errors).toEqual({});

          result = check('149');
          expect(result.errors).toEqual({});

          result = check('150');
          expect(result.errors).toEqual({});

          result = check('151');
          expect(result.errors).toEqual({
            'config': {
              'GR2_CLAW_HEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'GR2_CLAW_HEIGHT',
                    'name': 'config.GR2_CLAW_HEIGHT',
                    'type': 'NUMBER_BETWEEN',
                    'min': 10,
                    'max': 150,
                  },
                },
              },
            },
          });
        });
      });

      describe('USE_SECOND_GRIPPER is false', () => {
        it('should consider every value valid when there is no sub spindle', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.USE_SECOND_GRIPPER = false;
            product.config.GR2_CLAW_HEIGHT = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('');
          expect(result.errors).toEqual({});

          result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('99');
          expect(result.errors).toEqual({});

          result = check('100');
          expect(result.errors).toEqual({});

          result = check('101');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('GR2_CLAW_DEPTH', () => {
      describe('USE_SECOND_GRIPPER is true', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.GR2_CLAW_DEPTH = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'GR2_CLAW_DEPTH': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'GR2_CLAW_DEPTH',
                    'name': 'config.GR2_CLAW_DEPTH',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 1 and 100', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.GR2_CLAW_DEPTH = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('0');
          expect(result.errors).toEqual({
            'config': {
              'GR2_CLAW_DEPTH': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'GR2_CLAW_DEPTH',
                    'name': 'config.GR2_CLAW_DEPTH',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 100,
                  },
                },
              },
            },
          });

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('99');
          expect(result.errors).toEqual({});

          result = check('100');
          expect(result.errors).toEqual({});

          result = check('101');
          expect(result.errors).toEqual({
            'config': {
              'GR2_CLAW_DEPTH': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'GR2_CLAW_DEPTH',
                    'name': 'config.GR2_CLAW_DEPTH',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 100,
                  },
                },
              },
            },
          });
        });
      });

      describe('USE_SECOND_GRIPPER is false', () => {
        it('should consider every value valid when there is no sub spindle', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.GR2_CLAW_DEPTH = value;
            product.config.USE_SECOND_GRIPPER = false;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('');
          expect(result.errors).toEqual({});

          result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('99');
          expect(result.errors).toEqual({});

          result = check('100');
          expect(result.errors).toEqual({});

          result = check('101');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('MAIN_CLAW_HEIGHT', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.MAIN_CLAW_HEIGHT = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'MAIN_CLAW_HEIGHT': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'MAIN_CLAW_HEIGHT',
                  'name': 'config.MAIN_CLAW_HEIGHT',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 10 and 150', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MAIN_CLAW_HEIGHT = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        const expectedError = {
          'config': {
            'MAIN_CLAW_HEIGHT': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MAIN_CLAW_HEIGHT',
                  'name': 'config.MAIN_CLAW_HEIGHT',
                  'type': 'NUMBER_BETWEEN',
                  'min': 10,
                  'max': 150,
                },
              },
            },
          },
        };

        let result = check('9');
        expect(result.errors).toEqual(expectedError);

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('149');
        expect(result.errors).toEqual({});

        result = check('150');
        expect(result.errors).toEqual({});

        result = check('151');
        expect(result.errors).toEqual(expectedError);
      });
    });

    describe('MAIN_CLAW_DEPTH', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.MAIN_CLAW_DEPTH = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'MAIN_CLAW_DEPTH': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'MAIN_CLAW_DEPTH',
                  'name': 'config.MAIN_CLAW_DEPTH',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between 1 and 100', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.MAIN_CLAW_DEPTH = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('0');
        expect(result.errors).toEqual({
          'config': {
            'MAIN_CLAW_DEPTH': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MAIN_CLAW_DEPTH',
                  'name': 'config.MAIN_CLAW_DEPTH',
                  'type': 'NUMBER_BETWEEN',
                  'min': 1,
                  'max': 100,
                },
              },
            },
          },
        });

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('99');
        expect(result.errors).toEqual({});

        result = check('100');
        expect(result.errors).toEqual({});

        result = check('101');
        expect(result.errors).toEqual({
          'config': {
            'MAIN_CLAW_DEPTH': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'MAIN_CLAW_DEPTH',
                  'name': 'config.MAIN_CLAW_DEPTH',
                  'type': 'NUMBER_BETWEEN',
                  'min': 1,
                  'max': 100,
                },
              },
            },
          },
        });
      });
    });

    describe('SUB_CLAW_HEIGHT', () => {
      describe('USE_SUB_SPINDLE is true', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.SUB_CLAW_HEIGHT = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'SUB_CLAW_HEIGHT': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'SUB_CLAW_HEIGHT',
                    'name': 'config.SUB_CLAW_HEIGHT',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 10 and 150', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.SUB_CLAW_HEIGHT = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('9');
          expect(result.errors).toEqual({
            'config': {
              'SUB_CLAW_HEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'SUB_CLAW_HEIGHT',
                    'name': 'config.SUB_CLAW_HEIGHT',
                    'type': 'NUMBER_BETWEEN',
                    'min': 10,
                    'max': 150,
                  },
                },
              },
            },
          });

          result = check('10');
          expect(result.errors).toEqual({});

          result = check('149');
          expect(result.errors).toEqual({});

          result = check('150');
          expect(result.errors).toEqual({});

          result = check('151');
          expect(result.errors).toEqual({
            'config': {
              'SUB_CLAW_HEIGHT': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'SUB_CLAW_HEIGHT',
                    'name': 'config.SUB_CLAW_HEIGHT',
                    'type': 'NUMBER_BETWEEN',
                    'min': 10,
                    'max': 150,
                  },
                },
              },
            },
          });
        });
      });

      describe('USE_SUB_SPINDLE is false', () => {
        it('should consider every value valid when there is no sub spindle', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.USE_SUB_SPINDLE = false;
            product.config.SUB_CLAW_HEIGHT = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('');
          expect(result.errors).toEqual({});

          result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('99');
          expect(result.errors).toEqual({});

          result = check('100');
          expect(result.errors).toEqual({});

          result = check('101');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('SUB_CLAW_DEPTH', () => {
      describe('USE_SUB_SPINDLE is true', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.SUB_CLAW_DEPTH = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'SUB_CLAW_DEPTH': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'SUB_CLAW_DEPTH',
                    'name': 'config.SUB_CLAW_DEPTH',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 1 and 100', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.SUB_CLAW_DEPTH = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('0');
          expect(result.errors).toEqual({
            'config': {
              'SUB_CLAW_DEPTH': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'SUB_CLAW_DEPTH',
                    'name': 'config.SUB_CLAW_DEPTH',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 100,
                  },
                },
              },
            },
          });

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('99');
          expect(result.errors).toEqual({});

          result = check('100');
          expect(result.errors).toEqual({});

          result = check('101');
          expect(result.errors).toEqual({
            'config': {
              'SUB_CLAW_DEPTH': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'SUB_CLAW_DEPTH',
                    'name': 'config.SUB_CLAW_DEPTH',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 100,
                  },
                },
              },
            },
          });
        });
      });

      describe('USE_SUB_SPINDLE is false', () => {
        it('should consider every value valid when there is no sub spindle', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.SUB_CLAW_DEPTH = value;
            product.config.USE_SUB_SPINDLE = false;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('');
          expect(result.errors).toEqual({});

          result = check('0');
          expect(result.errors).toEqual({});

          result = check('1');
          expect(result.errors).toEqual({});

          result = check('99');
          expect(result.errors).toEqual({});

          result = check('100');
          expect(result.errors).toEqual({});

          result = check('101');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('DRAWER_PICK_OFFSET_X', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.DRAWER_PICK_OFFSET_X = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_X': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'DRAWER_PICK_OFFSET_X',
                  'name': 'config.DRAWER_PICK_OFFSET_X',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_PICK_OFFSET_X = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_X': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PICK_OFFSET_X',
                  'name': 'config.DRAWER_PICK_OFFSET_X',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_X': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PICK_OFFSET_X',
                  'name': 'config.DRAWER_PICK_OFFSET_X',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('DRAWER_PICK_OFFSET_Y', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.DRAWER_PICK_OFFSET_Y = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_Y': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'DRAWER_PICK_OFFSET_Y',
                  'name': 'config.DRAWER_PICK_OFFSET_Y',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_PICK_OFFSET_Y = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_Y': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PICK_OFFSET_Y',
                  'name': 'config.DRAWER_PICK_OFFSET_Y',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_Y': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PICK_OFFSET_Y',
                  'name': 'config.DRAWER_PICK_OFFSET_Y',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('DRAWER_PICK_OFFSET_Z', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.DRAWER_PICK_OFFSET_Z = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_Z': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'DRAWER_PICK_OFFSET_Z',
                  'name': 'config.DRAWER_PICK_OFFSET_Z',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_PICK_OFFSET_Z = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-12');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_Z': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PICK_OFFSET_Z',
                  'name': 'config.DRAWER_PICK_OFFSET_Z',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PICK_OFFSET_Z': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PICK_OFFSET_Z',
                  'name': 'config.DRAWER_PICK_OFFSET_Z',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('DRAWER_PLACE_OFFSET_X', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.DRAWER_PLACE_OFFSET_X = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_X': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'DRAWER_PLACE_OFFSET_X',
                  'name': 'config.DRAWER_PLACE_OFFSET_X',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_PLACE_OFFSET_X = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_X': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PLACE_OFFSET_X',
                  'name': 'config.DRAWER_PLACE_OFFSET_X',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_X': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PLACE_OFFSET_X',
                  'name': 'config.DRAWER_PLACE_OFFSET_X',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('DRAWER_PLACE_OFFSET_Y', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.DRAWER_PLACE_OFFSET_Y = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_Y': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'DRAWER_PLACE_OFFSET_Y',
                  'name': 'config.DRAWER_PLACE_OFFSET_Y',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_PLACE_OFFSET_Y = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_Y': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PLACE_OFFSET_Y',
                  'name': 'config.DRAWER_PLACE_OFFSET_Y',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_Y': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PLACE_OFFSET_Y',
                  'name': 'config.DRAWER_PLACE_OFFSET_Y',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('DRAWER_PLACE_OFFSET_Z', () => {
      it('should be required', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.DRAWER_PLACE_OFFSET_Z = '';

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_Z': {
              'types': {
                'NOT_A_NUMBER': {
                  'label': 'DRAWER_PLACE_OFFSET_Z',
                  'name': 'config.DRAWER_PLACE_OFFSET_Z',
                  'type': 'NOT_A_NUMBER',
                },
              },
            },
          },
        });
      });

      it('should be between -10 and 10', () => {
        function check(value: string) {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_PLACE_OFFSET_Z = value;

          return productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );
        }

        let result = check('-11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_Z': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PLACE_OFFSET_Z',
                  'name': 'config.DRAWER_PLACE_OFFSET_Z',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });

        result = check('-10');
        expect(result.errors).toEqual({});

        result = check('-9');
        expect(result.errors).toEqual({});

        result = check('0');
        expect(result.errors).toEqual({});

        result = check('1');
        expect(result.errors).toEqual({});

        result = check('9');
        expect(result.errors).toEqual({});

        result = check('10');
        expect(result.errors).toEqual({});

        result = check('11');
        expect(result.errors).toEqual({
          'config': {
            'DRAWER_PLACE_OFFSET_Z': {
              'types': {
                'NUMBER_BETWEEN': {
                  'label': 'DRAWER_PLACE_OFFSET_Z',
                  'name': 'config.DRAWER_PLACE_OFFSET_Z',
                  'type': 'NUMBER_BETWEEN',
                  'min': -10,
                  'max': 10,
                },
              },
            },
          },
        });
      });
    });

    describe('POSITIONING_PIN_DIAMETER', () => {
      describe('with pinned grid', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.POSITIONING_PIN_DIAMETER = '';

          const result = productValidator(
            product,
            configEasyloaderWithPinnedGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'POSITIONING_PIN_DIAMETER': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'POSITIONING_PIN_DIAMETER',
                    'name': 'config.POSITIONING_PIN_DIAMETER',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 8 and 20', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.POSITIONING_PIN_DIAMETER = value;

            return productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );
          }

          let result = check('7');
          expect(result.errors).toEqual({
            'config': {
              'POSITIONING_PIN_DIAMETER': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'POSITIONING_PIN_DIAMETER',
                    'name': 'config.POSITIONING_PIN_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'min': 8,
                    'max': 20,
                  },
                },
              },
            },
          });

          result = check('8');
          expect(result.errors).toEqual({});

          result = check('19');
          expect(result.errors).toEqual({});

          result = check('20');
          expect(result.errors).toEqual({});

          result = check('21');
          expect(result.errors).toEqual({
            'config': {
              'POSITIONING_PIN_DIAMETER': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'POSITIONING_PIN_DIAMETER',
                    'name': 'config.POSITIONING_PIN_DIAMETER',
                    'type': 'NUMBER_BETWEEN',
                    'min': 8,
                    'max': 20,
                  },
                },
              },
            },
          });
        });
      });

      describe('with static grid', () => {
        it('should not be required', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.POSITIONING_PIN_DIAMETER = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('7');
          expect(result.errors).toEqual({});

          result = check('8');
          expect(result.errors).toEqual({});

          result = check('19');
          expect(result.errors).toEqual({});

          result = check('20');
          expect(result.errors).toEqual({});

          result = check('21');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('USE_SECOND_GRIPPER', () => {
      describe('when config HAS_SECOND_GRIPPER is true', () => {
        it('should allow a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SECOND_GRIPPER = true;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.HAS_SECOND_GRIPPER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });

        it('should allow not using a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SECOND_GRIPPER = false;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.HAS_SECOND_GRIPPER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });

      describe('when config HAS_SECOND_GRIPPER is false', () => {
        it('should not allow a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SECOND_GRIPPER = true;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.HAS_SECOND_GRIPPER = false;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'USE_SECOND_GRIPPER': {
                'types': {
                  'SECOND_GRIPPER_REQUIRED': {
                    'label': 'USE_SECOND_GRIPPER',
                    'name': 'config.USE_SECOND_GRIPPER',
                    'type': 'SECOND_GRIPPER_REQUIRED',
                  },
                },
              },
            },
          });
        });

        it('should allow not using a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SECOND_GRIPPER = false;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.HAS_SECOND_GRIPPER = false;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });
    });

    describe('USE_SUB_SPINDLE', () => {
      describe('when config MACHINE_HAS_SUB_SPINDLE is true', () => {
        it('should allow a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SUB_SPINDLE = true;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });

        it('should allow not using a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SUB_SPINDLE = false;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });

      describe('when config MACHINE_HAS_SUB_SPINDLE is false', () => {
        it('should not allow a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SUB_SPINDLE = true;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'USE_SUB_SPINDLE': {
                'types': {
                  'SUB_SPINDLE_REQUIRED': {
                    'label': 'USE_SUB_SPINDLE',
                    'name': 'config.USE_SUB_SPINDLE',
                    'type': 'SUB_SPINDLE_REQUIRED',
                  },
                },
              },
            },
          });
        });

        it('should allow not using a second gripper', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.USE_SUB_SPINDLE = false;

          const cobotConfig = configEasyloaderWithPinnedGrid();
          cobotConfig.config.MACHINE_HAS_SUB_SPINDLE = false;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });
      });
    });

    describe('DRAWER_AMOUNT_PRODUCT_X', () => {
      describe('with statc grid', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_AMOUNT_PRODUCT_X = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'DRAWER_AMOUNT_PRODUCT_X': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_X',
                    'name': 'config.DRAWER_AMOUNT_PRODUCT_X',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 1 and the cobot config AMOUNT_SQUARES_X_AXIS', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.DRAWER_AMOUNT_PRODUCT_X = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({
            'config': {
              'DRAWER_AMOUNT_PRODUCT_X': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_X',
                    'name': 'config.DRAWER_AMOUNT_PRODUCT_X',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 5,
                  },
                },
              },
            },
          });
        });
      });

      describe('with pinned grid', () => {
        it('should not be required', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.DRAWER_AMOUNT_PRODUCT_X = value;

            return productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('DRAWER_AMOUNT_PRODUCT_Y', () => {
      describe('with statc grid', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.DRAWER_AMOUNT_PRODUCT_Y = '';

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({
            'config': {
              'DRAWER_AMOUNT_PRODUCT_Y': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_Y',
                    'name': 'config.DRAWER_AMOUNT_PRODUCT_Y',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 1 and the cobot config AMOUNT_SQUARES_Y_AXIS', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.DRAWER_AMOUNT_PRODUCT_Y = value;

            return productValidator(
              product,
              configEasyloaderWithStaticGrid(),
              COBOTS[2],
            );
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({
            'config': {
              'DRAWER_AMOUNT_PRODUCT_Y': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_Y',
                    'name': 'config.DRAWER_AMOUNT_PRODUCT_Y',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 4,
                  },
                },
              },
            },
          });
        });
      });

      describe('with pinned grid', () => {
        it('should not be required', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.DRAWER_AMOUNT_PRODUCT_Y = value;

            return productValidator(
              product,
              configEasyloaderWithPinnedGrid(),
              COBOTS[2],
            );
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('SECOND_DRAWER_AMOUNT_PRODUCT_X', () => {
      describe('when placing on second drawer', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
          product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = '';

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'SECOND_DRAWER_AMOUNT_PRODUCT_X': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_X',
                    'name': 'config.SECOND_DRAWER_AMOUNT_PRODUCT_X',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 1 and the cobot config EASY_LOADER.SECOND_DRAWER.AMOUNT_SQUARES_X_AXIS', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
            product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = value;

            const cobotConfig = configEasyloaderWithStaticGrid();
            cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

            return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({
            'config': {
              'SECOND_DRAWER_AMOUNT_PRODUCT_X': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_X',
                    'name': 'config.SECOND_DRAWER_AMOUNT_PRODUCT_X',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 5,
                  },
                },
              },
            },
          });
        });
      });

      describe('when not placing on a second drawer', () => {
        it('should not be required', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;
            product.config.SECOND_DRAWER_AMOUNT_PRODUCT_X = value;

            const cobotConfig = configEasyloaderWithStaticGrid();
            cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

            return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});
        });
      });
    });

    describe('SECOND_DRAWER_AMOUNT_PRODUCT_Y', () => {
      describe('when placing on second drawer', () => {
        it('should be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
          product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = '';

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'SECOND_DRAWER_AMOUNT_PRODUCT_Y': {
                'types': {
                  'NOT_A_NUMBER': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_Y',
                    'name': 'config.SECOND_DRAWER_AMOUNT_PRODUCT_Y',
                    'type': 'NOT_A_NUMBER',
                  },
                },
              },
            },
          });
        });

        it('should be between 1 and the cobot config EASY_LOADER.SECOND_DRAWER.AMOUNT_SQUARES_Y_AXIS', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
            product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = value;

            const cobotConfig = configEasyloaderWithStaticGrid();
            cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

            return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({
            'config': {
              'SECOND_DRAWER_AMOUNT_PRODUCT_Y': {
                'types': {
                  'NUMBER_BETWEEN': {
                    'label': 'DRAWER_AMOUNT_PRODUCT_Y',
                    'name': 'config.SECOND_DRAWER_AMOUNT_PRODUCT_Y',
                    'type': 'NUMBER_BETWEEN',
                    'min': 1,
                    'max': 4,
                  },
                },
              },
            },
          });
        });
      });

      describe('when not placing on a second drawer', () => {
        it('should not be required', () => {
          function check(value: string) {
                      const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
            product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;
            product.config.SECOND_DRAWER_AMOUNT_PRODUCT_Y = value;

            const cobotConfig = configEasyloaderWithStaticGrid();
            cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

            return productValidator(product, cobotConfig, COBOTS[2], toolWeight);
          }

          let result = check('1');
          expect(result.errors).toEqual({});

          result = check('2');
          expect(result.errors).toEqual({});

          result = check('3');
          expect(result.errors).toEqual({});

          result = check('4');
          expect(result.errors).toEqual({});

          result = check('5');
          expect(result.errors).toEqual({});

          result = check('6');
          expect(result.errors).toEqual({});
        });
      });
    });

    // describe('REACH_TESTED', () => {
    //   it('should be valid when the reach is tested and at least one spot can be reached', () => {
    //               const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
    //     product.config.REACH_TESTED = true;
    //     product.config.SPOT_STATUS = [false, true];

    //     const result = productValidator(
    //       product,
    //       configEasyloaderWithStaticGrid(),
    //       COBOTS[2],
    //     );

    //     expect(result.errors).toEqual({});
    //   });

    //   it('should be considered invalid when reach has not been tested', () => {
    //               const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
    //     product.config.REACH_TESTED = false;

    //     const result = productValidator(
    //       product,
    //       configEasyloaderWithStaticGrid(),
    //       COBOTS[2],
    //     );

    //     expect(result.errors).toEqual({
    //       'config': {
    //         'REACH_TESTED': {
    //           'types': {
    //             'REACH_TEST_REQUIRED': {
    //               'label': 'REACH_TEST',
    //               'name': 'config.REACH_TESTED',
    //               'type': 'REACH_TEST_REQUIRED',
    //             },
    //           },
    //         },
    //       },
    //     });
    //   });

      it('should be considered invalid when no spot can be reached', () => {
                  const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
        product.config.REACH_TESTED = true;
        product.config.SPOT_STATUS = [false, false];

        const result = productValidator(
          product,
          configEasyloaderWithStaticGrid(),
          COBOTS[2],
        );

        expect(result.errors).toEqual({
          'config': {
            'REACH_TESTED': {
              'types': {
                'NO_SPOT_CAN_BE_REACHED': {
                  'label': 'REACH_TEST',
                  'name': 'config.REACH_TESTED',
                  'type': 'NO_SPOT_CAN_BE_REACHED',
                },
              },
            },
          },
        });
      });
    });

    describe('SECOND_DRAWER_REACH_TESTED', () => {
      describe('when placing on second drawer', () => {
        it('should be valid when the reach is tested and at least one spot can be reached', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
          product.config.SECOND_DRAWER_REACH_TESTED = true;
          product.config.SECOND_DRAWER_SPOT_STATUS = [false, true];

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({});
        });

        it('should be considered invalid when reach has not been tested', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
          product.config.SECOND_DRAWER_REACH_TESTED = false;

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'SECOND_DRAWER_REACH_TESTED': {
                'types': {
                  'REACH_TEST_REQUIRED': {
                    'label': 'REACH_TEST',
                    'name': 'config.SECOND_DRAWER_REACH_TESTED',
                    'type': 'REACH_TEST_REQUIRED',
                  },
                },
              },
            },
          });
        });

        it('should be considered invalid when no spot can be reached', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = true;
          product.config.SECOND_DRAWER_REACH_TESTED = true;
          product.config.SECOND_DRAWER_SPOT_STATUS = [false, false];

          const cobotConfig = configEasyloaderWithStaticGrid();
          cobotConfig.config.EASY_LOADER.HAS_SECOND_DRAWER = true;

          const result = productValidator(product, cobotConfig, COBOTS[2], toolWeight);

          expect(result.errors).toEqual({
            'config': {
              'SECOND_DRAWER_REACH_TESTED': {
                'types': {
                  'NO_SPOT_CAN_BE_REACHED': {
                    'label': 'REACH_TEST',
                    'name': 'config.SECOND_DRAWER_REACH_TESTED',
                    'type': 'NO_SPOT_CAN_BE_REACHED',
                  },
                },
              },
            },
          });
        });
      });

      describe('when not placing on second drawer', () => {
        it('should be valid when the reach is tested', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;
          product.config.SECOND_DRAWER_REACH_TESTED = true;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({});
        });

        it('should not be required', () => {
                    const toolWeightStr = useToolWeight() ?? "0";
          const toolWeight = parseFloat(toolWeightStr);

          const product = makeWrench();
          product.config.PLACE_FINISHED_PRODUCT_ON_SECOND_DRAWER = false;
          product.config.SECOND_DRAWER_REACH_TESTED = false;

          const result = productValidator(
            product,
            configEasyloaderWithStaticGrid(),
            COBOTS[2],
          );

          expect(result.errors).toEqual({});
        });
      });
    });
  });
});
