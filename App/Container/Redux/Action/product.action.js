import firestore, { updateDoc } from '@react-native-firebase/firestore';
import { ADDPRODUCT, DELETEPRODUCT, PRODUCTDATA, UPDATEPRODUCT } from '../Actiontype';

export const getproduct = () => async(dispatch) => {
    try {
        let productdata = [];
        await firestore()
          .collection('Product')
          .get()
          .then(querySnapshot => {
            // console.log('Total users: ', querySnapshot.size);
    
            querySnapshot.forEach(documentSnapshot => {
            //   console.log(
            //     'gggg',
            //     'User ID: ',
            //     documentSnapshot.id,
            //     documentSnapshot.data(),
            //   );
    
              productdata.push({
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              });
            });
          });
          dispatch({type : PRODUCTDATA , payload : productdata})
    } catch (error) {
        console.log(error);
    }
}


export const addproduct  = (data) => async(dispatch) => {
    try {
        await firestore()
        .collection('Product')
        .add(data)
        .then((doc) => {
          console.log('Product added!');
          dispatch({type : ADDPRODUCT , payload : {...data , id : doc.id}});
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteproduct = (id) => async(dispatch) => {
    try {
        
        await firestore()
        .collection('Product')
        .doc(id)
        .delete()
        .then((doc) => {
          console.log('User deleted!');
          dispatch({type :DELETEPRODUCT , payload : id})
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateproduct = (data) => async(dispatch) => {
    try {
        const temp = {...data}
        delete temp.id;
        await firestore()
        .collection('Product')
        .doc(data.id)
        .set(temp)
        .then(() => {
          console.log('User updated!');
          dispatch({type : UPDATEPRODUCT , payload : data})
        });
    } catch (error) {
        console.log(error);
    }
}