import {View} from 'react-native';
import React from 'react';
import {useDimensions} from '../DimensionsProvider';

/**
 * GridCell Component. Each position on the grid is a grid cell
 * @returns
 */
export const GridCell = () => {
  const dimensions = useDimensions();

  const styles = {
    container: {
      width: dimensions.tile.width,
      height: dimensions.tile.height,
      marginHorizontal: dimensions.tile.margin,
      backgroundColor: 'rgba(238, 228, 218, 0.35)',
      borderRadius: dimensions.tile.borderRadius,
    },
  };

  return <View style={styles.container} />;
};
