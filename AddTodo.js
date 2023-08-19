import React, { useEffect, useState } from "react";
import { Pressable, View, Text,Button } from "react-native";
import { Card, TextInput, Title } from "react-native-paper";
import Spacer from "./Spacer";
import { TASKSTATUS } from "../utils/TypeConstants";
import { ref, push } from 'firebase/database';
import { db } from "../firebaseConfig";

export default function AddToDoModal({closeAdd}){

    const [task, setTask] = useState('');
    const [title, setTitle] = useState('');
    const [buttonDisable, setButtonDisable] = useState(true)

    useEffect(()=>{

        if(title !== ''){
            setButtonDisable(false)
        }else setButtonDisable(true)

    },[task,title])

    function AddToDo(){
        let taskData = {
            id: Math.random(), 
            task: task, 
            status:TASKSTATUS.DUE, 
            title:title
        }
  
        push(ref(db, '/todos'), taskData)
        .then(() => {
            console.log('Data successfully set in Firebase.');
        })
        .catch((error) => {
            console.error('Error setting data in Firebase:', error);
        });

    }

    return(
        <Pressable style={{flex:1,backgroundColor:'#000000aa',position:'absolute',top:0,bottom:0,left:0,right:0}} onPress={()=>closeAdd(false)}>
            <Card style={{position:'absolute',bottom:0,width:'100%',borderTopLeftRadius:15,borderTopRightRadius:15}}>
                <Card.Content>
                <Title>Add ToDo Here</Title>

                <TextInput
                    mode="outlined"
                    label="Title"
                    value={title}
                    multiline={false}
                    onChangeText={title => setTitle(title)}
                />
                
                <TextInput
                    style={{marginTop:10}}
                    mode="outlined"
                    label="Task"
                    value={task}
                    multiline={true}
                    onChangeText={task => setTask(task)}
                />
                <Spacer/>
                <Button title="Add" onPress={()=>AddToDo()} disabled={buttonDisable}/>
  
                </Card.Content>
            </Card>
      <Spacer />
    </Pressable>
    )
}