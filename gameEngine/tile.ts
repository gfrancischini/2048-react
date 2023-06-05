export type Position = {x: number; y: number};

let uniqueValue = 0;

/**
 * The tile
 */
export class Tile {
  /**
   * Current value
   */
  public value: number;

  /**
   * Previous tile position
   */
  public previousPosition: Position | null;

  /**
   * Merged from tiles
   */
  public mergedFrom: [Tile, Tile] | null;

  /**
   * Unique tile key
   */
  public uniqueKeyValue = uniqueValue++;

  /**
   * Build a new tile
   * @param position The current tile position
   * @param value The current tile value
   */
  constructor(public position: Position, value: number | null) {
    this.value = value || 2;

    this.previousPosition = null;
    this.mergedFrom = null; // Tracks tiles that merged together
  }

  /**
   * Save the current position
   */
  savePosition() {
    this.previousPosition = {...this.position};
  }

  /**
   * Update tile position
   * @param position
   */
  updatePosition(position: Position) {
    this.position = {...position};
  }

  /**
   * Get tile positions
   * @returns
   */
  getPosition(): Position {
    return this.position;
  }

  /**
   * Serialize the tile
   * @returns
   */
  serialize() {
    return {
      position: this.position,
      value: this.value,
    };
  }
}
