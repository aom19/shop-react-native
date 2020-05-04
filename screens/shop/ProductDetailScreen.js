import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native'
import { useSelector ,useDispatch } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';


import Colors from '../../constants/Color';
import * as cartActions from '../../store/actions/cart'


const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(
        prod => prod.id === productId
    ))

    const dispatch = useDispatch();

    return (
        <ScrollView style ={styles.screen}>
            <View style = {styles.container}>
            <Image
                source={{ uri: selectedProduct.imageUrl }}
                style={styles.image}
            />
            <View style={styles.actions} >
                <Button
                    color={Colors.primary}
                    title="Add to Cart"
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }}
                />
            </View>
            <Text style={styles.price} >
                ${selectedProduct.price.toFixed(2)}
            </Text>
            <Text style={styles.description} >
                {selectedProduct.description}
            </Text>
            </View>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}



const styles = StyleSheet.create({
    
    container:{
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:50,
        width : '94%',
        marginLeft :'3%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow:'hidden',
        
    },
    image: {
        width: '100%',
        height: 300
    },
    actions:{
      marginVertical:10,
      alignItems:'center' ,
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily :'open-sans-bold',
    },
    description: {
        fontSize: 15,
        fontFamily :'open-sans',
        textAlign: 'center',
        marginHorizontal: 20
    }
})

export default ProductDetailScreen;