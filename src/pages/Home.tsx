import React from 'react'

import illustration from '../images/illustration.svg'
import heroImage from '../images/hero-image.png'

type Props = {}

function Home({ }: Props) {
    return (
        <div className='min-h-[calc(100vh-170px)] px-4 sm:px-6 xl:px-6'>
            <section className='mt-[60px] lg:mt-[100px] w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between leading-normal'>
                <div className='w-full lg:w-[50%]'>
                    <h1 className='text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold mb-2'>
                        Manage your <br />
                        Todos with Ease.
                    </h1>
                    <p className='max-w-[400px] sm:max-w-[500px] md:max-w-[600px] mb-4'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus amet numquam perferendis. Architecto quos assumenda eligendi, alias quaerat in? Obcaecati?
                    </p>
                    <button className='px-4 py-4 leading-none bg-black text-white rounded-lg'> Take todo </button>
                </div>
                <div className='w-full mt-[2rem] lg:mt-0 lg:w-[50%] flex justify-center'>
                    <img src={heroImage} alt="" className='w-[80%] max-w-[300px] xl:max-w-[400px]' />
                </div>
            </section>
        </div>
    )
}


export default Home