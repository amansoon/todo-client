import React from 'react'
import notFoundImage from '../images/not-found.png'

type Props = {}

function NotFound({ }: Props) {
    return (
        <div className='min-h-[calc(100vh-170px)] px-4 sm:px-6'>
            <div className='w-full h-full flex justify-center'>
                <img src={notFoundImage} alt="" className='w-full max-w-[600px] mt-4' />
            </div>
        </div>
    )
}

export default NotFound