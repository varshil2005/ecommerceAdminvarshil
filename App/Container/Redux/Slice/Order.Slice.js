import firestore, { firebase } from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


const initialState = {
  isLoading: false,
  Order: [],
  error: null,
};

export const getOrder = createAsyncThunk(
  'Order/getOrder',

  async () => {
    const Orderdata = [];
    await firestore()
      .collection('Order')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        //   console.log("lllllllllllllllllllllldfdsfs",c);

        querySnapshot.forEach(documentSnapshot => {
          Orderdata.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
      });

      console.log("asdasdasdasd",Orderdata);
      
    return Orderdata;
  },
);

export const UpdateStatus = createAsyncThunk(
  'Order/UpdateStatus',

  async (data) => {
    console.log('sfdsdfdf', data.newdata);

 
    const Orderdata = [];

  const userDoc = await firestore().collection('Order').doc(data.newdata.data.address.uid);
  const userref = await userDoc.get();

  console.log("sdsdfsdfsd",userref);
  try {

    await userDoc.update({
      Order: firebase.firestore.FieldValue.arrayRemove(
        data.Olddata
      ),
    });
   
      await userDoc.update({
        Order : firebase.firestore.FieldValue.arrayUnion(
          { ...data.newdata.data}
      )
      })
 

    const Orderdata = [];

    await firestore()
        .collection('Order')
        .doc(data.newdata.data.address.uid)
        .get()
        .then(documentSnapshot => {
          console.log(
            'sdfsdfsdfsdfsdfsdfsdfsdf',
            'User exists: ',
            documentSnapshot.exists,
          );

          if (documentSnapshot.exists) {
            console.log('User data: ', documentSnapshot.data());
            Orderdata.push({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          }
        });
      console.log('CartDataCartDataCartData', Orderdata);
    return Orderdata
  } catch (error) {
      console.log("dsfsdf",error);
      
  }

  

  }
);

export const OrderSlice = createSlice({
  name: 'Order',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.Order = action.payload;
    });
    builder.addCase(UpdateStatus.fulfilled, (state, action) => {
      state.Order = action.payload;
    });
  },
});

export default OrderSlice.reducer;
