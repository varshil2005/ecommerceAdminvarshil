import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decreament, increament } from '../Redux/Action/counter.action';
import { useDispatch, useSelector } from 'react-redux';

export default function Counter() {

    const  dispatch = useDispatch();
    const counter = useSelector(state => state.count);
    console.log(counter);


    const handleInc = () =>  {
        dispatch(increament());
    }

    const handleDec = () => {
        dispatch(decreament());
    }
  return (
    <View >
      <Text style = {{color : 'black'}}>Counter</Text>

    <TouchableOpacity onPress={handleInc}>
        <Text style = {{color : 'black'}}>+</Text>
    </TouchableOpacity>
    <Text style = {{color : 'black'}} >{counter.count}</Text>
    <TouchableOpacity onPress={handleDec}>
        <Text style = {{color : 'black'}}>-</Text>
    </TouchableOpacity>
    </View>
  )
}