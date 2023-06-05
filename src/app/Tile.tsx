import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {useDimensions} from './DimensionsProvider';

const TRAVERSE_ANIMATION_SPEED = 150;
const POP_ANIMATION_SPEED = 100;
import * as GameEngine from '../gameEngine/tile';
import {convertTilePositionToPixels} from './Utils';

/**
 * The tile
 * @param props
 * @returns
 */
export const Tile = ({tile}: Props) => {
  const dimensions = useDimensions();

  const styles = StyleSheet.create({
    tile: {
      position: 'absolute',
      borderRadius: dimensions.tile.borderRadius,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: dimensions.tile.width,
      height: dimensions.tile.height,
    },
    tileText: {
      fontSize: dimensions.fontSize.extraLarge,
      color: '#776E65',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      flex: 1,
    },
    tile2: {
      backgroundColor: '#eee4da',
    },
    tile4: {
      backgroundColor: '#eee1c9',
    },
    tile8: {
      backgroundColor: '#f3b27a',
    },
    tile8Text: {
      color: '#f9f6f2',
    },
    tile16: {
      backgroundColor: '#f69664',
    },
    tile16Text: {
      color: '#f9f6f2',
    },
    tile32: {
      backgroundColor: '#f77c5f',
    },
    tile32Text: {
      color: '#f9f6f2',
    },
    tile64: {
      backgroundColor: '#f75f3b',
    },
    tile64Text: {
      color: '#f9f6f2',
    },
    tile128: {
      backgroundColor: '#edd073',
    },
    tile128Text: {
      color: '#f9f6f2',
      fontSize: dimensions.fontSize.large,
    },
    tile256: {
      backgroundColor: '#edcc62',
    },
    tile256Text: {
      color: '#f9f6f2',
      fontSize: dimensions.fontSize.large,
    },
    tile512: {
      backgroundColor: '#edc950',
    },
    tile512Text: {
      color: '#f9f6f2',
      fontSize: dimensions.fontSize.large,
    },
    tile1024: {
      backgroundColor: '#edc53f',
    },
    tile1024Text: {
      color: '#f9f6f2',
      fontSize: dimensions.fontSize.medium,
    },
    tile2048: {
      backgroundColor: '#edc22e',
    },
    tile2048Text: {
      color: '#f9f6f2',
      fontSize: dimensions.fontSize.medium,
    },
    tilesuper: {
      backgroundColor: '#3c3a33',
    },
    tilesuperText: {
      color: '#f9f6f2',
      fontSize: dimensions.fontSize.small,
    },
  });

  // animations
  const leftAnimated = useRef(new Animated.Value(0)).current;
  const topAnimated = useRef(new Animated.Value(0)).current;
  const scaleAnimated = useRef(
    new Animated.Value(tile.previousPosition ? 1 : 0),
  ).current;

  // the current render pixel positions (this is need to play animation correctly)
  const [renderPixelPosition, setRenderPixelPosition] = useState(
    convertTilePositionToPixels(
      tile.previousPosition?.x ?? tile.position.x,
      tile.previousPosition?.y ?? tile.position.y,
      dimensions.tile,
    ),
  );

  useEffect(() => {
    if (tile.previousPosition != null) {
      // if we have a previous position we will play the move navigation
      const previousPixelPosition = convertTilePositionToPixels(
        tile.previousPosition.x,
        tile.previousPosition.y,
        dimensions.tile,
      );
      const newPixelsPosition = convertTilePositionToPixels(
        tile.getPosition().x,
        tile.getPosition().y,
        dimensions.tile,
      );

      Animated.timing(leftAnimated, {
        toValue: newPixelsPosition.left - previousPixelPosition.left,
        duration: TRAVERSE_ANIMATION_SPEED,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.linear),
      }).start(() => {
        setRenderPixelPosition(previous => {
          return {
            ...previous,
            left: newPixelsPosition.left,
          };
        });
        leftAnimated.setValue(0);
      });
      Animated.timing(topAnimated, {
        toValue: newPixelsPosition.top - previousPixelPosition.top,
        duration: TRAVERSE_ANIMATION_SPEED,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.linear),
      }).start(() => {
        setRenderPixelPosition(previous => {
          return {
            ...previous,
            top: newPixelsPosition.top,
          };
        });
        topAnimated.setValue(0);
      });
    } else if (tile.mergedFrom) {
      // if the tile got merged we will play the scale animation
      Animated.sequence([
        Animated.timing(scaleAnimated, {
          toValue: 1.1,
          duration: POP_ANIMATION_SPEED / 2,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(scaleAnimated, {
          toValue: 1,
          duration: POP_ANIMATION_SPEED / 2,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]).start();
    } else {
      // this is a new tile, play the scale from 0 to 1 animation (pop)
      Animated.timing(scaleAnimated, {
        toValue: 1,
        duration: POP_ANIMATION_SPEED,
        useNativeDriver: true,
      }).start();
    }
  }, [tile.getPosition()]);

  const tileStyle =
    tile.value <= 2048 ? styles['tile' + tile.value] : styles['tilesuper'];
  const tileTextStyle =
    tile.value <= 2048
      ? styles['tile' + tile.value + 'Text']
      : styles['tilesuperText'];

  return (
    <React.Fragment>
      {tile.mergedFrom?.map(tile => {
        return <Tile tile={tile} key={tile.uniqueKeyValue} />;
      })}
      <Animated.View
        style={[
          styles.tile,
          tileStyle,
          {
            left: renderPixelPosition.left,
            top: renderPixelPosition.top,
            transform: [
              {translateX: leftAnimated},
              {translateY: topAnimated},
              {scaleX: scaleAnimated},
              {scaleY: scaleAnimated},
            ],
          },
        ]}>
        <Text style={[styles.tileText, tileTextStyle]}>{tile.value}</Text>
      </Animated.View>
    </React.Fragment>
  );
};

interface Props {
  // tile game engine
  tile: GameEngine.Tile;
}
