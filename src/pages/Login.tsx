import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setToken } from '../features/user/userSlice';
import { formBtnStyle, inputStyle } from '../utils/groupClasses';

type Props = {}

function Login({ }: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
                email: email.trim(),
                password
            }
            const res = await axios.post("http://localhost:8000/api/user/login", data)
            if (res.status === 200 && res.data.status === 'SUCCESS') {
                setDisabled(false);
                setSubmitting(false);
                const token = res.data.data.token;
                dispatch(setToken({ token }))
                alert("Logged In successfully !")
                navigate('/todo')
            }
            else {
                setDisabled(false);
                setSubmitting(false);
                alert(res.data.message)
            }
        }
        catch (err) {
            setDisabled(false);
            setSubmitting(false);
            // console.log(err)
        }
    }

    useEffect(() => {
        if (email !== "" && password !== "") {
            setDisabled(false)
        }
        else {
            setDisabled(true);
        }
    }, [email, password])

    return (
        <div className="min-h-[calc(100vh-60px)] flex justify-center p-4 bg-white">
            <div className="w-full h-full max-w-[450px] px-0 sm:px-6 py-6 sm:mt-[70px] border-0 sm:border rounded-lg">
                <div className="mb-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold mb-1" > Login </h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="user-email" className="text-sm text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id='user-email'
                                className={inputStyle}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="user-password" className="text-sm text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id='user-password'
                                className={inputStyle}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value.trim())}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <button
                            className={formBtnStyle}
                            type="submit"
                            disabled={isDisabled}
                            title={isDisabled ? "Please all fields correctly." : ''}
                        >
                            Login
                        </button>
                    </div>
                </form>
                {/* footer */}
                <div className="mt-4">
                    <p className="text-sm text-slate-500"> Don't have an account? <Link to='/signup' className="text-blue-700" > Create account </Link>  </p>
                </div>
            </div>
        </div>
    )
}

export default Login