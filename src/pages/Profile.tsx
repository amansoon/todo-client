import { ChangeEvent, useEffect, useState } from "react";
import { ArrowRight } from "react-feather"
import { Link, Router, useNavigate } from "react-router-dom"
import { validate as validateEmail } from 'email-validator'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../features/user/userSlice";
import { RootState } from "../app/store";
import { formBtnStyle, inputStyle } from "../utils/groupClasses";


type Props = {}

function Profile({ }: Props) {
  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [isEditing, setEditing] = useState(true);

  const [isDisabled, setDisabled] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.email);
    }
  }, [])

  const dispatch = useDispatch();

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
        password
      }
      const res = await axios.post("http://localhost:8000/api/user/signup", data)

      if (res.status === 200 && res.data.status === 'SUCCESS') {
        setDisabled(false);
        setSubmitting(false);
        const token = res.data.data.token;
        dispatch(setToken({ token }))
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


  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPassword(value)
    // validate password
    if (password.length < 6 || password.length > 20) {
      setPasswordMessage("Password must be of 6 to 20 characters")
    }
    else {
      setPasswordMessage("")
    }
  }

  useEffect(() => {
    if (
      nameMessage === "" &&
      emailMessage === "" &&
      passwordMessage === "" &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [nameMessage, emailMessage, passwordMessage])

  return (
    <div className="min-h-[calc(100vh-60px)] flex justify-center bg-white">
      <div className="w-full h-full max-w-[450px] p-4 xl:p-6 mt-[70px] border rounded-lg">
        <div className="mb-5">
          <h1 className="text-3xl font-semibold mb-1" > User Info </h1>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
          {/* name */}
          <div>
            <label htmlFor="user-name" className="text-base text-gray-900">
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
            <label htmlFor="user-email" className="text-base text-gray-900">
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
        <div className="mt-4">
          <h3> Actions </h3>
          <button className=""> Logout </button>
        </div>
      </div>
    </div>
  )
}


export default Profile