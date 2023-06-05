import { DimensionsContext } from "./DimensionsProvider";

  /**
   * Convert tile grid position to pixel positions
   * @param x
   * @param y
   * @param tile dimensions
   * @returns
   */
  export const convertTilePositionToPixels = (x: number, y: number, tileDimensions: DimensionsContext['tile'] ) => {
    return {
      left:
        x * (tileDimensions.width + tileDimensions.margin * 2) +
        tileDimensions.margin * 2,
      top:
        y * (tileDimensions.height + tileDimensions.margin * 2) +
        tileDimensions.margin * 2,
    };
  };