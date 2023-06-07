import React from 'react'

import illustration from '../images/illustration.svg'

type Props = {}

function Home({ }: Props) {
    return (
        <div className='min-h-[calc(100vh-170px)]'>
            <section className='mt-[120px] max-w-[1200px] mx-auto leading-normal'>
                <div>
                    <h1 className='text-[5rem] font-bold mb-2'>
                        Manage your <br />
                        Todos with Ease
                    </h1>
                    <p className='text-lg'>
                        Learn about how to manage your daily tasks efficiently. Lorem ipsum dolor sit amet.
                    </p>
                </div>
                <div>
                    <img src={illustration} alt="" />
                </div>
            </section>
        </div>
    )
}

export default Home