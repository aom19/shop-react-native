import React,{ useEffect ,useState} from 'react';
import { StyleSheet,FlatList, View,Text ,ActivityIndicator} from 'react-native';
import { useSelector,useDispatch} from 'react-redux'
import { HeaderButtons ,Item} from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/order';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const OrdersScreen = props =>{
    const [isLoading , setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect( () =>{
        setIsLoading(true)
        dispatch(orderActions.fetchOrders()).then(()=> {
            setIsLoading(false);
        }); 
    },[dispatch])

    if (isLoading) {
        return (
            <View style = {styles.spinner}> 
                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                />
            </View>)
    }
    if ( orders.length === 0 ) {
        return (
            <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <Text> 
                    No order  found , maybe start ordering something ?
                </Text>
            </View>
        )
    }


    return(
        <FlatList 
            data= {orders}
            keyExtractor={item => item.id}
            renderItem ={ itemData =>  <OrderItem 
                  amount ={itemData.item.totalAmount}
                  date = {itemData.item.readableDate}
                  items = {itemData.item.items}
                />
            }
        />
        
    );
};


OrdersScreen.navigationOptions = navData =>{
    return{
        headerTitle :'Your Orders',
        headerLeft : () =>(
            <HeaderButtons HeaderButtonComponent ={HeaderButton}>
                <Item 
                    title= "Menu"
                    iconName ={Platform.OS === 'android' ? 'md-menu' :'ios-menu'}
                    onPress ={() =>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
   
}

const styles = StyleSheet.create({
    spinner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default OrdersScreen;