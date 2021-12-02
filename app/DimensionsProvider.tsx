import React, { useContext, useState } from "react";
import { Dimensions } from "react-native";

interface DimensionsContext {
    tile: {
        height: number;
        width: number;
        margin: number;
        borderRadius: number;
    },
    game: {
        height: number;
        width: number;
    }
    fontSize: {
        verySmall: number;
        small: number;
        medium: number;
        large: number;
        extraLarge: number;
    }
}

const buildDimensions = (): DimensionsContext => {
    const { height, width, scale } = Dimensions.get('window');

    // TODO: allow to rotate
    const mainDimension = height > width ? width : height;

    const MARGIN_WIDTH = 2 * scale;
    const ITEM_WIDTH = (mainDimension - 12 * scale - MARGIN_WIDTH * 10) / 4

    return {
        tile: {
            height: ITEM_WIDTH,
            width: ITEM_WIDTH,
            margin: 2 * scale,
            borderRadius: 2 * scale,
        },

        game: {
            width: mainDimension - 10 * scale,
            height: mainDimension - 10 * scale
        },

        fontSize: {
            verySmall: 8 * scale,
            small: 16 * scale,
            medium: 20 * scale,
            large: 27 * scale,
            extraLarge: 32 * scale
        }
    }
}

const DimensionsContext = React.createContext<DimensionsContext>(buildDimensions());

export const DimensionsProvider = (props: any) => {
    const [dimensions, setDimensions] = useState<DimensionsContext>(() => buildDimensions());

    // TODO: check for orientation or screen change

    return <DimensionsContext.Provider value={dimensions}>
        {props.children}
    </DimensionsContext.Provider>
}

export const useDimensions = () => {
    return useContext(DimensionsContext);
}