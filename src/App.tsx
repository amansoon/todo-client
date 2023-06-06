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
    console.log("fetching user");
    try {
      const res = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      console.log("user = ", res.data);
      console.log("token = ", token);
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        dispatch(setUser({ user: res.data.data.user }))
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={token ? <Todo /> : <Navigate to="/login" />} />
          <Route path='/login' element={token ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={token ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App