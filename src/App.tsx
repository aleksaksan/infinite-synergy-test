import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserList } from './components/UserList/UserList';
import { EditUserForm } from './components/Form/Form';


function App() {
  
  return (
    <Provider store={store}>
      <div className="App flex">
        <UserList />
        <EditUserForm />
      </div>
    </Provider>
  )
}

export default App
