import {  createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Color'

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? Colors.accent :Colors.primary 
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);
