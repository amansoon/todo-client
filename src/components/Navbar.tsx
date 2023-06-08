import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Menu, X, ChevronDown, ChevronRight, User, BookOpen, LogOut, List } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../app/store'

import { Popover } from 'react-tiny-popover'
import { logoutUser } from '../features/user/userSlice'

import toast from 'react-hot-toast'


function Navbar() {
    const { user } = useSelector((state: RootState) => state.user)
    const [isPopoverOpen, setPopoverOpen] = useState(false)

    return (
        <div className="sticky z-[100] top-0 left-0 right-0 w-full border px-4 xl:px-6 bg-white">
            <div className='max-w-[1400px] w-full h-[60px] mx-auto flex items-center'>
                {/* logo */}
                <div>
                    <Link to='/' className='text-xl font-semibold inline-flex items-center'>
                        <span className='inline-block mt-1.5 mr-2'> <BookOpen size={22} /> </span>
                        <span className='mt-1 mr-2 hidden sm:inline-block'> TodoBook </span>
                    </Link>
                </div>
                <div className="flex items-center ml-auto">
                    {user !== null ? (
                        <Popover
                            isOpen={isPopoverOpen}
                            padding={20}
                            onClickOutside={() => setPopoverOpen(false)}
                            positions={['bottom', 'right']}
                            content={<UserMenu setPopoverOpen={setPopoverOpen} />}

                        >
                            <button
                                className='h-[40px] w-[40px] min-w-[40px] rounded-full bg-orange-100 text-orange-700 flex justify-center items-center'
                                onClick={() => setPopoverOpen(!isPopoverOpen)}>
                                {user.name.charAt(0).toUpperCase()}
                            </button>
                        </Popover>
                    ) : (
                        <>
                            <Link
                                to='/login'
                                className="mr-4 md:mr-6"
                            >
                                Login
                            </Link>
                            <Link
                                to='/signup'
                                className="px-4 pt-3 pb-3 rounded-full bg-black text-white leading-none"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}



type UserMenuProps = {
    setPopoverOpen: Dispatch<SetStateAction<boolean>>
}


const UserMenu = ({ setPopoverOpen }: UserMenuProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser({}))
        toast.success("Logout successfully.")
        navigate('/')
    }

    const menuItemStyle = "w-full inline-flex items-center text-start px-4 py-2.5 text-sm leading-none rounded-lg  hover:bg-white"

    return (
        <div className="relative mr-4">
            <ul className='relative z-10 w-[200px] flex flex-col p-2 bg-slate-50 rounded-lg border'>
                <li>
                    <Link to={'/todo'} className={menuItemStyle} onClick={() => setPopoverOpen(false)}>
                        <div className='mr-2'> <List size={16} strokeWidth={1.5} /> </div>
                        Todo list
                    </Link>
                </li>
                <li>
                    <Link to={'/profile'} className={menuItemStyle} onClick={() => setPopoverOpen(false)}>
                        <div className='mr-2'> <User size={16} strokeWidth={1.5} /> </div>
                        View profile
                    </Link>
                </li>
                <li>
                    <button className={menuItemStyle} onClick={handleLogout}>
                        <div className='mr-2'> <LogOut size={16} strokeWidth={1.5} /> </div>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}



export default Navbar