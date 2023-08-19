import React, { useState } from "react";
import Spacer from "./Spacer";
import { Modal, Pressable, View } from "react-native";
import { Title, Paragraph, Card,} from 'react-native-paper';
import { TASKSTATUS } from "../utils/TypeConstants";
import EditToDoModal from "./EditTodo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ref, push, set} from 'firebase/database';
import { db } from "../firebaseConfig";


export default function TaskCard({item,index}){

  const dbRef = ref(db, `/todos/${item.id}`);
    let cardBackground = " ";
    if(item.status == TASKSTATUS.DUE){
        cardBackground = '#fff'
    }else if(item.status == TASKSTATUS.DONE){
        cardBackground = '#2EFF2E'
    }else{cardBackground ='#FF92A5'}

    function deleteToDo () {
      set(dbRef, null)
        .then(() => {

        })
        .catch((error) => {
            console.error('Error setting data in Firebase:', error);
        });
    }

    function setTaskDone(){
      const task = {id: item.id, task: item.task, status:TASKSTATUS.DONE, title:item.title}
        set(dbRef, task)
          .then(() => {
  
          })
          .catch((error) => {
              console.error('Error setting data in Firebase:', error);
          });
    }

    const [editToDo,setEditToDo] = useState(false)

    const EditTaskModal = () => {
      return(
        <Modal 
          transparent={true}
          visible={editToDo}
          animationType='slide'
          useNativeDriver={true}
          style={{ margin: 0 }}
          onRequestClose={() => setEditToDo(false)}>
  
            <EditToDoModal
                toDo={item}
                index={index}
                closeEdit={setEditToDo}
            />
  
       </Modal>
      )
      
  }

    return(
        <View
          style={{
            elevation: 2,
            shadowOffset: {
              width: 0.00,
              height: -0.00
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            shadowColor: 'black'
          }}
        >
            <View
              style={{
                backgroundColor:cardBackground,
                borderTopStartRadius:50,
                borderBottomEndRadius:50,
                paddingVertical:10,
                paddingHorizontal:20,
                flexDirection:'row',
                justifyContent:'space-between',
                height:90
              }}
            >
              <View style={{flexDirection:"row",alignItems:'center'}}>
                { item.status !== TASKSTATUS.DONE?
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginEnd:25}}>
                    <Pressable onPress={()=>setTaskDone()} style={{flexDirection:'row',alignItems:"center"}}>
                      <View style={{height:20,width:20,borderRadius:15,borderWidth:3,borderColor:"black"}}/> 
                    </Pressable>
                  </View>
                :
                <View style={{height:20,width:20,borderRadius:15,backgroundColorColor:"black"}}/> 
                }
              
                <View
                  style={{
                    maxWidth:'80%'
                  }}
                >
                  <Paragraph style={{fontSize:15,fontWeight:'bold'}}>{item.title}</Paragraph>
                  <Paragraph style={{fontSize:12}}>{item.task}</Paragraph>
                </View>

              </View>
              
                <View 
                 style={{
                  justifyContent:'space-between',
                  marginEnd:20,
                  paddingVertical:5
                 }}
                >
                  <Pressable onPress={()=>deleteToDo()}>
                      <Ionicons name="trash-bin-outline" color="red" size={20}/>
                  </Pressable>
                  <Pressable onPress={()=>setEditToDo(true)}>
                    <Ionicons name='ios-pencil' size={20} />
                  </Pressable>
                </View>
              
            </View>
            <Spacer/>
            <EditTaskModal/>
        </View>
    )
}