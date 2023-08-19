import React, { useEffect, useState } from "react";
import { Pressable, View, Button } from "react-native";
import { Card, TextInput, Title} from "react-native-paper";
import Spacer from "./Spacer";
import { ref, push, set} from 'firebase/database';
import { db } from "../firebaseConfig";

export default function EditToDoModal({ closeEdit, toDo }){

    const [task, setTask] = useState(toDo.task);
    const [title, setTitle] = useState(toDo.title);
    const [buttonDisable, setButtonDisable] = useState(true);
    const dbRef = ref(db, `/todos/${toDo.id}`);
    const updatedTask = {id: toDo.id, task: task, status:toDo.status, title:title}

    useEffect(()=>{

        if(title !== ''){
            setButtonDisable(false)
        }else setButtonDisable(true)

    },[task,title])

    function EditToDo(){

        set(dbRef, updatedTask)
        .then(() => {
            closeEdit(false)
        })
        .catch((error) => {
            console.error('Error setting data in Firebase:', error);
        });

       
    }

    return(
        <Pressable style={{flex:1,backgroundColor:'#000000aa'}} onPress={()=>closeEdit(false)}>
            <Card style={{position:'absolute',bottom:0,width:'100%',borderTopLeftRadius:15,borderTopRightRadius:15}}>
                <Card.Content>
                <Title>Edit ToDo</Title>

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
                <Button title="Save" onPress={()=>EditToDo()} disabled={buttonDisable}/>

                </Card.Content>
            </Card>
      <Spacer />
    </Pressable>
    )
}