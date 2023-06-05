import React from 'react';
import {DimensionsProvider} from './src/app/DimensionsProvider';
import {Game} from './src/app/Game';
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default () => {
  return (
    <SafeAreaProvider>
      <DimensionsProvider>
        <Game />
      </DimensionsProvider>
    </SafeAreaProvider>
  );
};
