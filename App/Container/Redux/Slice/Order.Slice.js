import firestore from '@react-native-firebase/firestore';
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


   

    return Orderdata
  },
);



export const OrderSlice = createSlice({
  name: 'Order',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.Order = action.payload;
    });
}
});

export default OrderSlice.reducer;
