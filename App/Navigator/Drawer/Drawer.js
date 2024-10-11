import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Contact from '../../Container/Contact';
import Category from './Category';
import SubCategory from './SubCategory';
import Product from './Product';
import Category1 from '../../Container/Category1';
import Categoryf from '../../Container/CategoryFj/Categoryf';
import Counter from '../../Container/Counter/Counter';
import Brand from '../../Container/Brand/Brand';
import Color from '../../Container/Color/Color';
import Order from '../../Container/Order/Order';
import OrderDeatils from '../../Container/OrderDetails/OrderDeatils';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

export default function Drawer1() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Category" component={Category} />
            <Drawer.Screen name="Category1" component={Category1} />
            <Drawer.Screen name="SubCategory" component={SubCategory} />
            <Drawer.Screen name="Product" component={Product} />
            <Drawer.Screen name="Categoryf" component={Categoryf} />
            <Drawer.Screen name="counter" component={Counter} />
            <Drawer.Screen name="Brand" component={Brand} />
            <Drawer.Screen name="Color" component={Color} />
            <Drawer.Screen name="Order" component={Order} />
            <Drawer.Screen name="OrderDeatils" component={OrderDeatils} />
            
           
        </Drawer.Navigator>
    )
}