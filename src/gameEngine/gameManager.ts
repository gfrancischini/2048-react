import {Grid} from './grid';
import {Position, Tile} from './tile';

/**
 * The board move direction
 */
export enum BoardMoveDirection {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}

/**
 * The game manager responsible for the game logic
 */
export class GameManager {
  public startTiles: number;
  public shouldKeepPlaying: boolean = false;
  public over: boolean = false;
  public won: boolean = false;
  public grid: Grid;
  public score: number = 0;

  /**
   *
   * @param size Size of the grid
   */
  constructor(public size: number) {
    this.startTiles = 2;
    this.grid = new Grid(this.size);
    this.setup();
  }

  /**
   * Restart the game
   */
  restart() {
    this.setup();
  }

  /**
   * Keep playing after winning (allows going over 2048)
   */
  keepPlaying() {
    this.shouldKeepPlaying = true;
  }

  /**
   * Return true if the game is lost, or has won and the user hasn't kept playing
   * @returns
   */
  isGameTerminated() {
    return this.over || (this.won && !this.shouldKeepPlaying);
  }

  /**
   * Set up the game
   */
  setup(previousState?: any | null) {
    // Reload the game from a previous game if present
    if (previousState) {
      this.grid = new Grid(previousState.grid.size, previousState.grid.cells); // Reload grid
      this.score = previousState.score;
      this.over = previousState.over;
      this.won = previousState.won;
      this.shouldKeepPlaying = previousState.shouldKeepPlaying;
    } else {
      this.grid = new Grid(this.size);
      this.score = 0;
      this.over = false;
      this.won = false;
      this.shouldKeepPlaying = false;

      // Add the initial tiles
      this.addStartTiles();
    }
  }

  /**
   * Set up the initial tiles to start the game with
   */
  addStartTiles() {
    for (let i = 0; i < this.startTiles; i++) {
      this.addRandomTile();
    }
  }

  /**
   * Adds a tile in a random position
   */
  addRandomTile() {
    const randomPosition = this.grid.randomAvailableCell();
    if (randomPosition) {
      const value = Math.random() < 0.9 ? 2 : 4;
      const tile = new Tile(randomPosition, value);
      this.grid.insertTile(tile);
    }
  }

  /**
   * Represent the current game as an object
   * @returns
   */
  serialize() {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      over: this.over,
      won: this.won,
      shouldKeepPlaying: this.shouldKeepPlaying,
    };
  }

  /**
   * Save all tile positions and remove merger info
   */
  prepareTiles() {
    this.grid.eachCell((x, y, tile) => {
      if (tile) {
        tile.mergedFrom = null;
        tile.savePosition();
      }
    });
  }

  /**
   * Move a tile and its representation
   * @param tile
   * @param cell
   */
  moveTile(tile: Tile, cell: Position) {
    this.grid.cells[tile.getPosition().x][tile.getPosition().y] = null;
    this.grid.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  }

  /**
   * Move tiles on the grid in the specified direction
   * @param direction
   * @returns
   */
  move(direction: BoardMoveDirection) {
    if (this.isGameTerminated()) return true; // Don't do anything if the game's over

    let cell, tile;

    const vector = this.getVector(direction);
    const traversals = this.buildTraversals(vector);
    let moved = false;

    // Save the current tile positions and remove merger information
    this.prepareTiles();

    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(x => {
      traversals.y.forEach(y => {
        cell = {x: x, y: y};
        tile = this.grid.cellContent(cell);

        if (tile) {
          const positions = this.findFarthestPosition(cell, vector);
          const next = this.grid.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value === tile.value && !next.mergedFrom) {
            const merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            this.grid.insertTile(merged);
            this.grid.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            this.score += merged.value;

            // The mighty 2048 tile
            if (merged.value === 2048) this.won = true;
          } else {
            this.moveTile(tile, positions.farthest);
          }

          if (!this.positionsEqual(cell, tile.position)) {
            moved = true; // The tile moved from its original cell!
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();

      if (!this.movesAvailable()) {
        this.over = true; // Game over!
      }
    }

    return moved;
  }

  /**
   * Get the vector representing the chosen direction
   * @param direction
   * @returns
   */
  getVector(direction: BoardMoveDirection) {
    // Vectors representing tile movement
    const map = {
      0: {x: 0, y: -1}, // Up
      1: {x: 1, y: 0}, // Right
      2: {x: 0, y: 1}, // Down
      3: {x: -1, y: 0}, // Left
    };

    return map[direction];
  }

  /**
   * Build a list of positions to traverse in the right order
   * @param vector
   * @returns
   */
  buildTraversals(vector: Position) {
    const traversals: {x: number[]; y: number[]} = {x: [], y: []};

    for (let pos = 0; pos < this.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
  }

  /**
   * Find the farthest position
   * @param cell
   * @param vector
   * @returns
   */
  findFarthestPosition(cell: Position, vector: Position) {
    let previous;

    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell = {x: previous.x + vector.x, y: previous.y + vector.y};
    } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell, // Used to check if a merge is required
    };
  }

  /**
   * Return is there is any move available
   * @returns
   */
  movesAvailable() {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }

  /**
   * Check for available matches between tiles (more expensive check)
   * @returns
   */
  tileMatchesAvailable() {
    let tile;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        tile = this.grid.cellContent({x: x, y: y});

        if (tile) {
          for (let direction = 0; direction < 4; direction++) {
            const vector = this.getVector(direction);
            const cell = {x: x + vector.x, y: y + vector.y};

            const other = this.grid.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  }

  /**
   * Check if the positions are equals
   * TODO: Move to the position class
   * @param first
   * @param second
   * @returns
   */
  positionsEqual(first: Position, second: Position) {
    // TODO: mode this to the position class
    return first.x === second.x && first.y === second.y;
  }
}
