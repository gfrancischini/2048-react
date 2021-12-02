import React from 'react';
import { DimensionsProvider } from './app/DimensionsProvider';
import { Game } from './app/Game';

export const App = () => {
    return <DimensionsProvider><Game /></DimensionsProvider>
};