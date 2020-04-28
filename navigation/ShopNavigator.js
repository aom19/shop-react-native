import { createStackNavigator} from 'react-navigation';
import {Platform } from 'react-native';

import ProductsOverviewScrenn from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Color'


const ProductsNavigator = createStackNavigator({
    ProductsOverviewScrenn : ProductsOverviewScrenn
},{
    defaultNavigationOptions :{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary :''
        },
        headerTintColor : Platform.OS === 'android' ?  'white' : Colors.primary
    }
});