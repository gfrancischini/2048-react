import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as GameEngine from '../gameEngine/tile';
import {useDimensions} from './DimensionsProvider';
import {Tile} from './Tile';

/**
 * Tile container that contains all the tiles to be rendered
 * @param props
 * @returns
 */
export const TileContainer = (props: ITileContainerProps) => {
  const dimensions = useDimensions();

  const styles = StyleSheet.create({
    container: {
      width: dimensions.game.width,
      height: dimensions.game.height,
      position: 'absolute',
      left: 0,
      top: 0,
      overflow: 'hidden',
    },
  });

  const {tiles} = props;
  return (
    <View style={styles.container}>
      {tiles.map(tile => {
        return <Tile tile={tile} key={tile.uniqueKeyValue} />;
      })}
    </View>
  );
};

interface ITileContainerProps {
  tiles: GameEngine.Tile[];
}
