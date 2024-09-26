import { ADDCATEGORY, CATEGORYDATA, DELETECATEGORY, UPDATECATEGORY } from "../Actiontype";
import firestore from '@react-native-firebase/firestore';

export const getcategory =  () => async(dispatch) =>  {
      
    
}

export const addCategory = (data) => async(dispatch) => {

    try {
      await firestore()
      .collection('Category')
      .add(data)
      .then((doc) => {
        console.log('category added!',doc.id);
        dispatch({type:ADDCATEGORY, payload:{...data , id:doc.id}})
      });

     
    } catch (error) {
      console.log(error);
    }
}

export const deletecategoty = (id) => async(dispatch) => {
  
   try {
    console.log("idddddddddddd",id);
    await firestore()
    .collection('Category')
    .doc(id)
    .delete()
    .then((doc) => {
      console.log('delete', 'User deleted!');
      dispatch({type : DELETECATEGORY , payload : id})
    });

   } catch (error) {
      console.log(error);
   }
}

export const editcategory = (data) => async(dispatch) => {
  try {
    console.log("hello sdjbs");
    const temp = {...data};
    delete temp.id;
    console.log("temppp", temp);
    await firestore()
        .collection('Category')
        .doc(data.id)
        .set(temp)
        .then(() => {
          dispatch({type: UPDATECATEGORY , payload : data})
        });
  } catch (error) {
    console.log(error);
  }
}