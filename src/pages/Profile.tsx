import { ChangeEvent, useEffect, useState } from "react";
import { ArrowRight, Edit2, LogOut, Trash, X } from "react-feather"
import { Link, Router, useNavigate } from "react-router-dom"
import { validate as validateEmail } from 'email-validator'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setToken, setUser } from "../features/user/userSlice";
import { RootState } from "../app/store";
import { formBtnStyle, inputStyle } from "../utils/groupClasses";


type Props = {}

function Profile({ }: Props) {
  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const [isEditing, setEditing] = useState(false);

  const [isDisabled, setDisabled] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const { user, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setEditing(false);
    }
  }, [])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled === true) {
      return alert("Please fill all fields correctly.")
    }
    // prevent multiple submit
    setDisabled(true);
    setSubmitting(true);

    try {
      const data = {
        name: name.trim(),
        email: email.trim(),
      }
      const res = await axios.put("http://localhost:8000/api/user/", data, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        setDisabled(false);
        setSubmitting(false);
        setEditing(false);
        const updatedUser = { ...user, ...data };
        dispatch(setUser({ user: updatedUser }))
        alert("Your account updated successfully !")
      }
      else {
        alert(res.data.message)
        setDisabled(false);
        setSubmitting(false);
      }
    }
    catch (err) {
      setDisabled(false);
      setSubmitting(false);
      console.log(err)
    }
  }

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value)

    if (value.trim().length < 3) {
      setNameMessage("Name must contain atleast 3 characters.")
    }
    else if (value.trim().length > 25) {
      setNameMessage("Name must contain atmost 25 characters.")
    }
    else {
      setNameMessage("")
    }
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value)

    if (!validateEmail(email.trim())) {
      setEmailMessage("Please enter valid email address")
    }
    else {
      setEmailMessage("")
    }
  }

  useEffect(() => {
    if (
      nameMessage === "" &&
      emailMessage === "" &&
      name.trim() !== "" &&
      email.trim() !== ""
    ) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [name, user, nameMessage, emailMessage])


  const handleLogout = () => {
    dispatch(logoutUser({}))
    navigate('/')
  }

  const handleDeleteAccount = () => {
    deleteAccountDB();
    deleteAllTodosDB();
    dispatch(logoutUser({}))
    navigate('/')
  }

  const deleteAccountDB = async () => {
    try {
      const res = await axios.delete('http://localhost:8000/api/user/', {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        alert("Your account deleted successfully.");
      }
      else {
        alert("Unable to delete your account.");
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const deleteAllTodosDB = async () => {
    try {
      const res = await axios.delete("http://localhost:8000/api/todo/", {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      console.log(res)
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        console.log("All todos of user deleted successfully.")
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex justify-center p-4 bg-white">
      <div className="w-full h-full max-w-[450px] px-0 sm:px-6 py-6 sm:mt-[70px] border-0 sm:border rounded-lg">
        <div className="flex items-center mb-5">
          <h2 className="text-xl font-semibold mb-1 mr-3" > User Info </h2>
          <button className="hover:text-red-500" title="Edit profile" onClick={() => setEditing(!isEditing)} >
            {isEditing ? <X size={18} strokeWidth={2} /> : <Edit2 size={18} strokeWidth={2} />}
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
          {/* name */}
          <div>
            <label htmlFor="user-name" className="text-sm text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="user-name"
                className={inputStyle}
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleName}
                disabled={!isEditing}
              ></input>
            </div>
            {nameMessage !== '' && (
              <div className="pt-1">
                <p className="text-xs text-red-500"> {nameMessage} </p>
              </div>
            )}
          </div>
          {/* email */}
          <div>
            <label htmlFor="user-email" className="text-sm text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="user-email"
                className={inputStyle}
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                disabled={!isEditing}
              ></input>
            </div>
            {emailMessage !== '' && (
              <div className="pt-1">
                <p className="text-xs text-red-500"> {emailMessage} </p>
              </div>
            )}
          </div>
          {isEditing && (
            <div>
              <button
                className={formBtnStyle}
                type="submit"
                disabled={isDisabled}
                title={isDisabled ? "Please all fields correctly." : ''}
              >
                Update
              </button>
            </div>
          )}
        </form>
        {/* footer */}
        <div className="flex justify-between gap-1 mt-6 pt-5 border-t">
          <button className="flex items-center text-sm text-gray-900 hover:text-blue-600" onClick={handleLogout}>
            <div className="mr-2 mt-[2px]"> <LogOut size={16} strokeWidth={1.5} /> </div>
            Logout
          </button>
          <button className="flex items-center text-sm text-red-500 hover:text-red-600" onClick={handleDeleteAccount}>
            <div className="mr-2 mt-[2px]"> <Trash size={16} strokeWidth={1.5} /> </div>
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}


export default Profile