import React from 'react';
import {render} from '@testing-library/react-native';
import {TileContainer} from '../TileContainer';
import * as GameEngine from '../../gameEngine/tile';

jest.mock('../DimensionsProvider', () => {
  const dimensions = {
    game: {
      width: 200,
      height: 300,
    },
  };

  return {
    useDimensions: () => dimensions,
  };
});

// Mock the Tile class
jest.mock('../Tile', () => {
  return {
    Tile: jest.fn().mockImplementation(function (props) {
      // @ts-expect-error
      return <mock-Tile {...props} />;
    }),
  };
});

describe('TileContainer', () => {
  beforeEach(() => {
    jest.mock('../DimensionsProvider').clearAllMocks();
  });

  it('renders the TileContainer with correct dimensions and tiles', () => {
    const tiles = [
      new GameEngine.Tile({x: 0, y: 0}, 2),
      new GameEngine.Tile({x: 1, y: 0}, 4),
      new GameEngine.Tile({x: 2, y: 0}, 8),
    ];

    const {root} = render(<TileContainer tiles={tiles} />);

    expect(root.props.style).toEqual({
      width: 200,
      height: 300,
      position: 'absolute',
      left: 0,
      top: 0,
      overflow: 'hidden',
    });

    // Check if the Tile component is rendered for each tile
    expect(require('../Tile').Tile).toHaveBeenCalledTimes(3);
    expect(require('../Tile').Tile).toHaveBeenCalledWith(
      {
        tile: tiles[0],
      },
      {},
    );
    expect(require('../Tile').Tile).toHaveBeenCalledWith(
      {
        tile: tiles[1],
      },
      {},
    );
    expect(require('../Tile').Tile).toHaveBeenCalledWith(
      {
        tile: tiles[2],
      },
      {},
    );
  });
});
