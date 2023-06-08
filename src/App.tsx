import React, { useEffect } from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Todo from "./pages/Todo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setToken, setUser } from './features/user/userSlice';
import axios from 'axios';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import { deleteAllTodos } from './features/todo/todoSlice';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import { Toaster } from 'react-hot-toast';


type Props = {}

function App({ }: Props) {
  const { token, user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(setToken({ token }))
    }
  }, [])

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        dispatch(setUser({ user: res.data.data.user }))
      }
    }
    catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    if (!user) {
      dispatch(deleteAllTodos({}))
    }
  }, [user])

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            duration: 3000,
            style: {
              background: 'black',
              color: 'white',
              fontSize: 14,
              padding: 10,
            },
          }}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/todo' element={token ? <Todo /> : <Navigate to="/login" />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App