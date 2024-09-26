import {ADDSUBCATEGORY, DELETESUBCATEGORY, SUBCATEGORY, UPDATESUBCATEGORY} from '../Actiontype';
import firestore from '@react-native-firebase/firestore';

export const subCategory = () => async dispatch => {
  try {
    let subcategory = [];
    await firestore()
      .collection('Sub Category')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'gggg',
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );

          subcategory.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
      });
    console.log('1..............', subcategory);
    dispatch({type: SUBCATEGORY, payload: subcategory});
  } catch (error) {
    console.log(error);
  }
};

export const addsubcategory = data => async dispatch => {
  try {
    await firestore()
      .collection('Sub Category')
      .add(data)
      .then(doc => {
        console.log('category added!');
        dispatch({type: ADDSUBCATEGORY, payload: {...data, id: doc.id}});
      });
  } catch (error) {
    console.log(error);
  }
};

export const deletesubcategory = id => async dispatch => {
  try {
    await firestore()
      .collection('Sub Category')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        dispatch({type: DELETESUBCATEGORY, payload: id});
      });
  } catch (error) {
    console.log(error);
  }
};

export const updatesubcategory = (data) => async (dispatch) => {
  try {
  
    const temp = {...data};
    delete temp.id;
  await firestore()
    .collection('Sub Category')
    .doc(data.id)
    .set(temp)
    .then(() => {
      console.log('User updated!');
      dispatch({type : UPDATESUBCATEGORY ,  payload : data})
    });
  } catch (error) {
    console.log(error);
  }
};
