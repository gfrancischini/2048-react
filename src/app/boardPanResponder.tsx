import React, {useRef} from 'react';
import {PanResponder} from 'react-native';
import {BoardMoveDirection} from '../gameEngine/gameManager';

/**
 *
 * @param onMove callback when a movement is happening
 * @param touchThreshold threshold to dected the movement
 * @returns
 */
export const useBoardPanResponder = (
  onMove: (direction: BoardMoveDirection) => void,
  touchThreshold: number = 5,
) => {
  const moving = useRef<boolean>(false);

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const {dx, dy} = gestureState;
        return Math.abs(dx) > touchThreshold || Math.abs(dy) > touchThreshold;
      },

      onPanResponderTerminationRequest: (evt, gestureState) => {
        return true;
      },

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        if (moving.current == false) {
          moving.current = true;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },

      onPanResponderRelease: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        if (moving.current) {
          moving.current = false;

          const dx = gestureState.dx;
          const dy = gestureState.dy;
          const absDx = dx > 0 ? dx : -dx;
          const absDy = dy > 0 ? dy : -dy;
          const canMove =
            absDx > absDy ? absDx - absDy > 10 : absDx - absDy < -10;
          if (canMove) {
            // (right : left) : (down : up)
            onMove(absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0);
          }
        }
      },
    }),
  ).current;

  return {panResponder};
};
