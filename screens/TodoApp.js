import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { ref, onValue  } from 'firebase/database';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';
import TaskCard from '../components/TaskCard';
import AddToDoModal from '../components/AddTodo';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon, Ionicons } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/actions';
import { db } from '../firebaseConfig';

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list, addTodo, deleteTodo }) => {
  const [tasks, setTasks] = React.useState('');
  const [addToDo, setAddToDo] = React.useState(false);

  React.useEffect(() => {
    const dbRef = ref(db, '/todos');
  
    // Create a callback function to handle data updates
    const handleDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);
        const objects = Object.values(data);
        const formatted = objects.map((item, index) => ({
          ...item,
          id: keys[index],
        }));
        setTasks(formatted);
      } else {
        setTasks([])
        console.log('No data found at the specified location.');
      }
    };
  
    // Set up the onValue listener
    const unsubscribe = onValue(dbRef, handleDataChange);
  
    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  





  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }
  const AddTaskModal = () => {
    return(
      <Modal
        transparent={true}
        visible={addToDo}
        animationType='slide'
        style={{ margin: 0 }}
        onRequestClose={()=>setAddToDo(false)}>

          <AddToDoModal
              closeAdd={setAddToDo}
          />

     </Modal>

    )
    
}

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App with React Native and Redux</Text>
      </Card>
      <Spacer />
      <FlatList
      style={{paddingHorizontal:10}}
        data={tasks}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (<TaskCard item ={item} index={index}/>);
        }}
      />
      <TouchableOpacity 
        style={{
          bottom:30,
          height:50,
          width:50,
          right:20,
          backgroundColor:'blue',
          justifyContent:'center',
          alignItems:'center',
          borderRadius:25,
          position:'absolute'
        }} 
        onPress={()=>setAddToDo(true)}
      >
        <Ionicons name="add" size={25} color={'white'}/>
      </TouchableOpacity>
      <AddTaskModal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
