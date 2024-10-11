import 'react-native-gesture-handler';

import Order from '../Container/Order/Order';
import OrderDeatils from '../Container/OrderDetails/OrderDeatils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();




export const Orderstack = () => {

    
    return (
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen
            name="OrderDeatils"
            component={OrderDeatils}/>

          </Stack.Navigator>

        )
}