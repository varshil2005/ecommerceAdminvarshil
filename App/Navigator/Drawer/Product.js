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
import DropDownPicker from 'react-native-dropdown-picker';
import firestore, {updateDoc} from '@react-native-firebase/firestore';
import {number, object, string} from 'yup';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getcategory} from '../../Container/Redux/Action/category.action';
import {subCategory} from '../../Container/Redux/Action/subcategory.action';
import {
  addproduct,
  deleteproduct,
  getproduct,
  updateproduct,
} from '../../Container/Redux/Action/product.action';
import {getColor} from '../../Container/Redux/Slice/Color.slice';
import {getBrand} from '../../Container/Redux/Slice/Brand.slice';

export default function Product() {
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState([]);
  const [selectdrop, setSelectdrop] = useState('');
  const [selectdrop2, setSelectdrop2] = useState('');
  const [selectdrop3, setSelectdrop3] = useState('');
  const [selectdrop4, setSelectdrop4] = useState('');
  const [value, setValue] = useState(null);
  const [items, setitems] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items2, setitems2] = useState([]);

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [update, setupdate] = useState(null);
  const [category, setcategory] = useState([]);
  const [Subcategory, setSubcategory] = useState([]);

  const categoryData = useSelector(state => state.category);
  // console.log("4..................",categoryData);

  const subcategoryData = useSelector(state => state.subcategory);
  //  console.log("4..................",subcategoryData.subCategorydata);

  const productdata = useSelector(state => state.product);
  // console.log("productttttttttttttttttttttttt",productdata);

  const colordata = useSelector(state => state.color);
  //  console.log("productttttttttttttttttttttttt",colordata);

  const branddata = useSelector(state => state.Brand);
  console.log('productttttttttttttttttttttttt', branddata);
  useEffect(() => {
    getData();
    dispatch(getcategory());
    dispatch(subCategory());
    dispatch(getColor());
    dispatch(getBrand());
  }, []);

  const dispatch = useDispatch();

  let userSchema = object({
    name: string()
      .required('Please enter name')
      .matches(/^[a-zA-Z ]+$/, 'Please enter valid name'),
    category_id: string().required('Please select category'),
    Subcategory_id: string().required('Please select Sub category'),
    Color_id: string().required('Please select Color'),
    Brand_id: string().required('Please select Brand'),
    price: number().required().integer(),
    desc: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category_id: '',
      Subcategory_id: '',
      Color_id: '',
      Brand_id: '',
      price: '',
      desc: '',
    },

    validationSchema: userSchema,

    onSubmit: async (values, {resetForm}) => {
      // console.log('hhhhhhh');
      setModalVisible(!modalVisible);
      // console.log(values);

      handleSubmit1(values);
      resetForm();
    },
  });

  const getCategory = async () => {
    //   let categorydata = [];
    //   await firestore()
    //     .collection('Category')
    //     .get()
    //     .then(querySnapshot => {
    //       console.log('Total users: ', querySnapshot.size);
    //       querySnapshot.forEach(documentSnapshot => {
    //         console.log('jjjjj', 'User ID: ', documentSnapshot.id);
    //         categorydata.push({
    //           Id: documentSnapshot.id,
    //           ...documentSnapshot.data(),
    //         });
    //         //   setcategory(categorydata);
    //         console.log('lllllllll', categorydata);
    //       });
    //       setcategory(categorydata);
    //     });
    // setdata(categorydata);
  };

  // const getsubcategory = (id) => {

  //  const fdata = subcategoryData.subCategorydata.filter(v => v.categoryid === id);
  //   console.log('fdataaa', fdata);

  //     setitems2(fdata.map(v => ({label: v.name, value: v.id})));

  // };

  const getData = async () => {
    dispatch(getproduct());
    setdata(productdata);
    // console.log('Data', productdata);
  };

  const handleSubmit1 = async data => {
    if (update) {
      dispatch(updateproduct(data));
    } else {
      dispatch(addproduct(data));
    }

    setupdate(null);
  };

  const handleDelete = async id => {
    dispatch(deleteproduct(id));
    getData(data);
  };

  const handleedit = async data => {
    setModalVisible(true);
    setValues(data);
    setupdate(data.id);
    // console.log("vvvvV",data);
    // setSubcategory(data.category_id);
  };

  const {
    handleChange,
    errors,
    values,
    handleSubmit,
    setFieldValue,
    touched,
    handleBlur,
    setValues,
  } = formik;

  // console.log('rrrr', errors);
  // console.log('sssss', values);

  return (
    <ScrollView style={{position: 'relative'}}>
      <Modal
        //  isVisible={modalVisible}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(false);
        // }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Add Product </Text>
            <View>
              <DropDownPicker
                open={open}
                value={formik.values.category_id}
                items={categoryData.categorydata.map(v => ({
                  label: v.name,
                  value: v.id,
                }))}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setitems}
                placeholder={'Choose Category.'}
                onChangeText={handleChange('category_id')}
                onSelectItem={items =>
                  setFieldValue('category_id', items.value)
                }
                onPress={() => setSelectdrop(!selectdrop)}
                onBlur={handleBlur('category_id')}
              />
            </View>

            <Text style={{color: 'red', marginBottom: 20}}>
              {!selectdrop && touched.category_id ? errors.category_id : ''}
            </Text>

            <View style={style.dropdown2}>
              <DropDownPicker
                open={open2}
                value={formik.values.Subcategory_id}
                items={subcategoryData.subCategorydata
                  .filter(v => v.categoryid === value)
                  .map(v => ({label: v.name, value: v.id}))}
                setOpen={setOpen2}
                setValue={setValue2}
                placeholder={'Choose Sub Category.'}
                onChangeText={handleChange('Subcategory_id')}
                onSelectItem={items =>
                  setFieldValue('Subcategory_id', items.value)
                }
                onPress={() => setSelectdrop2(!selectdrop2)}
                onBlur={handleBlur('Subcategory_id')}
              />
            </View>

            <Text style={{color: 'red', marginBottom: 20}}>
              {!selectdrop2 && touched.Subcategory_id
                ? errors.Subcategory_id
                : ''}
            </Text>

            <View style={style.dropdown3}>
              <DropDownPicker
                open={open3}
                value={formik.values.Color_id}
                items={colordata.colordata.map(v => ({
                  label: v.name,
                  value: v.id,
                }))}
                setOpen={setOpen3}
                setValue={setValue3}
                placeholder={'Choose Color.'}
                onChangeText={handleChange('Color_id')}
                onSelectItem={items => setFieldValue('Color_id', items.value)}
                onPress={() => setSelectdrop2(!selectdrop2)}
                onBlur={handleBlur('Color_id')}
              />
            </View>

            <Text style={{color: 'red', marginBottom: 20}}>
              {!selectdrop3 && touched.Color_id ? errors.Color_id : ''}
            </Text>

            <View style={style.dropdown4}>
              <DropDownPicker
                open={open4}
                value={formik.values.Brand_id}
                items={branddata.branddata.map(v => ({
                  label: v.name,
                  value: v.id,
                }))}
                setOpen={setOpen4}
                setValue={setValue4}
                placeholder={'Choose Brand .'}
                onChangeText={handleChange('Brand_id')}
                onSelectItem={items => setFieldValue('Brand_id', items.value)}
                onPress={() => setSelectdrop2(!selectdrop2)}
                onBlur={handleBlur('Brand_id')}
              />
            </View>

            <Text style={{color: 'red', marginBottom: 20}}>
              {!selectdrop4 && touched.Brand_id ? errors.Brand_id : ''}
            </Text>

            <TextInput
              name="category"
              placeholder=" Product Name "
              style={style.input}
              value={values.name}
              onBlur={handleBlur('name')}
              onChangeText={handleChange('name')}
              placeholderTextColor={'black'}></TextInput>
            <Text style={{color: 'red'}}>
              {errors.name && touched.name ? errors.name : ''}
            </Text>
            <TextInput
              name="category"
              placeholder="  Product Price"
              style={style.input}
              value={values.price}
              onBlur={handleBlur('price')}
              onChangeText={handleChange('price')}
              placeholderTextColor={'black'}></TextInput>
            <Text style={{color: 'red'}}>
              {errors.price && touched.price ? errors.price : ''}
            </Text>
            <TextInput
              name="category"
              placeholder="Product Description"
              style={style.input}
              value={values.desc}
              onBlur={handleBlur('desc')}
              onChangeText={handleChange('desc')}
              placeholderTextColor={'black'}></TextInput>
            <Text style={{color: 'red'}}>
              {errors.desc && touched.desc ? errors.desc : ''}
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
          ADD Product
        </Text>
      </TouchableOpacity>

      <View style={style.listmainview}>
        {productdata.productdata.map((v, i) => (
          <View style={style.listname}>
            <View>
              <Text style={style.listtext}>
                {
                  categoryData.categorydata.find(v1 => v.category_id === v1.id)
                    ?.name
                }
              </Text>
              <Text style={style.listtext}>
                {
                  subcategoryData.subCategorydata.find(
                    v2 => v.Subcategory_id === v2.id,
                  )?.name
                }
              </Text>
              <Text style={style.listtext}>
                {colordata.colordata.find(v3 => v.Color_id === v3.id)?.name}
              </Text>
              <Text style={style.listtext}>
                {branddata.branddata.find(v4 => v.Brand_id === v4.id)?.name}
              </Text>
              <Text style={style.listtext}>{v.name}</Text>
              <Text style={style.listtext}>{v.price}</Text>
              <Text style={style.listtext}>{v.desc}</Text>
            </View>

            <View style={{flexDirection: 'row', marginRight: 10}}>
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => handleedit(v)}>
                <Text>
                  <EvilIcons name="pencil" size={35} color="black"></EvilIcons>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>
                  <MaterialIcons
                    name="delete"
                    size={30}
                    color="red"
                    onPress={() => handleDelete(v.id)}></MaterialIcons>
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
    marginTop: 70,
    // backgroundColor : 'white',
  },

  listtext: {
    fontSize: 20,
    color: 'green',
    marginBottom: 6,
  },

  listname: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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

  dropdown2: {
    zIndex: 2000,
  },

  dropdown3: {
    zIndex: 1000,
  },

  dropdown4: {
    zIndex: 999,
  },

  // dropdown2: {
  //   marginTop: 20,
  //   marginBottom: 10,
  //   zIndex: 999,
  // },
});
