import React,{useState} from 'react';
import {View,Text, StyleSheet, Platform ,Button} from 'react-native';


import CartItem from './CartItem';
import  Colors  from '../../constants/Color'
import Card from '../UI/Card';

const OrderItem = props =>{
    const [showDetails , setShowDetails] = useState(false);
    return (
        <Card style = {styles.orderItem}>
            <View style = {styles.summary}> 
                <Text style = {styles.totalAmount}>Total : ${props.amount.toFixed(2)}</Text>
                <Text style = {styles.date}>{props.date}</Text>
            </View>
            <Button 
                title = {showDetails ?'Hide Details' :"Show details"} 
                color = {Colors.primary}
                onPress = {() =>{
                    setShowDetails(prevState =>!prevState)
                }}
            />
            {showDetails && 
                <View style = {styles.detailScreen}> 
                    {props.items.map(cartItem => 
                        <CartItem 
                        key = {cartItem.productId}
                        quantity = {cartItem.quantity}
                        amount ={cartItem.sum}
                        title ={cartItem.productTitle}
                        />
                    )}
                </View>
            }
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem:{
        margin :20,
        padding:10,
        alignItems:'center'

    },
    summary:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginBottom : 15 
    },
    totalAmount:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    date:{
        fontSize : 16,
        fontFamily:'open-sans',
        color:'#888'

    },
    detailScreen:{
        width:'100%'
    }
})

export default OrderItem;