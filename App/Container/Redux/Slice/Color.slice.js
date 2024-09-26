import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialstate = {
  isLoading: false,
  colordata: [],
  error: null,
};

export const addcolor = createAsyncThunk(
  'color/addcolor',

  async data => {
    console.log('kkkkkkkkkk', data);

    try { 
      let id = '';

      await firestore()
        .collection('Color')
        .add(data)
        .then(doc => {
          console.log('User added!');
          console.log('hllooooo', doc.id);
            id = doc.id;
        });

      return {...data, id: id};
    } catch (error) {
      console.log('oooyujknnnnnnnn', error);
    }
  },
);

export const getColor = createAsyncThunk('color/getColor', async () => {
  try {
    let color = [];
    await firestore()
      .collection('Color')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          // console.log("lllll",'User ID: ', documentSnapshot.id, documentSnapshot.data());

          color.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
          // console.log(data);
          console.log('hhhhhhhh', color);
        });
      });

    return color;
  } catch (error) {
    console.log(error);
  }
});

export const deletecolor = createAsyncThunk(
  'color/deletecolor',

  async id => {
    console.log('kkkkkkkkkk', id);

    try {
      console.log('idddddddddddd', id);
      await firestore()
        .collection('Color')
        .doc(id)
        .delete()
        .then(doc => {
          console.log('delete', 'User deleted!');
        });

      return id;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updatecolor = createAsyncThunk(
  'color/updatecolor',

  async data => {
    console.log('kkkkkkkkkk', data);

    try {
      const temp = {...data};
      delete temp.id;
      console.log('temppp', temp);
      await firestore()
        .collection('Color')
        .doc(data.id)
        .set(temp)
        .then(() => {
          console.log('User Update');
        });

        return data

    } catch (error) {
      console.log(error);
    }
  },
);

const colorslice = createSlice({
  name: 'Brand',
  initialState: initialstate,
  extraReducers: builder => {
    builder.addCase(addcolor.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('nnnnnnn', action);
      state.isLoading = false
      state.colordata =  state.colordata.concat(action.payload);
      state.error = null
    })

   .addCase(getColor.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.colordata = action.payload;
      state.error = null
    })

 .addCase(deletecolor.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.colordata =state.colordata.filter((v) => v.id !== action.payload);
      state.error = null
    })

   .addCase(updatecolor.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.colordata =state.colordata.map((v) => {
        if (v.id == action.payload.id) {
            return action.payload;
        } else {
            return v;
        }
    })
      state.error = null
    })
  },
});

export default colorslice.reducer;
