import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useDebugValue, useEffect, useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getcategory } from '../../Container/Redux/Action/category.action';
import { addsubcategory, deletesubcategory, subCategory, updatesubcategory } from '../../Container/Redux/Action/subcategory.action';

export default function SubCategory() {

  const [modalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [update, setupdate] = useState(null);
  const [selectdrop, setSelectdrop] = useState('');
  const [category , setcategory] = useState([]);
  const [items, setitems] = useState([]);
  


  let userSchema = object({
    name: string()
      .required('Please enter name')
      .matches(/^[a-zA-Z ]+$/, 'Please enter valid name'),
      categoryid: string().required('Please select category'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      categoryid : '',
    },

    validationSchema: userSchema,

    onSubmit: async (values, {resetForm}) => {
      console.log(values);
      setModalVisible(!modalVisible);
      handleSubmit1(values);
      resetForm();
      
    },
  });


  const categoryData = useSelector(state => state.category);
  console.log("Avvvvv",categoryData);

  const subcategoryData = useSelector(state => state.subcategory);
  console.log("hhhhhhhhhhhhhh" , subcategoryData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcategory());
    getData();
  },[]);


  const getData = async () => {
    dispatch(subCategory());
    setcategory(categoryData.categorydata)
    // console.log('Data', categorydata);
  };


  const handleSubmit1 = async (data) => {
    setModalVisible(!modalVisible);
    console.log('gggggggggggggggggggggggggggg', data);

    if (update) {
     dispatch(updatesubcategory(data))
    } else {
     dispatch(addsubcategory(data));
    }

    setupdate(null)
  };
// console.log("lllllllllllllllllllllllllllllllllllllllllllll",data);
  const handleDelete = async (id) => {
   dispatch(deletesubcategory(id));
    getData(data);
  };

  const handleedit = async (data) => {
    setModalVisible(true);
    setValues(data)
    setupdate(data.id)
    console.log("vvvvV",data);
  }
  
  console.log("oooooooooooooooooooooooo",value);

  const {
    handleChange,
    errors,
    values,
    handleSubmit,
    setFieldValue,
    setValues,
    touched,
    handleBlur,
  } = formik;

  // console.log("cccccccccc",category);

  return (
    <ScrollView style={{position: 'relative'}}>
      <Modal
        //  isVisible={modalVisible}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        //     setModalVisible(!modalVisible);
        // }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Add Sub Category</Text>

            <DropDownPicker
              open={open}
              items={categoryData.categorydata.map((v) => ({label: v.name, value: v.id}))}
              value={formik.values.categoryid}
              setItems={setitems}
              setOpen={setOpen}
              setValue={setValue}
              placeholder={'Choose Category.'}
              placeholderTextColor={'black'}
              onChangeText={handleChange('categoryid')}
              onSelectItem={items => setFieldValue('categoryid', items.value)}
              onPress={() => setSelectdrop(!selectdrop)}
              onBlur={handleBlur('categoryid')}
              itemTextStyle={{backgroundColor: 'blue', textColor: 'black'}}
              baseColor="rgba(0, 0, 0, 1)"
              dropDownContainerStyle={{
                backgroundColor: 'white',
                zIndex: 1000,
                elevation: 1000,
              }}
              
              
            />

            <Text style={{color: 'red', marginBottom: 20}}>
              {!selectdrop && touched.categoryid ? errors.categoryid : ''}
            </Text>

            <TextInput
              name="name"
              placeholder=" Sub Category Name"
              style={style.input}
              placeholderTextColor={'black'}
              onBlur={handleBlur('name')}
              onChangeText={handleChange('name')}
              value={values.name}></TextInput>

            <Text style={{color: 'red'}}>
              {errors.name && touched.name ? errors.name : ''}
            </Text>

            <Pressable style={style.submitbutton} onPress={handleSubmit}>
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
          ADD Sub Category
        </Text>
      </TouchableOpacity>

      <View style={style.listmainview}>
        {subcategoryData.subCategorydata.map((v, i) => (
          <View style={style.listname} key={i}>
            <Text style={style.listtext}>{categoryData.categorydata.find((v1) => v.categoryid === v1.id)?.name}</Text>
            <Text style={style.listtext}>{v.name}</Text>
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <TouchableOpacity style={{marginRight: 20}} onPress={() => handleedit(v)}>
                <Text>
                  <EvilIcons name="pencil" size={35} color="black"></EvilIcons>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(v.id)}>
                <Text>
                  <MaterialIcons name="delete" size={30} color="red">
                    
                  </MaterialIcons>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  button: {
    width: 140,
    // backgroundColor: '#2196F3',
    height: 35,
    marginTop: 20,
    position: 'absolute',
    right: 15,
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
    width: 210,
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
    marginTop: 60,
    // backgroundColor : 'white',
  },

  listtext: {
    fontSize: 10,
    color: 'green',
    marginLeft: '10',
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

  SubCategoryname: {
    fontSize: 20,
    color: 'green',
  },
});
