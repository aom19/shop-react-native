import React from 'react';
import {FlatList , View , Text , StyleSheet} from 'react-native'
import {useSelector } from 'react-redux';


const ProductsOverviewScreen = props => {
        const products = useSelector(state => state.products.avalableProducts);
       
        return (
                <FlatList 
                        data = {products} 
                        keyExtractor = {item => item.id} 
                        renderItem={ itemData => 
                                <Text> {itemData.item.title}</Text>
                        }
                />
        )
};

export default ProductsOverviewScreen;