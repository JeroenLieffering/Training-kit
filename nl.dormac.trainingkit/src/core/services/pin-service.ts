import { PinPair, PinPosition, PinSpot, PinTriplet } from '../../types';
import { parseAsNumber } from '../../utils/number';
import { Product } from '../models/product-types';

// PinGrid-afmetingen mm
export const PIN_SPACING = 25;
export const PIN_HOLE_DIAMETER = 8;
export const PIN_HOLE_RADIUS = PIN_HOLE_DIAMETER / 2;
export const PIN_GRID_X_COUNT = 28;
export const PIN_GRID_Y_COUNT = 22;

//  Marge voor elk product
export const PRODUCT_MARGIN = 50; // mm

// Tafelafmetingen
export const TABLE_WIDTH = PIN_GRID_X_COUNT * PIN_SPACING; // mm, standaard waarde
export const TABLE_HEIGHT = PIN_GRID_Y_COUNT * PIN_SPACING; // mm, standaard waarde

// 2. Berekening van het startpunt van het pinnenraster
//  Er is een rand tussen de eerste pin en de tafelrand
// const EDGE_OFFSET_X = 37.5;
// const EDGE_OFFSET_Y = 27.5;

// Maximale overhang aan elke kant
const MAX_OVERHANG_X = 37.5; // mm
const MAX_OVERHANG_Y = 27.5; // mm

type CalculatePinPairsRoundMaterialParams = {
  pinDiameter: number;
  productDiameter: number;
  productMargin: number;
};

export function calculatePinPairsRoundMaterial({
  pinDiameter,
  productDiameter,
  productMargin,
}: CalculatePinPairsRoundMaterialParams): PinPair[] {
  const effectiveDiameter = productDiameter + productMargin * 2;

  const pinPairs: PinPair[] = [];

  // Bereken horizontale pinposities
  let row = 0;
  while (row < PIN_GRID_Y_COUNT) {
    // Zoek pinposities in een rij
    let col = 0;
    let pin_distance = 0;
    while (col < PIN_GRID_X_COUNT - 1) {
      const x_position = col * PIN_SPACING;

      // Center van het product
      const product_center_x = x_position + PIN_SPACING / 2;

      // Controleer overlappingen
      if (
        product_center_x - effectiveDiameter / 2 >= -MAX_OVERHANG_X &&
        product_center_x + effectiveDiameter / 2 <= TABLE_WIDTH + MAX_OVERHANG_X
      ) {
        // Bereken hoeveel gaat de pinnen uit elkaar moeten waar product op rust
        if (productDiameter < 75) {
          pin_distance = 1;
        } else if (productDiameter < 150) {
          pin_distance = 2;
        } else {
          pin_distance = 3;
        }

        // Voeg pinnen toe
        if (col + pin_distance < PIN_GRID_X_COUNT) {
          const pinPair: PinPair = [
            {
              row: Math.floor(row),
              col: Math.floor(col),
            },
            {
              row: Math.floor(row),
              col: Math.floor(col + pin_distance),
            },
          ];

          pinPairs.push(pinPair);
        }

        // Update kolom index met overlap en marge
        col += Math.floor((PIN_SPACING + effectiveDiameter) / PIN_SPACING);
      } else {
        col += 1;
      }
    }

    // Bereken hoe hoog het product komt tov de geplaatste pin
    const halfPinDistance = (pin_distance * 25) / 2;
    const diagonal = effectiveDiameter / 2 + pinDiameter / 2;

    const yHeight =
      Math.sqrt(
        Math.abs(
          Math.floor(Math.pow(diagonal, 2)) -
            Math.floor(Math.pow(halfPinDistance, 2)),
        ),
      ) +
      effectiveDiameter / 2;

    row += Math.floor((pinDiameter / 2 + yHeight) / PIN_SPACING);

    const rowHeight = row * PIN_SPACING;

    if (rowHeight + yHeight > TABLE_HEIGHT + MAX_OVERHANG_Y) {
      break;
    }
  }

  return pinPairs;
}

type CalculatePinTripletsRectMaterialParams = {
  pinDiameter: number;
  productLength: number;
  productWidth: number;
  productMargin: number;
};

export function calculatePinTripletsRectMaterial({
  pinDiameter,
  productLength,
  productWidth,
  productMargin,
}: CalculatePinTripletsRectMaterialParams): PinTriplet[] {
  const effectiveLength = productLength + productMargin * 2;
  const effectiveWidth = productWidth + productMargin * 2;

  const pinTriplet: PinTriplet[] = [];

  // Bereken horizontale pinposities
  let row = 0;
  while (row < PIN_GRID_Y_COUNT) {
    // Zoek pinposities in een rij
    let col = 1;

    while (col < PIN_GRID_X_COUNT - 1) {
      const x_position = col * PIN_SPACING;

      // Center van het product
      const product_center_x = x_position + PIN_SPACING / 2;

      // Controleer overlappingen
      if (product_center_x + effectiveLength / 2 <= TABLE_WIDTH) {
        const leftUpCol = Math.floor(col - 1);

        const rightPinCol = Math.floor(
          leftUpCol +
            Math.floor((productLength - pinDiameter / 2) / PIN_SPACING),
        );

        // Voeg pinnen toe
        if (rightPinCol < PIN_GRID_X_COUNT) {
          const pinPair: PinTriplet = [
            // Left
            {
              row: Math.floor(row),
              col: Math.floor(col),
            },
            // Right
            {
              row: Math.floor(row),
              col: Math.floor(rightPinCol),
            },
            // Left up
            {
              row: Math.floor(row + 1),
              col: leftUpCol,
            },
          ];

          pinTriplet.push(pinPair);
        }

        // Update kolom index met overlap en marge
        col += Math.floor((PIN_SPACING + effectiveLength) / PIN_SPACING);
      } else {
        col += 1;
      }
    }

    row += Math.floor((effectiveWidth + pinDiameter) / PIN_SPACING);

    const rowHeight = row * PIN_SPACING;

    if (rowHeight + effectiveWidth > TABLE_HEIGHT + MAX_OVERHANG_Y) {
      break;
    }
  }

  return pinTriplet;
}

export function calculatePinDistances(product: Product, productMargin: number) {
  const result = {
    DISTANCE_POSITIONING_PINS: 0,
    GRID_X_OFFSET: 0,
    GRID_Y_OFFSET: 0,
    DRAWER_AMOUNT_PRODUCT_X: 0,
    DRAWER_AMOUNT_PRODUCT_Y: 0,
    POS_POSPIN1_X: 0,
    POS_POSPIN1_Y: 0,
    EQUAL_GRID: true,
  };

  const pinSpots = calculatePinSpotsForProduct(product, productMargin);

  const firstPair = pinSpots[0];

  if (!firstPair) {
    return result;
  }

  const [pin1, pin2] = firstPair;

  result.DISTANCE_POSITIONING_PINS = (pin2.col - pin1.col) * PIN_SPACING;

  const secondPair = pinSpots[1];

  if (secondPair) {
    const [pin1A] = firstPair;
    const [pin1B] = secondPair;

    result.GRID_X_OFFSET = (pin1B.col - pin1A.col) * PIN_SPACING;
  }

  const firstRow = firstPair[0].row;
  let DRAWER_AMOUNT_PRODUCT_X = 0;
  for (const pinPair of pinSpots) {
    if (pinPair[0].row !== firstRow) {
      break;
    }

    DRAWER_AMOUNT_PRODUCT_X += 1;
  }

  result.DRAWER_AMOUNT_PRODUCT_X = DRAWER_AMOUNT_PRODUCT_X;

  let pinAboveFirstPin: PinPosition | null = null;
  let currentRow = firstPair[0].row;
  let DRAWER_AMOUNT_PRODUCT_Y = 1;
  for (const pinPair of pinSpots) {
    if (pinPair[0].row !== currentRow) {
      if (pinAboveFirstPin === null) {
        pinAboveFirstPin = pinPair[0];
      }
      DRAWER_AMOUNT_PRODUCT_Y += 1;
      currentRow = pinPair[0].row;
    }
  }

  result.DRAWER_AMOUNT_PRODUCT_Y = DRAWER_AMOUNT_PRODUCT_Y;

  if (pinAboveFirstPin) {
    result.GRID_Y_OFFSET =
      (pinAboveFirstPin.row - firstPair[0].row) * PIN_SPACING;
  }

  result.POS_POSPIN1_X = firstPair[0].col * PIN_SPACING;
  result.POS_POSPIN1_Y = firstPair[0].row * PIN_SPACING;

  return result;
}

export function getLabelsForPosition(positions: PinSpot[]): string[] {
  const labels = positions.flatMap((pins) =>
    pins.map((pin) => pinPositionToString(pin)),
  );

  // Remove duplicates, can occur when size becomes so small in
  // rect mode that the right pin is the same as the first pin
  return Array.from(new Set(labels));
}

export function pinPositionToString(pinPosition: PinPosition): string {
  // 65 = A in unicode, 66 = B, 67 = C etc etc
  const letter = String.fromCharCode(65 + pinPosition.row);
  const number = pinPosition.col + 1;

  return letter + number;
}

export function calculatePinSpotsForProduct(
  product: Product,
  productMargin: number,
) {
  const pinDiameterNumber = Math.min(
    parseAsNumber(product.config.POSITIONING_PIN_DIAMETER, 8),
    20,
  );

  if (product.config.ROUND_PRODUCT) {
    const productDiameterNumber = parseAsNumber(
      product.config.RAW_MAT_DIAMETER,
      100,
    );

    return calculatePinPairsRoundMaterial({
      pinDiameter: pinDiameterNumber,
      productDiameter: productDiameterNumber,
      productMargin,
    });
  } else {
    const productLengthNumber = parseAsNumber(
      product.config.RAW_MAT_LENGTH,
      150,
    );

    const productWidthNumber = parseAsNumber(product.config.RAW_MAT_WIDTH, 80);

    return calculatePinTripletsRectMaterial({
      pinDiameter: pinDiameterNumber,
      productLength: productLengthNumber,
      productWidth: productWidthNumber,
      productMargin,
    });
  }
}
