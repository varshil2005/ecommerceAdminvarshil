import firestore, {updateDoc} from '@react-native-firebase/firestore';
import {
  ADDPRODUCT,
  DELETEPRODUCT,
  PRODUCTDATA,
  UPDATEPRODUCT,
} from '../Actiontype';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import storage from '@react-native-firebase/storage';

const initialstate = {
  isLoading: false,
  productdata: [],
  error: null,
};

export const getproduct = () => async dispatch => {
  try {
    let productdata = [];
    await firestore()
      .collection('Product')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'gggg',
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );

          productdata.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
      });
    dispatch({type: PRODUCTDATA, payload: productdata});
  } catch (error) {
    console.log(error);
  }
};

export const addproduct = data => async dispatch => {
  try {
    console.log('asdasddasdasd', data);

    if (data.url === '') {
      await firestore()
        .collection('Product')
        .add({...data, url: data.url})
        .then(doc => {
          console.log('Product added!');
          dispatch({
            type: ADDPRODUCT,
            payload: {...data, id: doc.id, url: data.url},
          });
        });
    } else {
      const arr = data.url.split('/');

      console.log(arr[arr.length - 1]);

      const Rno = Math.floor(Math.random() * 10000);

      const filename = Rno + arr[arr.length - 1];
      console.log('finamjaisfhasf', filename);

      const reference = await storage().ref('/Product/' + filename);
      console.log('referrrr', reference);

      const task = await reference.putFile(data.url);

      const url = await storage()
        .ref('/Product/' + filename)
        .getDownloadURL();
      console.log('urlurlrurl', url);

      await firestore()
        .collection('Product')
        .add({...data, url: url, imagename: filename})
        .then(doc => {
          console.log('Product added!');
          dispatch({
            type: ADDPRODUCT,
            payload: {...data, id: doc.id, url: url, imagename: filename},
          });
        });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteproduct = id => async dispatch => {
  try {
    await firestore()
      .collection('Product')
      .doc(id)
      .delete()
      .then(doc => {
        console.log('User deleted!');
        dispatch({type: DELETEPRODUCT, payload: id});
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateproduct = data => async dispatch => {
  try {
    console.log('kkkkkkkkkkkkkkkkk', data);

    if (data.url === '') {
      console.log('hjkhjkhjkhkl');

      await firestore()
        .collection('Product')
        .doc(data.id)
        .update({
          url: data.url,
          Brand_id: data.Brand_id,
          Color_id: data.Color_id,
          Subcategory_id: data.Subcategory_id,
          category_id: data.category_id,
          desc: data.desc,
          name: data.name,
          price: data.price,
        })
        .then(() => {
          console.log('User updated!');
          dispatch({
            type: UPDATEPRODUCT,
            payload: {
              ...data,
              url: data.url,
              Brand_id: data.Brand_id,
              Color_id: data.Color_id,
              Subcategory_id: data.Subcategory_id,
              category_id: data.category_id,
              desc: data.desc,
              name: data.name,
              price: data.price,
            },
          });
        });
    } else {
      let check = data.url.split('/')[0];
      console.log('checkcjffsda', check);

      // console.log('AFAFASDFASDF', data?.imagename);

      if (check == "https:") {
        console.log("lllllsdhuasvdashdas");
        
        await firestore()
          .collection('Product')
          .doc(data.id)
          .update({
            url: data.url,
            Brand_id: data.Brand_id,
            Color_id: data.Color_id,
            Subcategory_id: data.Subcategory_id,
            category_id: data.category_id,
            desc: data.desc,
            name: data.name,
            price: data.price,
          })
          .then(() => {
            console.log('User updated!');
            dispatch({
              type: UPDATEPRODUCT,
              payload: {
                url: data.url,
                Brand_id: data.Brand_id,
                Color_id: data.Color_id,
                Subcategory_id: data.Subcategory_id,
                category_id: data.category_id,
                desc: data.desc,
                name: data.name,
                price: data.price,
              },
            });
          });
      } else {
        console.log('lllllll', data);

        if (data?.imagename) {
          const reference = await storage().ref('/Product/' + data?.imagename);
          reference.delete();
        }
        const arr = data.url.split('/');

        console.log(arr[arr.length - 1]);

        const Rno = Math.floor(Math.random() * 10000);

        const filename = Rno + arr[arr.length - 1];
        console.log('finamjaisfhasf', filename);

        const reference = await storage().ref('/Product/' + filename);
        console.log('referrrr', reference);

        const task = await reference.putFile(data.url);

        const url = await storage()
          .ref('/Product/' + filename)
          .getDownloadURL();
        console.log('urlurlrurl', url);

        await firestore()
          .collection('Product')
          .doc(data.id)
          .update({
            url: url,
            Brand_id: data.Brand_id,
            Color_id: data.Color_id,
            Subcategory_id: data.Subcategory_id,
            category_id: data.category_id,
            desc: data.desc,
            name: data.name,
            price: data.price,
            imagename: filename,
          })
          .then(() => {
            console.log('User updated!');
            dispatch({
              type: UPDATEPRODUCT,
              payload: {
                url: url,
                Brand_id: data.Brand_id,
                Color_id: data.Color_id,
                Subcategory_id: data.Subcategory_id,
                category_id: data.category_id,
                desc: data.desc,
                name: data.name,
                price: data.price,
                imagename: filename,
              },
            });
          });
      }
    }
  } catch (error) {
    console.log('rerwerwerwe', error);
  }
};
