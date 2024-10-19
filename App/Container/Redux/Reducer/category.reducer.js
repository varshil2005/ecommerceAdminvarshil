import {
  ADDCATEGORY,
  CATEGORYDATA,
  DELETECATEGORY,
  UPDATECATEGORY,
} from '../Actiontype';

const initialstate = {
  isLoading: false,
  categorydata: [],
  error: null,
};

export const categoryreader = (state = initialstate, action) => {
  console.log('ffff', action);
  switch (action.type) {
    case CATEGORYDATA:
      return {
        isLoading: false,
        categorydata: action.payload,
        error: null,
      };

    case ADDCATEGORY:
      return {
        isLoading: false,
        categorydata: state.categorydata.concat(action.payload),
        error: null,
      };

    case DELETECATEGORY:
      return {
        isLoading: false,
        categorydata: state.categorydata.filter((v) => v._id !== action.payload),
        error: null,
      };

    case UPDATECATEGORY:
      return {
        isLoading: false,
        categorydata: state.categorydata.map((v) => {
            if (v._id == action.payload.id) {
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
