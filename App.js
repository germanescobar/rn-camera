import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Camera: {screen: CameraScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
