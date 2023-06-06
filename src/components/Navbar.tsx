import React from 'react'
import { Menu, X, ChevronDown, ChevronRight, User, BookOpen } from 'react-feather'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../app/store'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const { user } = useSelector((state: RootState) => state.user)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="relative w-full border px-4 xl:px-6">
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
                        <>
                            <Link to='/' className='mr-4' > Todos </Link>
                            <button className='h-[40px] w-[40px] min-w-[40px] rounded-full bg-slate-100 flex justify-center items-center'>
                                <div>
                                    <User size={16} strokeWidth={1.5} />
                                </div>
                            </button>
                            {user.name}
                        </>
                    ) : (
                        <>
                            <button
                                className="px-4 py-3 rounded-md bg-black text-white leading-none font-medium"
                            >
                                Login
                            </button>
                            <button
                                className="px-4 py-3 rounded-md bg-black text-white leading-none font-medium"
                            >
                                Signup
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}


export default Navbar