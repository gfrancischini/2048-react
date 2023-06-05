import renderer, { act } from 'react-test-renderer';
import {DimensionsProvider, useDimensions} from '../DimensionsProvider';
import React from 'react';


jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ height: 600, width: 800, scale: 2 }),
  },
}));

describe('DimensionsProvider', () => {
  it('correctly sets dimensions based on window', () => {
    let dimensionsData = null;
    const DummyComponent = () => {
      dimensionsData = useDimensions();
      return null;
    };

    act(() => {
      renderer.create(
        <DimensionsProvider>
          <DummyComponent />
        </DimensionsProvider>
      );
    });

    expect(dimensionsData).toEqual({
      tile: {
        height: 134,
        width: 134,
        margin: 4,
        borderRadius: 4,
      },
      game: {
        width: 580,
        height: 580,
      },
      fontSize: {
        verySmall: 12,
        small: 16,
        medium: 20,
        large: 28,
        extraLarge: 40,
      },
    });
  });

});