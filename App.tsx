/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store.ts';
import Loader from './src/componets/loader/loader.tsx';
import Toast from 'react-native-toast-message';
import Home from './src/screen/home/home.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Home />
        <Loader />
        <Toast position="bottom" bottomOffset={40} />;
      </PersistGate>
    </Provider>
  );
};

export default App;
