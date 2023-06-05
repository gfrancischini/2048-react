import {Position, Tile} from './tile';

/**
 * A cell
 */
type Cell = Tile | null;

/**
 * A group of cells
 */
type Cells = Cell[][];

/**
 * The grid
 */
export class Grid {
  public cells: Cells;

  /**
   * Create a new grid
   * @param size
   * @param previousState
   */
  constructor(protected size: number, previousState?: [][]) {
    this.cells = previousState ? this.fromState(previousState) : this.empty();
  }

  /**
   * Build a grid of the specified size
   * @returns
   */
  empty() {
    const cells: Cells = [];

    for (let x = 0; x < this.size; x++) {
      const row: Cell[] = (cells[x] = []);

      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }
    }

    return cells;
  }

  /**
   *
   * @param state
   * @returns
   */
  fromState(state: [][]) {
    const cells: Cells = [];
    for (let x = 0; x < this.size; x++) {
      const row: Cell[] = (cells[x] = []);

      for (let y = 0; y < this.size; y++) {
        const tile = state[x][y] as {position: any; value: any};
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }

    return cells;
  }

  /**
   * Find the first available random position
   * @returns
   */
  randomAvailableCell() {
    const cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  }

  /**
   * Return available position cells
   * @returns
   */
  availableCells() {
    const cells: Position[] = [];

    this.eachCell(function (x, y, tile) {
      if (!tile) {
        cells.push({x: x, y: y});
      }
    });

    return cells;
  }

  /**
   * Call callback for every cell
   * @param callback callback that runs on each cell
   */
  eachCell(callback: (x: number, y: number, cell: Cell) => void) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  }

  /**
   * Check if there are any cells available
   * @returns
   */
  cellsAvailable() {
    return !!this.availableCells().length;
  }

  /**
   * Check if the specified cell is taken
   * @param cell
   * @returns
   */
  cellAvailable(cell: Position) {
    return !this.cellOccupied(cell);
  }

  /**
   * Check if the cell is occupied
   * @param cell
   * @returns
   */
  cellOccupied(cell: Position) {
    return !!this.cellContent(cell);
  }

  /**
   * Check a cell content
   * @param cell
   * @returns
   */
  cellContent(cell: Position) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  }

  /**
   * Inserts a tile at its position
   * @param tile
   */
  insertTile(tile: Tile) {
    this.cells[tile.getPosition().x][tile.getPosition().y] = tile;
  }

  /**
   *
   * @param tile
   */
  removeTile(tile: Tile) {
    this.cells[tile.getPosition().x][tile.getPosition().y] = null;
  }

  /**
   * Check if is with bounds
   * @param position
   * @returns
   */
  withinBounds(position: Position) {
    return (
      position.x >= 0 &&
      position.x < this.size &&
      position.y >= 0 &&
      position.y < this.size
    );
  }

  /**
   * Serialize the game
   * @returns
   */
  serialize() {
    const cellState: any[][] = [];

    for (let x = 0; x < this.size; x++) {
      const row: any = (cellState[x] = []);

      for (let y = 0; y < this.size; y++) {
        row.push(this.cells[x][y]?.serialize() || null);
      }
    }

    return {
      size: this.size,
      cells: cellState,
    };
  }
}
