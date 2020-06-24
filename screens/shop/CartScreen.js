import React,{useState} from 'react';
import { Text, StyleSheet,FlatList, View,Button, ActivityIndicator } from 'react-native';
import {useSelector , useDispatch} from 'react-redux';


import Colors from '../../constants/Color';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order'
import Card from '../../components/UI/Card'
import { isLoading } from 'expo-font';

const CartScrenn = props => {
    const [isLoading , setIsLoading] = useState(false);
   
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        
        const tranformedCartItems = [];
        for(const key in state.cart.items ){
            tranformedCartItems.push({
                productId : key,
                productTitle : state.cart.items[key].productTitle,
                productPrice : state.cart.items[key].productPrice,
                quantity : state.cart.items[key].quantity,
                sum : state.cart.items[key].sum
            });
        }
        return tranformedCartItems.sort((a,b) =>
            a.productId > b.productId ? 1 : -1
        )
        

    });

    const dispatch = useDispatch();

//Confirm a Order
    const sendOrderHandler = async () => {
        setIsLoading(true);
         await dispatch(ordersActions.addOrder(cartItems , cartTotalAmount));
         setIsLoading(false);

    }

    return (
        <View style = {styles.screen}>
            <Card style = {styles.summary}>
                <Text style ={styles.summaryText}>
                    Total : 
                        <Text style ={styles.amount}> 
                            ${Math.round(cartTotalAmount.toFixed(2) * 100)/ 100}
                        </Text>
                </Text>
                {isLoading
                    ? <ActivityIndicator size='small' color={Colors.primary} />
                    : <Button
                        color={Colors.primary}
                        title="Order Now"
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                    />
                }
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    />
                )}
            />
        </View>

    );
}


export default CartScrenn;

const styles = StyleSheet.create({
    screen : {
        margin :20
    },
    summary :{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom :20,
        padding:10, 
    },
    summaryText :{
        fontFamily:'open-sans-bold',
        fontSize :18
    },
    amount :{
        color : Colors.accent
    }
});