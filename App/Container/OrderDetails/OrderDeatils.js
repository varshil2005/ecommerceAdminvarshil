import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { horizontalScale, moderateScale, verticalScale } from '../../../assets/metrics/Metrics';
import {useDispatch, useSelector} from 'react-redux';
import {GetOrder} from '../Redux/Slice/Order.Slice';
import {getBag} from '../Redux/Slice/Cart.Slice';
import {getproduct} from '../Redux/Action/product.action';
import {getColor} from '../Redux/Slice/Color.slice';
import DropDownPicker from 'react-native-dropdown-picker';
// import { getPrdouct } from '../Redux/Slice/Product.slice';
// import { getcolor } from '../Redux/Slice/Color.Slice';

export default function OrderDeatils({route, navigation}) {
  console.log('klklklklklk', route.params);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pending', value: 'Pending'},
    {label: 'Accept', value: 'Accept'},
    {label: 'Reject', value: 'Reject'},
    {label: 'Tansisit', value: 'Tansisit'},
    {label: 'Deliver', value: 'Deliver'},
    {label: 'Cancel', value: 'Cancel'},

  ]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproduct());
    dispatch(getColor());
  }, []);

  const productdata = useSelector(state => state.product);
  console.log('Kkkkkkk', productdata);

  const colordata = useSelector(state => state.color);
  console.log('kkkkkkkk', colordata);

  const FilterCart = productdata.productdata.filter(v =>
    route.params.cart.some(v1 => v1.pid === v.id),
  );

  console.log('dsaeee', FilterCart);

  //
  //   const Order = ({ v }) => (
  //     <View style={styles.ViewOrder}>
  //       <View>
  //         <Text style={styles.Order0}>OrderNo: <Text>{route.params.OrederNo}</Text></Text>
  //         <Text style={styles.Order2}>Trackingnumber: <Text style={styles.Order}>{route.params.Trackingnumber}</Text></Text>
  //       </View>
  //       <View>
  //         <Text style={styles.Order2}>{route.params.orderDate}</Text>
  //         <Text style={styles.Order3}>{route.params.status}</Text>
  //       </View>
  //
  //     </View>
  //   );

  const NewProductCard = ({v}) => (
    <TouchableOpacity style={styles.olldeta}>
      <Image source={{uri: v.url}} style={styles.img} />
      <View style={styles.pullovertext}>
        <Text style={styles.protext}>{v?.name}</Text>

        <Text style={styles.protext2}>{v?.desc}</Text>

        <View style={styles.Color}>
          <Text style={styles.Colortext}>
            color:
            <Text style={styles.colorsize}>
              {' '}
              {colordata.colordata.find(v1 => v1.id === v.Color_id)?.name}
            </Text>
          </Text>
        </View>

        <View style={styles.OrderDetails}>
          <TouchableOpacity>
            <Text style={styles.colorsize}>{v?.price}$</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      <StatusBar animated={true} backgroundColor={'transparent'} />

      <View style={styles.ViewOrder}>
        <View>
          <Text style={styles.Order0}>
            OrderNo: <Text>{route?.params?.OrederNo}</Text>
          </Text>
          <Text style={styles.Order2}>
            Trackingnumber:{' '}
            <Text style={styles.Order}>{route?.params?.Trackingnumber}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.Order2}>{route.params.orderDate}</Text>
          <Text style={styles.Order3}>{route.params.status}</Text>
        </View>
      </View>
      {/* <View style={styles.Ordertext}>
      <TouchableOpacity><FontAwesome name="angle-left" size={45} color="black" /></TouchableOpacity>
        <Text style={styles.Ordertext2}>Order Details</Text>
        <TouchableOpacity><Fontisto style={styles.searchicon} name="search" size={22} color="black" /></TouchableOpacity> 
      </View> */}

      {/* <FlatList
        data={Orderdata}
        renderItem={({ item }) => <Order v={item} />}
        keyExtractor={(item,index) => String(index)}
        scrollEnabled = {false}
      // horizontal={true}
      /> */}

      <View >
        <Text style={{color: 'black'}}>{FilterCart?.length} item</Text>
       
      </View>

      <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style = {styles.drop}
          placeholder={'Choose Status'}
        />
      <FlatList
        data={FilterCart}
        renderItem={({item}) => <NewProductCard v={item} />}
        keyExtractor={(item, index) => String(index)}
        scrollEnabled={false}
        // horizontal={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 19,
    paddingTop: 13,
  },
  olldeta: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 3,
  },
  pullovertext: {
    margin: '3%',
  },
  protext: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Metropolis-Bold',
  },
  protext2: {
    color: '#9B9B9B',
    fontSize: 14,
    // flexDirection:'row'
  },
  OrderDetails: {
    flexDirection: 'row',
    columnGap: 150,
    paddingTop: 18,
  },
  img: {
    width: '30%',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  drop : {
    width : 150,
    height : 30,
    marginTop : 10,
    marginBottom: 10,
  },
  Color: {
    flexDirection: 'row',
    columnGap: 35,
    paddingTop: 7,
  },
  Colortext: {
    color: '#9B9B9B',
  },
  colorsize: {
    color: 'black',
  },
  starrating: {
    color: '#9B9B9B',
    fontSize: 15,
    bottom: 3,
  },
  Ordertext: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10,
  },
  Ordertext2: {
    color: 'black',
    fontSize: 20,
    paddingTop: 8,
  },
  searchicon: {
    paddingTop: 9,
  },
  ViewOrder: {
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  Order0: {
    color: 'black',
    paddingTop: 7,
    paddingBottom: 8,
    fontFamily: 'Metropolis-Bold',
    fontSize: 18,
  },
  Order: {
    color: 'black',
    paddingTop: 7,
    paddingBottom: 8,
  },
  Order2: {
    color: '#B9B9B9',
    paddingTop: 7,
    paddingBottom: 8,
  },
  Order3: {
    color: '#2AA952',
    paddingTop: 7,
    paddingBottom: 8,
  },
});
