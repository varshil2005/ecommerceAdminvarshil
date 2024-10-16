import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder} from '../Redux/Slice/Order.Slice';
import {loadBundle} from '@react-native-firebase/firestore';

const Data = [
  {
    id: 0,
    Order_no: 'Order №1947034',
    Date: '05-12-2019',
    tracking_number: 'IW3475453455',
    quantity: 3,
    total_amount: 112,
  },
  {
    id: 0,
    Order_no: 'Order №1947972',
    Date: '03-11-2020',
    tracking_number: 'IW3475553555',
    quantity: 4,
    total_amount: 110,
  },
  {
    id: 0,
    Order_no: 'Order №1947678',
    Date: '08-08-2021',
    tracking_number: 'IW3477457755',
    quantity: 6,
    total_amount: 118,
  },
  {
    id: 0,
    Order_no: 'Order №1947777',
    Date: '07-07-2022',
    tracking_number: 'IW3477777777',
    quantity: 7,
    total_amount: 150,
  },
];

const DataStructure = ({v, n}) => (
  <TouchableOpacity>
    <View style={Styles.orderDatamainBody}>
      <View style={{marginTop: 6}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={Styles.orderData1}>{v?.OrederNo}</Text>
          <Text style={Styles.orderData2}>{v?.orderDate}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={Styles.orderData2}>Tracking number:</Text>
          <Text style={Styles.orderData1}>{v?.tracking_number}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={Styles.orderData2}>Quantity : </Text>
            {/* <Text style={Styles.orderData1}>
              {v?.cart.reduce((sum, v1) => v1.qtn + sum, 0)}
            </Text> */}
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={Styles.orderData2}>Total Amount : </Text>
            <Text style={Styles.orderData1}>{v?.totalAmount} rs</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={Styles.orderData2}>Address : </Text>
          <Text style={Styles.orderData1}>{v?.address?.address}</Text>
        </View>

        <View style={Styles.detailBtnHead}>
          <View style={Styles.detaildBtn}>
            <TouchableOpacity onPress={() => n.navigate('OrderDeatils', v)}>
              <Text style={Styles.detaildBtnText}>Details</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <Text style={Styles.delieverdText}>{v?.status}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function Order({route, navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder());

  }, []);

  const OrderDetails = useSelector(state => state.order);
  console.log('qwerfgsd', OrderDetails?.Order);
  // console.log("sasdsfdsfvvv",OrderDetails?.Order[0]?.Order[0]?.cart[0]?.qtn);

  const Alldata = OrderDetails?.Order.flatMap((v, i) => v?.Order)
  console.log("asdaaaaaasdasds",Alldata);
  

  return (
    <ScrollView>
      <StatusBar backgroundColor="#F4F4F4" barStyle="dark-content" />
      <View style={{width: '100%',backgroundColor: '#F4F4F4'}}>
        {/* <View style={Styles.mainIcon}>
            <TouchableOpacity>
              <EvilIcons name="chevron-left" size={45} color="#222222" />
            </TouchableOpacity>
  
            <TouchableOpacity>
              <EvilIcons name="search" size={35} color="#222222" />
            </TouchableOpacity>
          </View>
  
          <Text style={Styles.myOrderText}>My orders</Text> */}

        <View style={Styles.delievered}>
          <TouchableOpacity>
            <Text style={Styles.delieveredBtn}>Delivered</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={Styles.process}>Processing</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={Styles.process}>Cancelled</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Alldata}
          renderItem={({item}) => <DataStructure v={item} n={navigation} />}
          keyExtractor={(item, index) => String(index)}
      
     

        />
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  // mainIcon: {
  //   width: 1000,
  //   height: 30,
  //   // borderWidth: 1,
  //   flexDirection: 'row',
  //   // marginHorizontal: 16,
  //   columnGap: 240,
  //   marginTop: 10,
  // },
  // myOrderText: {
  //   // width:"90%",
  //   // height:30,
  //   // borderWidth:1,
  //   marginHorizontal: 16,
  //   marginTop: 18,
  //   fontFamily: 'Metropolis-Bold',
  //   fontSize: 34,
  //   color: '#222222',
  // },


   
  delievered: {
    width: 90,
    height: 30,
    flexDirection: 'row',
    // borderWidth:1,
    marginHorizontal: 16,
    marginTop: 15,
    columnGap: 35,
  },
  delieveredBtn: {
    width: 100,
    height: 30,
    backgroundColor: '#222222',
    borderRadius: 50,
    fontSize: 14,
    textAlign: 'center',
    padding: 6,
    padding: 6,
    color: '#FFFFFF',
    fontFamily: 'Metropolis-Regular',
  },
  process: {
    textAlign: 'center',
    padding: 5,
    padding: 5,
  },
  orderDatamainBody: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 5,
    marginHorizontal: 18,
    marginTop: 30,
    padding: 10,
    padding: 10,
  },
  orderData1: {
    fontFamily: 'Metropolis-Bold',
    color: '#222222',
    lineHeight: 24,
  },
  orderData2: {
    fontFamily: 'Metropolis-Regular',
    color: '#9B9B9B',
    lineHeight: 24,
  },
  detaildBtn: {
    width: 100,
    height: 38,
    borderWidth: 1,
    borderRadius: 50,
  },
  detaildBtnText: {
    fontFamily: 'Metropolis-Regular',
    color: '#222222',
    textAlign: 'center',
    padding: 8,
    padding: 8,
  },
  detailBtnHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 128,
    marginTop: 30,
  },
  delieverdText: {
    textAlign: 'center',
    color: '#2AA952',
    fontFamily: 'Metropolis-Regular',
    marginTop: 10,
  },
});

// import {
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   StyleSheet,
//   a,
//   Image,
//   ScrollView,
// } from 'react-native';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import React from 'react';
// import {
//   ,
//   moderateScale,
//   verticalScale,
// } from '../../../assets/metrics/Metrics';

// export default function My_profile( {route , navigation}) {
//   return (
//     <ScrollView>
//       <StatusBar backgroundColor="#fff" barStyle="dark-content" />

//       <View style={Styles.container}>
//         <View style={Styles.search}>
//           <TouchableOpacity>
//             <EvilIcons name="search" size={32} color="#222222" />
//           </TouchableOpacity>
//         </View>

//         <Text style={Styles.myProfile}>My Profile</Text>

//         <View style={Styles.profileHead}>
//           <Image
//             style={Styles.Profileimg}
//             source={require('../../../assets/image/my_orders_girl_profile_img.png')}
//           />

//           <View style={Styles.matildabrownTextMAin}>
//             <Text style={Styles.matildabrownText}>Matilda Brown</Text>
//             <Text style={Styles.matildabrowngmailText}>
//               matildabrown@mail.com
//             </Text>
//           </View>
//         </View>

//         <View style={Styles.datamain}>
//           <View style={Styles.dataHead}>
//             <TouchableOpacity>
//               <Text style={Styles.data1}>My orders</Text>
//               <Text style={Styles.data2}>Already have 12 orders</Text>
//             </TouchableOpacity>

//             <View>
//               <TouchableOpacity>
//                 <MaterialIcons
//                   name="keyboard-arrow-right"
//                   size={30}
//                   color="#9B9B9B"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={Styles.dataHead}>
//             <View>
//               <Text style={Styles.data1}>Shipping addresses</Text>
//               <Text style={Styles.data2}>3 ddresses</Text>
//             </View>

//             <View>
//               <TouchableOpacity>
//                 <MaterialIcons
//                   name="keyboard-arrow-right"
//                   size={30}
//                   color="#9B9B9B"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={Styles.dataHead}>
//             <View>
//               <Text style={Styles.data1}>Payment methods</Text>
//               <Text style={Styles.data2}>Visa **34</Text>
//             </View>

//             <View>
//               <TouchableOpacity>
//                 <MaterialIcons
//                   name="keyboard-arrow-right"
//                   size={30}
//                   color="#9B9B9B"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={Styles.dataHead}>
//             <View>
//               <Text style={Styles.data1}>Promocodes</Text>
//               <Text style={Styles.data2}>You have special promocodes</Text>
//             </View>

//             <View>
//               <TouchableOpacity>
//                 <MaterialIcons
//                   name="keyboard-arrow-right"
//                   size={30}
//                   color="#9B9B9B"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={Styles.dataHead}>
//             <View>
//               <Text style={Styles.data1}>My reviews</Text>
//               <Text style={Styles.data2}>Reviews for 4 items</Text>
//             </View>

//             <View>
//               <TouchableOpacity>
//                 <MaterialIcons
//                   name="keyboard-arrow-right"
//                   size={30}
//                   color="#9B9B9B"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={Styles.dataHead}>
//             <View>
//               <Text style={Styles.data1}>Settings</Text>
//               <Text style={Styles.data2}>Notifications, password</Text>
//             </View>

//             <View>
//               <TouchableOpacity>
//                 <MaterialIcons
//                   name="keyboard-arrow-right"
//                   size={30}
//                   color="#9B9B9B"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const Styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginHorizontal: horizontalScale(15),

//   },
//   search: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: verticalScale(40),
//   },
//   myProfile: {
//     fontFamily: 'Metropolis-Bold',
//     fontSize: moderateScale(34),
//     color: '#222222',
//   },
//   Profileimg: {
//     width: horizontalScale(100),
//     height: verticalScale(100),
//     borderWidth: 1,
//     borderRadius: moderateScale(50),
//   },
//   profileHead: {
//     flexDirection: 'row',
//     marginTop: verticalScale(15),
//   },
//   matildabrownTextMAin: {
//     padding: horizontalScale(16),
//     padding: verticalScale(16),
//   },
//   matildabrownText: {
//     fontFamily: 'Metropolis-Bold',
//     fontSize: moderateScale(22),
//     color: '#222222',
//   },
//   matildabrowngmailText: {
//     fontFamily: 'Metropolis-Bold',
//     fontSize: moderateScale(14),
//     color: '#9B9B9B',
//   },
//   dataHead: {
//     paddingVertical:verticalScale(10),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//    elevation: 0.2,
//   },
//   data1: {
//     fontFamily: 'Metropolis-Bold',
//     fontSize: moderateScale(20),
//     lineHeight: 40,
//     color: '#222222',
//     marginTop: verticalScale(5),
//   },
//   data2: {
//     fontFamily: 'Metropolis-Regular',
//     fontSize: moderateScale(13),
//     color: '#9B9B9B',
//   },
//   datamain: {
//     fontFamily: 'Metropolis-Regular',
//     marginTop: verticalScale(25),
//   },
// });
