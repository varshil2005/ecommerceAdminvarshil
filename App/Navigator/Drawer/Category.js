import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

export default function Category() {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setname] = useState('');
    const [data, setdata] = useState([]);
    const [update, setupdate] = useState(null)
    const [isconnected , setisconnected] = useState(true)

    useEffect (() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setisconnected(state.isconnected)
          });

    return() => {
        unsubscribe();
    }
    },[])


    useEffect(() => {

        getData();

    }, [isconnected]);

   

    

      

    const getData = async () => {
    

        if(isconnected) {
            const respones = await fetch("https://dummyjson.com/products/categories");
            const data =await respones.json();
            setdata(data)
        } else {

            const catData = await AsyncStorage.getItem("category");
            if (catData) {
                setdata(JSON.parse(catData));
            }
        }

        

       
    }





    const handleSubmit = async () => {
        setModalVisible(!modalVisible)

        const catData = await AsyncStorage.getItem("category");

        console.log("catDatacatData", catData);

       

        if (update) {
            console.log(update);
            const udata = JSON.parse(catData).map((v,i) => {

                if (v.id === update) {
                    return {id : update , name : name};
                } else {
                    return v;
                }
            })

            console.log("update",udata);
            await AsyncStorage.setItem("category" , JSON.stringify(udata));
            setdata(udata)
        } else {
            if (catData) {
                console.log("asfasf");
                const asysncData = JSON.parse(catData);
                asysncData.push({ id: Math.floor(Math.random() * 10000), name: name })
                await AsyncStorage.setItem("category", JSON.stringify(asysncData))
    
                setdata(asysncData)
            } else {
                let data = [{ id: Math.floor(Math.random() * 1000), name: name }]
    
                console.log(data);
                await AsyncStorage.setItem("category", JSON.stringify(data))
                setdata(data)
            }
        }

        setname('');
        setupdate(null);
        console.log("asyn", catData);
        console.log(name);

    }

    const handleDelete = async (id) => {
        const data = await AsyncStorage.getItem("category");
        const fdata = JSON.parse(data).filter((v, i) => v.id !== id);

        await AsyncStorage.setItem("category", JSON.stringify(fdata))
        setdata(fdata)
    }

    const handleedit = async (id) => {
        setModalVisible(true)
        const data = await AsyncStorage.getItem("category");
        const fdata = JSON.parse(data).find((v) => v.id === id);
        setname(fdata.name)
        setupdate(id)


    }

    console.log("vvvvv",data);


    return (
        <ScrollView style={{ position: 'relative' }}>
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
                        <TextInput name='category' placeholder='Category Name' style={style.input} onChangeText={setname} value={name}></TextInput>
                        <Pressable style={style.submitbutton} onPress={() => handleSubmit()}>
                            <Text style={{ textAlign: 'center', paddingTop: 7, color: 'white' }}> {update ? 'Update' : 'Submit'}</Text>
                        </Pressable>
                    </View>
                </View>


            </Modal>

            <TouchableOpacity style={style.button} onPress={() => setModalVisible(true)}>
                <Text style={{ textAlign: 'center', paddingTop: 7, color: 'white' }}>ADD Category</Text>
            </TouchableOpacity>

            <View style={style.listmainview} >

                {
                    data.map((v, i) => (

                        <View style={style.listname} key={v.id}>
                            <Text style={style.listtext}>{v.name}</Text>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <TouchableOpacity style={{ marginRight: 20 }} onPress={() => handleedit(v.id)}><EvilIcons name='pencil' size={35} color='black'></EvilIcons></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(v.id)}><Text><MaterialIcons name='delete' size={30} color='red'></MaterialIcons></Text></TouchableOpacity>
                            </View>
                        </View>

                    ))
                }








            </View>


        </ScrollView>



    )
}

const style = StyleSheet.create({

    button: {
        width: 120,
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
        width: 190,
        padding: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 0.50,
        color: 'black'
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
        color: 'black'
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
        color: 'green'
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
        marginBottom: 10

    }
})


