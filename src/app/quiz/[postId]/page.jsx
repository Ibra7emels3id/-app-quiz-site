'use client'
import React from 'react';
import FormQuiz from './_components/FormQuiz';
import { data } from '@/app/data';
import { useAuth } from '@/app/context/context';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const postId = React.use(params).postId;
    const { user, loading } = useAuth()
    const Router = useRouter()


    // Check if user is authenticated
    if (loading) {
        return <div>Loading...</div>
    } else {
        if (!user) {
            Router.push('/')
        }
    }

    return (
        <>
            <div className="flex flex-col h-screen w-[100vw]">
                <div className="form flex flex-col justify-center bg-[#eee] rounded-xl w-[650px] m-auto p-6">
                    <div className="flex justify-center">
                        <p className=' flex items-center justify-center font-bold uppercase'>count - <span className=' bg-blue-500 h-8 ml-2 w-8 flex items-center justify-center rounded-full text-white' >{data.length}</span></p>
                    </div>
                    <FormQuiz Id={postId} />
                </div>
                <div className="flex justify-center">
                    <p className='text-center'>
                        <span className='font-bold'>Question 1 of {data.length}</span>
                    </p>
                </div>
                <div className="countQuiz flex pb-16 px-10 gap-3 items-center justify-center mt-5">
                    {/* {data?.map((it) => {
                        return (
                            <p key={it.id} className='flex flex-col '>
                                <span className='w-8 h-8 bg-blue-600 rounded-full '></span>
                            </p>
                        )
                    })} */}
                </div>
            </div>
        </>
    );
}

export default Page;
