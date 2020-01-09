/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import StoreProvider from './src/stores/Provider';
import Navigator from './src/Navigation';
import AppStateWrapper from './src/components/AppStateWrapper';

const App: () => React$Node = () => {
  return (
    <StoreProvider>
      <AppStateWrapper />
      <Navigator />
    </StoreProvider>
  );
};

export default App;
