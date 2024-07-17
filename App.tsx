import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserList, { IUser } from './components/UserList';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import UserDetails from './components/UserDetails';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [change, setChange] = useState<(() => void) | null>(null);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TaskList />} />
        <Route path='/users' element={<UserList setUser={setUser} setChange={setChange} />} />
        <Route path='/users/:id' element={user && change ? <UserDetails {...user} changeIsDetails={change} /> : <div>No user selected</div>} />
      </Route>
    </Routes>
  );
}

export default App;
