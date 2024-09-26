import {ADDSUBCATEGORY, DELETESUBCATEGORY, SUBCATEGORY, UPDATESUBCATEGORY} from '../Actiontype';

const initialstate = {
  isLoading: false,
  subCategorydata: [],
  error: null,
};

export const subCategoryReucer = (state = initialstate, action) => {
  console.log('3....', action);
  switch (action.type) {
    case SUBCATEGORY:
      return {
        isLoading: false,
        subCategorydata: action.payload,
        error: null,
      };
    case ADDSUBCATEGORY:
      return {
        isLoading: false,
        subCategorydata: state.subCategorydata.concat(action.payload),
        error: null,
      };
    
    case DELETESUBCATEGORY : 
      return {
        isLoading: false,
        subCategorydata: state.subCategorydata.filter((v) => v.id !== action.payload),
        error: null,
      }
    case UPDATESUBCATEGORY : 
      return {
        isLoading: false,
        subCategorydata: state.subCategorydata.map((v) => {
          if (v.id === action.payload.id) {
            return action.payload;
          } else {
            return v;
          }
        }),
        error: null,
    }
    default:
      return state;
  }
};
