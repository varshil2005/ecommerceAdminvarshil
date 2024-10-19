import axios from "axios";
import { ADDCATEGORY, CATEGORYDATA, DELETECATEGORY, UPDATECATEGORY } from "../Actiontype";
import firestore from '@react-native-firebase/firestore';

export const getcategory =  () => async(dispatch) =>  {
//   try {
//     let category = [];
//     await firestore()
//       .collection('Category')
//       .get()
//       .then(querySnapshot => {
//         console.log('Total users: ', querySnapshot.size);
// 
//         querySnapshot.forEach(documentSnapshot => {
//           console.log(
//             'gggg',
//             'User ID: ',
//             documentSnapshot.id,
//             documentSnapshot.data(),
//           );
// 
//           category.push({
//             id: documentSnapshot.id,
//             ...documentSnapshot.data(),
//           });
//         });
//       });
//     console.log('1..............', category);
//     dispatch({type: CATEGORYDATA, payload: category});
//   } catch (error) {
//     console.log(error);
//   }

try {
  const response = await axios.get("http://192.168.1.37:8000/api/v1/categories/list-categories",{
    headers : {
      "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEzYWI5NGQzM2I4NGFlOWRmYjg4NWYiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ2NzI3LCJleHAiOjE3MjkzNTAzMjd9.6uTKiBT5KsEnpuE3bdESG5YrfSTDO5zbwGZIY0L8oQs`
    }
  });

  dispatch({type :CATEGORYDATA , payload : response.data.data })
} catch (error) {
  
}
    
}

export const addCategory = (data) => async(dispatch) => {
console.log("asdasd",data);

//     try {
//       await firestore()
//       .collection('Category')
//       .add(data)
//       .then((doc) => {
//         console.log('category added!',doc.id);
//         dispatch({type:ADDCATEGORY, payload:{...data , id:doc.id}})
//       });
// 
//      
//     } catch (error) {
//       console.log(error);
//     }

try {
  const response = await axios.post("http://192.168.1.37:8000/api/v1/categories/add-category",{name : data.name,description : data.desc},{
    headers : {
      "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEzYWI5NGQzM2I4NGFlOWRmYjg4NWYiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ2NzI3LCJleHAiOjE3MjkzNTAzMjd9.6uTKiBT5KsEnpuE3bdESG5YrfSTDO5zbwGZIY0L8oQs`
    }
  });

  console.log("qwewretrt",response.data.data);
  
  dispatch({type:ADDCATEGORY, payload:response.data.data})
  
} catch (error) {
  console.log("rtyrt",error);
  
}
}

export const deletecategoty = (id) => async(dispatch) => {
  console.log("errtert",id);
  
//    try {
//     console.log("idddddddddddd",id);
//     await firestore()
//     .collection('Category')
//     .doc(id)
//     .delete()
//     .then((doc) => {
//       console.log('delete', 'User deleted!');
//       dispatch({type : DELETECATEGORY , payload : id})
//     });
// 
//    } catch (error) {
//       console.log(error);
//    }

try {
  const response = await axios.delete("http://192.168.1.37:8000/api/v1/categories/delete-category/"+ id,{
    headers : {
      "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEzYWI5NGQzM2I4NGFlOWRmYjg4NWYiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ2NzI3LCJleHAiOjE3MjkzNTAzMjd9.6uTKiBT5KsEnpuE3bdESG5YrfSTDO5zbwGZIY0L8oQs`
    }
  });

  console.log("qwewretrt",response.data.data);
  
  dispatch({type:DELETECATEGORY, payload:id})
  
} catch (error) {
  console.log("rtyrt",error);
  
}
}

export const editcategory = (data) => async(dispatch) => {

  console.log("asdasdasd",data);
  
  // try {
  //   console.log("hello sdjbs");
  //   const temp = {...data};
  //   delete temp.id;
  //   console.log("temppp", temp);
  //   await firestore()
  //       .collection('Category')
  //       .doc(data.id)
  //       .set(temp)
  //       .then(() => {
  //         dispatch({type: UPDATECATEGORY , payload : data})
  //       });
  // } catch (error) {
  //   console.log(error);
  // }

  try {
    try {
      const response = await axios.put("http://192.168.1.37:8000/api/v1/categories/update-category/"+ data._id ,{
        name : data.name,
        description : data.desc
      },{
        headers : {
          "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEzYWI5NGQzM2I4NGFlOWRmYjg4NWYiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ2NzI3LCJleHAiOjE3MjkzNTAzMjd9.6uTKiBT5KsEnpuE3bdESG5YrfSTDO5zbwGZIY0L8oQs`
        }
      });
    
      console.log("qwewretrt",response.data.data);
      
      dispatch({type:UPDATECATEGORY, payload:response.data.data})
      
    } catch (error) {
      console.log("rtyrt",error);
      
    }
  } catch (error) {
    
  }
}