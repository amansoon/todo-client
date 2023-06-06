import React, { useState, useEffect } from 'react'
import { ArrowRight } from "react-feather"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setToken } from '../features/user/userSlice';

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

            console.log(res)

            if (res.status === 200 && res.data.status === 'SUCCESS') {
                setDisabled(false);
                setSubmitting(false);
                const token = res.data.data.token;
                dispatch(setToken({token}))
                alert("Logged In successfully !")
                setTimeout(() => {
                    navigate('/')
                }, 1000);
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
            console.log(err)
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
        <div className="min-h-[calc(100vh-60px)] flex justify-center bg-white">
            <div className="w-full h-full max-w-[450px] p-4 xl:p-6 mt-[70px] border rounded-lg">
                <div className="mb-5">
                    <h1 className="text-3xl font-semibold mb-1" > Login </h1>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className="text-base text-gray-900">
                            {' '}
                            Email address{' '}
                        </label>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="" className="text-base text-gray-900">
                            {' '}
                            Password{' '}
                        </label>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value.trim())}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <button
                            className="flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:not(:disabled):bg-black disabled:opacity-50"
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
                    <p className="text-slate-500"> Don't have an account? <Link to='/signup' className="text-blue-700" > Create account </Link>  </p>
                </div>
            </div>
        </div>
    )
}

export default Login