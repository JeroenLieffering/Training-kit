import { makeWrench } from '../fixtures/product-fixtures';
import {
  calculatePinDistances,
  calculatePinPairsRoundMaterial,
  calculatePinTripletsRectMaterial,
  getLabelsForPosition,
} from './pin-service';

describe('service: Pin', () => {
  describe('calculatePinPairsRoundMaterial', () => {
    it('should work when product diameter is 100 and pin diameter is 8', () => {
      expect(
        calculatePinPairsRoundMaterial({
          pinDiameter: 8,
          productDiameter: 100,
          productMargin: 15,
        }),
      ).toEqual([
        [
          {
            'col': 1,
            'row': 0,
          },
          {
            'col': 3,
            'row': 0,
          },
        ],
        [
          {
            'col': 7,
            'row': 0,
          },
          {
            'col': 9,
            'row': 0,
          },
        ],
        [
          {
            'col': 13,
            'row': 0,
          },
          {
            'col': 15,
            'row': 0,
          },
        ],
        [
          {
            'col': 19,
            'row': 0,
          },
          {
            'col': 21,
            'row': 0,
          },
        ],
        [
          {
            'col': 25,
            'row': 0,
          },
          {
            'col': 27,
            'row': 0,
          },
        ],
        [
          {
            'col': 1,
            'row': 5,
          },
          {
            'col': 3,
            'row': 5,
          },
        ],
        [
          {
            'col': 7,
            'row': 5,
          },
          {
            'col': 9,
            'row': 5,
          },
        ],
        [
          {
            'col': 13,
            'row': 5,
          },
          {
            'col': 15,
            'row': 5,
          },
        ],
        [
          {
            'col': 19,
            'row': 5,
          },
          {
            'col': 21,
            'row': 5,
          },
        ],
        [
          {
            'col': 25,
            'row': 5,
          },
          {
            'col': 27,
            'row': 5,
          },
        ],
        [
          {
            'col': 1,
            'row': 10,
          },
          {
            'col': 3,
            'row': 10,
          },
        ],
        [
          {
            'col': 7,
            'row': 10,
          },
          {
            'col': 9,
            'row': 10,
          },
        ],
        [
          {
            'col': 13,
            'row': 10,
          },
          {
            'col': 15,
            'row': 10,
          },
        ],
        [
          {
            'col': 19,
            'row': 10,
          },
          {
            'col': 21,
            'row': 10,
          },
        ],
        [
          {
            'col': 25,
            'row': 10,
          },
          {
            'col': 27,
            'row': 10,
          },
        ],
        [
          {
            'col': 1,
            'row': 15,
          },
          {
            'col': 3,
            'row': 15,
          },
        ],
        [
          {
            'col': 7,
            'row': 15,
          },
          {
            'col': 9,
            'row': 15,
          },
        ],
        [
          {
            'col': 13,
            'row': 15,
          },
          {
            'col': 15,
            'row': 15,
          },
        ],
        [
          {
            'col': 19,
            'row': 15,
          },
          {
            'col': 21,
            'row': 15,
          },
        ],
        [
          {
            'col': 25,
            'row': 15,
          },
          {
            'col': 27,
            'row': 15,
          },
        ],
      ]);
    });

    it('should work when product diameter is 100 and pin diameter is 20', () => {
      expect(
        calculatePinPairsRoundMaterial({
          pinDiameter: 20,
          productDiameter: 100,
          productMargin: 15,
        }),
      ).toEqual([
        [
          {
            'col': 1,
            'row': 0,
          },
          {
            'col': 3,
            'row': 0,
          },
        ],
        [
          {
            'col': 7,
            'row': 0,
          },
          {
            'col': 9,
            'row': 0,
          },
        ],
        [
          {
            'col': 13,
            'row': 0,
          },
          {
            'col': 15,
            'row': 0,
          },
        ],
        [
          {
            'col': 19,
            'row': 0,
          },
          {
            'col': 21,
            'row': 0,
          },
        ],
        [
          {
            'col': 25,
            'row': 0,
          },
          {
            'col': 27,
            'row': 0,
          },
        ],
        [
          {
            'col': 1,
            'row': 5,
          },
          {
            'col': 3,
            'row': 5,
          },
        ],
        [
          {
            'col': 7,
            'row': 5,
          },
          {
            'col': 9,
            'row': 5,
          },
        ],
        [
          {
            'col': 13,
            'row': 5,
          },
          {
            'col': 15,
            'row': 5,
          },
        ],
        [
          {
            'col': 19,
            'row': 5,
          },
          {
            'col': 21,
            'row': 5,
          },
        ],
        [
          {
            'col': 25,
            'row': 5,
          },
          {
            'col': 27,
            'row': 5,
          },
        ],
        [
          {
            'col': 1,
            'row': 10,
          },
          {
            'col': 3,
            'row': 10,
          },
        ],
        [
          {
            'col': 7,
            'row': 10,
          },
          {
            'col': 9,
            'row': 10,
          },
        ],
        [
          {
            'col': 13,
            'row': 10,
          },
          {
            'col': 15,
            'row': 10,
          },
        ],
        [
          {
            'col': 19,
            'row': 10,
          },
          {
            'col': 21,
            'row': 10,
          },
        ],
        [
          {
            'col': 25,
            'row': 10,
          },
          {
            'col': 27,
            'row': 10,
          },
        ],
        [
          {
            'col': 1,
            'row': 15,
          },
          {
            'col': 3,
            'row': 15,
          },
        ],
        [
          {
            'col': 7,
            'row': 15,
          },
          {
            'col': 9,
            'row': 15,
          },
        ],
        [
          {
            'col': 13,
            'row': 15,
          },
          {
            'col': 15,
            'row': 15,
          },
        ],
        [
          {
            'col': 19,
            'row': 15,
          },
          {
            'col': 21,
            'row': 15,
          },
        ],
        [
          {
            'col': 25,
            'row': 15,
          },
          {
            'col': 27,
            'row': 15,
          },
        ],
      ]);
    });

    it('should work when product diameter is 160 and pin diameter is 8', () => {
      expect(
        calculatePinPairsRoundMaterial({
          pinDiameter: 8,
          productDiameter: 160,
          productMargin: 15,
        }),
      ).toEqual([
        [
          {
            'col': 2,
            'row': 0,
          },
          {
            'col': 5,
            'row': 0,
          },
        ],
        [
          {
            'col': 10,
            'row': 0,
          },
          {
            'col': 13,
            'row': 0,
          },
        ],
        [
          {
            'col': 18,
            'row': 0,
          },
          {
            'col': 21,
            'row': 0,
          },
        ],
        [
          {
            'col': 2,
            'row': 7,
          },
          {
            'col': 5,
            'row': 7,
          },
        ],
        [
          {
            'col': 10,
            'row': 7,
          },
          {
            'col': 13,
            'row': 7,
          },
        ],
        [
          {
            'col': 18,
            'row': 7,
          },
          {
            'col': 21,
            'row': 7,
          },
        ],
        [
          {
            'col': 2,
            'row': 14,
          },
          {
            'col': 5,
            'row': 14,
          },
        ],
        [
          {
            'col': 10,
            'row': 14,
          },
          {
            'col': 13,
            'row': 14,
          },
        ],
        [
          {
            'col': 18,
            'row': 14,
          },
          {
            'col': 21,
            'row': 14,
          },
        ],
      ]);
    });

    it('should work when product diameter is 160 and pin diameter is 20', () => {
      expect(
        calculatePinPairsRoundMaterial({
          pinDiameter: 20,
          productDiameter: 160,
          productMargin: 15,
        }),
      ).toEqual([
        [
          {
            'col': 2,
            'row': 0,
          },
          {
            'col': 5,
            'row': 0,
          },
        ],
        [
          {
            'col': 10,
            'row': 0,
          },
          {
            'col': 13,
            'row': 0,
          },
        ],
        [
          {
            'col': 18,
            'row': 0,
          },
          {
            'col': 21,
            'row': 0,
          },
        ],
        [
          {
            'col': 2,
            'row': 8,
          },
          {
            'col': 5,
            'row': 8,
          },
        ],
        [
          {
            'col': 10,
            'row': 8,
          },
          {
            'col': 13,
            'row': 8,
          },
        ],
        [
          {
            'col': 18,
            'row': 8,
          },
          {
            'col': 21,
            'row': 8,
          },
        ],
      ]);
    });
  });

  describe('calculatePinTripletsRectMaterial', () => {
    it('should work when product length is 150, width is 80 and pin diameter is 8', () => {
      expect(
        calculatePinTripletsRectMaterial({
          pinDiameter: 8,
          productLength: 150,
          productWidth: 80,
          productMargin: 15,
        }),
      ).toEqual([
        [
          {
            col: 1,
            row: 0,
          },
          {
            col: 5,
            row: 0,
          },
          {
            col: 0,
            row: 1,
          },
        ],
        [
          {
            col: 9,
            row: 0,
          },
          {
            col: 13,
            row: 0,
          },
          {
            col: 8,
            row: 1,
          },
        ],
        [
          {
            col: 17,
            row: 0,
          },
          {
            col: 21,
            row: 0,
          },
          {
            col: 16,
            row: 1,
          },
        ],
        [
          {
            col: 1,
            row: 4,
          },
          {
            col: 5,
            row: 4,
          },
          {
            col: 0,
            row: 5,
          },
        ],
        [
          {
            col: 9,
            row: 4,
          },
          {
            col: 13,
            row: 4,
          },
          {
            col: 8,
            row: 5,
          },
        ],
        [
          {
            col: 17,
            row: 4,
          },
          {
            col: 21,
            row: 4,
          },
          {
            col: 16,
            row: 5,
          },
        ],
        [
          {
            col: 1,
            row: 8,
          },
          {
            col: 5,
            row: 8,
          },
          {
            col: 0,
            row: 9,
          },
        ],
        [
          {
            col: 9,
            row: 8,
          },
          {
            col: 13,
            row: 8,
          },
          {
            col: 8,
            row: 9,
          },
        ],
        [
          {
            col: 17,
            row: 8,
          },
          {
            col: 21,
            row: 8,
          },
          {
            col: 16,
            row: 9,
          },
        ],
        [
          {
            col: 1,
            row: 12,
          },
          {
            col: 5,
            row: 12,
          },
          {
            col: 0,
            row: 13,
          },
        ],
        [
          {
            col: 9,
            row: 12,
          },
          {
            col: 13,
            row: 12,
          },
          {
            col: 8,
            row: 13,
          },
        ],
        [
          {
            col: 17,
            row: 12,
          },
          {
            col: 21,
            row: 12,
          },
          {
            col: 16,
            row: 13,
          },
        ],
        [
          {
            col: 1,
            row: 16,
          },
          {
            col: 5,
            row: 16,
          },
          {
            col: 0,
            row: 17,
          },
        ],
        [
          {
            col: 9,
            row: 16,
          },
          {
            col: 13,
            row: 16,
          },
          {
            col: 8,
            row: 17,
          },
        ],
        [
          {
            col: 17,
            row: 16,
          },
          {
            col: 21,
            row: 16,
          },
          {
            col: 16,
            row: 17,
          },
        ],
      ]);
    });
  });

  describe('getLabelsForPositions', () => {
    it('should work when product diameter is 100 and pin diameter is 8', () => {
      expect(
        getLabelsForPosition(
          calculatePinPairsRoundMaterial({
            pinDiameter: 8,
            productDiameter: 100,
            productMargin: 15,
          }),
        ),
      ).toEqual([
        'A2',
        'A4',
        'A8',
        'A10',
        'A14',
        'A16',
        'A20',
        'A22',
        'A26',
        'A28',
        'F2',
        'F4',
        'F8',
        'F10',
        'F14',
        'F16',
        'F20',
        'F22',
        'F26',
        'F28',
        'K2',
        'K4',
        'K8',
        'K10',
        'K14',
        'K16',
        'K20',
        'K22',
        'K26',
        'K28',
        'P2',
        'P4',
        'P8',
        'P10',
        'P14',
        'P16',
        'P20',
        'P22',
        'P26',
        'P28',
      ]);
    });
  });

  describe('calculatePinDistances', () => {
    it('should work when product diameter is 100 and pin diameter is 8', () => {
      const product = makeWrench();
      product.config.POSITIONING_PIN_DIAMETER = '8';
      product.config.RAW_MAT_DIAMETER = '100';

      expect(calculatePinDistances(product, 15)).toEqual({
        DRAWER_AMOUNT_PRODUCT_X: 5,
        DRAWER_AMOUNT_PRODUCT_Y: 4,
        DISTANCE_POSITIONING_PINS: 50,
        EQUAL_GRID: true,
        GRID_X_OFFSET: 150,
        GRID_Y_OFFSET: 125,
        POS_POSPIN1_X: 25,
        POS_POSPIN1_Y: 0,
      });
    });
  });
});
