import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decreament, increament } from '../Redux/Action/counter.action';
import { useDispatch, useSelector } from 'react-redux';
import { CounterContext } from '../../Context/Countercontext';

export default function Counter() {

    // const  dispatch = useDispatch();
    // const counter = useSelector(state => state.count);
    // console.log(counter);

    const co = useContext(CounterContext)

  console.log("asdasdas",co);
  
    const handleInc = () =>  {
       co.increment(co.counter)
    }

    const handleDec = () => {
       co.decrement(co.counter)
    }
  return (
    <View >
      <Text style = {{color : 'black'}}>Counter</Text>

    <TouchableOpacity onPress={handleInc}>
        <Text style = {{color : 'black'}}>+</Text>
    </TouchableOpacity>
    <Text style = {{color : 'black'}} >{co.counter}</Text>
    <TouchableOpacity onPress={handleDec}>
        <Text style = {{color : 'black'}}>-</Text>
    </TouchableOpacity>
    </View>
  )
}