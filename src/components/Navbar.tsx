import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Menu, X, ChevronDown, ChevronRight, User, BookOpen } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../app/store'

import { Popover } from 'react-tiny-popover'
import { logoutUser } from '../features/user/userSlice'


function Navbar() {
    const { user } = useSelector((state: RootState) => state.user)
    const [isPopoverOpen, setPopoverOpen] = useState(false)
    
    return (
        <div className="sticky z-[100] top-0 left-0 right-0 w-full border px-4 xl:px-6 bg-white">
            <div className='max-w-[1400px] w-full h-[60px] mx-auto flex items-center'>
                {/* logo */}
                <div>
                    <Link to='/' className='text-xl font-semibold inline-flex items-center leading-none'>
                        <span className='inline-block mt-1.5 mr-2'> <BookOpen size={22} /> </span>
                        TodoBook
                    </Link>
                </div>
                <div className="flex items-center gap-4 ml-auto">
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
                                className="px-4 py-3 rounded-md bg-black text-white leading-none font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to='/signup'
                                className="px-4 py-3 rounded-md bg-black text-white leading-none font-medium"
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
    const handleLogout = () => {
        dispatch(logoutUser({}))
    }
    return (
        <div className="relative mr-4">
            <ul className='relative z-10 w-[150px] flex flex-col p-2 bg-slate-50 rounded-md border'>
                <li>
                    <Link to={'/'} className='w-full inline-block text-start px-4 py-2.5 leading-none rounded-md  hover:bg-white' onClick={() => setPopoverOpen(false)}> My Todos  </Link>
                </li>
                <li>
                    <Link to={'/profile'} className='w-full inline-block text-start px-4 py-2.5 leading-none rounded-md  hover:bg-white' onClick={() => setPopoverOpen(false)}> Profile  </Link>
                </li>
                <li>
                    <button className='w-full inline-block text-start px-4 py-2.5 leading-none rounded-md  hover:bg-white' onClick={handleLogout}> Logout  </button>
                </li>
            </ul>
        </div>
    )
}



export default Navbar