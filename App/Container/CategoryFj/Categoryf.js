import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFormik, validateYupSchema, yupToFormErrors} from 'formik';
import firestore from '@react-native-firebase/firestore';
import {object, string} from 'yup';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCategory,
  deletecategoty,
  editcategory,
  getcategory,
} from '../Redux/Action/category.action';

export default function Categoryf() {
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setupdate] = useState(null);
  // const [isconnected , setisconnected] = useState(true)

  const dispatch = useDispatch();

  const categoryd = useSelector(state => state.category);
  console.log('ooooooooooo', categoryd.categorydata);

  useEffect(() => {
    getData();
  }, []);

  let userSchema = object({
    name: string()
      .required('Please enter name')
      .matches(/^[a-zA-Z ]+$/, 'Please enter valid name'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: userSchema,
    onSubmit: (values, {resetForm}) => {
      console.log('dsdd', values.name);


        handleSubmit1(values);
       
       resetForm();
    },
  });

  const getData = () => {
    dispatch(getcategory());
  };

  const handleSubmit1 = async data => {
    setModalVisible(!modalVisible);
    // console.log("hhhhhhh",update);
    if (update) {
      dispatch(editcategory(data))
    } else {
      dispatch(addCategory(data));
    }


     getData();
     setupdate(null)
  };

  const handleDelete = async id => {
    console.log('eeeeeeeeeeee', id);
    dispatch(deletecategoty(id));
  };

  const handleedit = async (data) => {
    setModalVisible(true);
    setValues(data)
    setupdate(data.id)

  };


  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    setValues,
  } = formik;
  // console.log(values.name);

  // console.log('ssdsd', errors.name);

  return (
    <ScrollView style={{position: 'relative'}}>
      <Modal
        isVisible={modalVisible}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //     Alert.Alert('Modal has been closed.');
        //     setModalVisible(!modalVisible);
        // }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Add Category Name</Text>
            <TextInput
              name="category"
              placeholder="Category Name"
              style={style.input}
              onChangeText={handleChange('name')}
              value={values.name}
              onBlur={handleBlur('name')}
              placeholderTextColor={'black'}></TextInput>
            <Text style={{color: 'red'}}>
              {errors.name && touched.name ? errors.name : ''}
            </Text>
            <Pressable
              style={style.submitbutton}
              onPress={() => handleSubmit()}>
              <Text
                style={{textAlign: 'center', paddingTop: 7, color: 'white'}}>
                {update ? 'Update' : 'Submit'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={style.button}
        onPress={() => setModalVisible(true)}>
        <Text style={{textAlign: 'center', paddingTop: 7, color: 'white'}}>
          ADD Category
        </Text>
      </TouchableOpacity>

      {categoryd.categorydata.map((v, i) => (
        <View style={style.listname} key={i}>
          <Text style={style.listtext}>{v.name}</Text>
          <View style={{flexDirection: 'row', marginRight: 10}}>
            <TouchableOpacity
              style={{marginRight: 20}}
              onPress={() => handleedit(v)}>
              <EvilIcons name="pencil" size={35} color="black"></EvilIcons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(v.id)}>
              <Text>
                <MaterialIcons
                  name="delete"
                  size={30}
                  color="red"></MaterialIcons>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  button: {
    width: 120,
    // backgroundColor: '#2196F3',
    height: 35,
    marginTop: 20,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#F194FF',
  },

  submitbutton: {
    width: 120,
    marginTop: 20,
    height: 35,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: '#F194FF',
  },

  input: {
    width: 190,
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0.5,
    color: 'black',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },

  listmainview: {
    width: '90%',
    // borderWidth : 2,
    // borderColor : 'white',
    marginHorizontal: 'auto',
    marginTop: 70,
    // backgroundColor : 'white',
  },

  listtext: {
    fontSize: 20,
    color: 'green',
  },

  listname: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
});
