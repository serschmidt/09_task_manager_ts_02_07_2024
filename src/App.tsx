import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserListFC, { IUser } from './components/UserListFC'
import Layout from './components/Layout'
import TaskList from './components/TaskList'
import UserDetails from './components/UserDetails'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [change, setChange] = useState<( () => void) | null> (null);

  console.log(user);
  console.log(change);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TaskList />} />
        <Route path='/users' element={<UserListFC setUser={setUser} setChange={setChange} />} />
        <Route path='/users/details' element={user && change ? <UserDetails {...user} changeIsDetails={change} /> : <div>No user selected</div>} />
      </Route>
    </Routes>
    // <UserList />
  );
}

export default App;
