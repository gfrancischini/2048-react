import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {GridCell} from './GridCell';
import {useDimensions} from '../DimensionsProvider';

/**
 * Grid row responsible for rendering rows of grid cells
 * @param props
 * @returns
 */
export const GridRow = (props: IGridRowProps) => {
  const dimensions = useDimensions();

  const styles = StyleSheet.create({
    container: {
      height: dimensions.tile.height,
      marginVertical: dimensions.tile.margin,
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.container}>
      {Array.from({length: props.size}, (item, index) => {
        return <GridCell key={index} />;
      })}
    </View>
  );
};

interface IGridRowProps {
  // Size of the grid
  size: number;
}
