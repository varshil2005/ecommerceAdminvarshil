import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  ADDPRODUCT,
  DELETEPRODUCT,
  PRODUCTDATA,
  UPDATEPRODUCT,
} from '../Actiontype';

const initialstate = {
  isLoading: false,
  productdata: [],
  error: null,
};

export const productreducer = (state = initialstate, action) => {
  console.log(action);

  switch (action.type) {
    case PRODUCTDATA:
      return {
        isLoading: false,
        productdata: action.payload,
        error: null,
      };

    case ADDPRODUCT:
      return {
        isLoading: false,
        productdata: state.productdata.concat(action.payload),
        error: null,
      };

    case DELETEPRODUCT:
      return {
        isLoading: false,
        productdata: state.productdata.filter(v => v.id !== action.payload),
        error: null,
      };

    case UPDATEPRODUCT:
      return {
        isLoading: false,
        productdata: state.productdata.map(v => {
          if (v.id === action.payload.id) {
            return action.payload;
          } else {
            return v;
          }
        }),
        error: null,
      };

    default:
      return state;
  }
};

