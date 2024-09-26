import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import Drawer1 from './App/Navigator/Drawer/Drawer';
import { NavigationContainer } from '@react-navigation/native';

import { configureStore } from './App/Container/Redux/store';
import { Provider } from 'react-redux';

export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer1 />
    </NavigationContainer>
    </Provider>
  )
}