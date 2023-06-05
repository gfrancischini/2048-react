import {Tile} from '../Tile';
import {render, act} from '@testing-library/react-native';
import * as GameEngine from '../../gameEngine/tile';
import {
  Animated,
  Text,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {ReactTestInstance} from 'react-test-renderer';

jest.useFakeTimers();

const expectTileStyle = (
  containerTile: ReactTestInstance,
  containerStyle: StyleProp<ViewStyle | TextStyle | ImageStyle>,
  textStyle: StyleProp<ViewStyle | TextStyle | ImageStyle>,
) => {
  const defaultTextStyle: TextStyle = {
    fontSize: 40,
    color: '#776E65',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    flex: 1,
  };

  const containerDefaultStyle: ViewStyle = {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    height: 171.5,
    justifyContent: 'center',
    position: 'absolute',
    width: 171.5,
  };

  const text = containerTile.findByType(Text);

  expect(containerTile).toHaveStyle(
    StyleSheet.compose(containerDefaultStyle, containerStyle),
  );

  expect(text).toHaveStyle(StyleSheet.compose(defaultTextStyle, textStyle));
};

describe('Tile', () => {
  it('correctly load styles for tile with value 2', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 2);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(animatedTileView, {backgroundColor: '#eee4da'}, {});
  });

  it('correctly load styles for tile with value 4', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 4);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(animatedTileView, {backgroundColor: '#eee1c9'}, {});
  });

  it('correctly load styles for tile with value 8', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 8);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#f3b27a'},
      {color: '#f9f6f2'},
    );
  });

  it('correctly load styles for tile with value 16', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 16);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#f69664'},
      {color: '#f9f6f2'},
    );
  });

  it('correctly load styles for tile with value 32', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 32);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#f77c5f'},
      {color: '#f9f6f2'},
    );
  });

  it('correctly load styles for tile with value 64', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 64);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#f75f3b'},
      {color: '#f9f6f2'},
    );
  });

  it('correctly load styles for tile with value 128', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 128);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#edd073'},
      {color: '#f9f6f2', fontSize: 28},
    );
  });

  it('correctly load styles for tile with value 256', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 256);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#edcc62'},
      {color: '#f9f6f2', fontSize: 28},
    );
  });

  it('correctly load styles for tile with value 512', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 512);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#edc950'},
      {color: '#f9f6f2', fontSize: 28},
    );
  });

  it('correctly load styles for tile with value 1024', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 1024);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#edc53f'},
      {color: '#f9f6f2', fontSize: 20},
    );
  });

  it('correctly load styles for tile with value 2048', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 2048);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#edc22e'},
      {color: '#f9f6f2', fontSize: 20},
    );
  });

  it('correctly load styles for tile with value super tile', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 4096);

    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);
    expectTileStyle(
      animatedTileView,
      {backgroundColor: '#3c3a33'},
      {color: '#f9f6f2', fontSize: 16},
    );
  });

  it('executes animation when tile has previous position', async () => {
    const tile = new GameEngine.Tile({x: 1, y: 1}, 4096);
    tile.previousPosition = {x: 0, y: 1};
    const {getByTestId} = render(<Tile tile={tile} />);

    const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);

    expect(animatedTileView).toHaveStyle({
      transform: [
        {translateX: 0},
        {translateY: 0},
        {scaleX: 1},
        {scaleY: 1},
      ],
    });
  });

  // it('executes animation when tile has mergedFrom', async () => {
  //   const tile = new GameEngine.Tile({x: 1, y: 1}, 4096);
  //   tile.mergedFrom = [tile, new GameEngine.Tile({x: 0, y: 1}, 4096)];
  //   const {getByTestId} = render(<Tile tile={tile} />);

  //   const animatedTileView = getByTestId(`AnimatedTile-${tile.uniqueKeyValue}`);

  //   expect(animatedTileView).toHaveStyle({
  //     transform: [
  //       {translateX: 0},
  //       {translateY: 0},
  //       {scaleX: 1},
  //       {scaleY: 1},
  //     ],
  //   });
  // });
});
