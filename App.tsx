import React from 'react';
import {DimensionsProvider} from './src/app/DimensionsProvider';
import {Game} from './src/app/Game';

export default () => {
  return (
    <DimensionsProvider>
      <Game />
    </DimensionsProvider>
  );
};
