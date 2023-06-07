import { ChangeEvent, useEffect, useState } from "react";
import { ArrowRight } from "react-feather"
import { Link, Router, useNavigate } from "react-router-dom"
import { validate as validateEmail } from 'email-validator'
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/user/userSlice";
import { formBtnStyle, inputStyle } from "../utils/groupClasses";


type Props = {}

function Signup({ }: Props) {
  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState('');

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [isDisabled, setDisabled] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

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
        password
      }

      const res = await axios.post("http://localhost:8000/api/user/signup", data)
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        setDisabled(false);
        setSubmitting(false);
        const token = res.data.data.token;
        dispatch(setToken({ token }))
        alert("Your account created successfully !")
        navigate('/todo')
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
      // console.log(err)
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
  }, [name, email, password, nameMessage, emailMessage, passwordMessage])

  return (
    <div className="min-h-[calc(100vh-60px)] flex justify-center p-4 bg-white">
      <div className="w-full h-full max-w-[450px] px-0 sm:px-6 py-6 sm:mt-[70px] border-0 sm:border rounded-lg">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1" > Create an Account </h1>
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
              ></input>
            </div>
            {emailMessage !== '' && (
              <div className="pt-1">
                <p className="text-xs text-red-500"> {emailMessage} </p>
              </div>
            )}
          </div>
          {/* password */}
          <div>
            <label htmlFor="user-password" className="text-sm text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="user-password"
                className={inputStyle}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              ></input>
            </div>
            {passwordMessage !== '' && (
              <div className="pt-1">
                <p className="text-xs text-red-500"> {passwordMessage} </p>
              </div>
            )}
          </div>
          <div>
            <button
              className={formBtnStyle}
              type="submit"
              disabled={isDisabled}
              title={isDisabled ? "Please all fields correctly." : ''}
            >
              Create account
            </button>
          </div>
        </form>
        {/* footer */}
        <div className="mt-4">
          <p className="text-sm text-slate-500"> Already have an account ? <Link to='/login' className="text-blue-700" > Log In </Link>  </p>
        </div>
      </div>
    </div>
  )
}


export default Signup