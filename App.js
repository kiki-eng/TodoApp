import * as React from 'react';

import TodoApp from './screens/TodoApp';
import { initializeApp } from 'firebase/app';
import 'firebase/database';

// Import Redux
import store from './redux/store';
import { Provider } from 'react-redux';



const App = () => {
  
  return (
    <Provider store={store}>
      <TodoApp/>
    </Provider>
  );
}

export default App;

