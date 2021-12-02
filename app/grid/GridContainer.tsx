import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import React from 'react'

import { GridRow } from './GridRow';
import { useDimensions } from '../DimensionsProvider';

/**
 * Grid container that is reponsible for rendering the gridcells (column and rows)
 * @param props 
 * @returns 
 */
export const GridContainer = (props: IGridContainerProps) => {
    const dimensions = useDimensions();

    const styles = StyleSheet.create({
        container: {
            width: dimensions.game.width,
            height: dimensions.game.height,
            position: 'absolute',
            left: 0,
            top: 0,
            overflow: 'hidden',
            paddingHorizontal: dimensions.tile.margin,
            paddingVertical: dimensions.tile.margin,
            flexDirection: 'column',
        }
    });


    return (
        <View style={styles.container}>
            {
                Array.from({ length: props.size }, (item, index) => {
                    return <GridRow key={index} size={props.size} />
                })
            }
        </View>
    )
}

interface IGridContainerProps {
    // The size of the grid
    size: number;
}
