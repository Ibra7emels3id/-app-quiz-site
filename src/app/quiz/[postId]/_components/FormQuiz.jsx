'use client'
import { useAuth } from '@/app/context/context';
// import { data } from '@/app/data';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

const FormQuiz = ({ Id }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScoreQuestion, setShowScoreQuestion] = useState(false);
    const [isCurrentQuestion, setIsCurrentQuestion] = useState(null)
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);
    const [returnScore, setReturnScore] = useState('');
    const { user } = useAuth()


    // Handle Get Data User Score
    const GetScoreData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SOME_URL}/api/${Id}/${user.user.id}`)
            setReturnScore(response.data)
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };


    // Handle All Quiz 
    const GetAllData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SOME_URL}/api/${Id}`)
            setData(response.data)
            // console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    // Handle selection change and score
    const handleOptionChange = (e, index) => {
        const selectedAnswer = e.target.value;
        setSelectedOption(selectedAnswer);
        setIsCurrentQuestion(index + 1)
    };

    // Handle Next selection
    const handleNextQuestion = (e) => {
        e.preventDefault();
        if (isCurrentQuestion === +data[currentQuestion].ans) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < data.length) {
            if (selectedOption) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption('');
            }
        } else {
            setShowScoreQuestion(true);
        }
    };


    // Handle Send Data Server
    const HandleSendDataServer = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SOME_URL}/api/${Id}`, {
                userId: user?.user?.id, // Replace with your user id
                quizId: Id,
                score: score,
                end: data.length,
                answers: data?.questions,
                name: user?.user?.name,
                AcademicYear: user?.user?.AcademicYear,
                WaterResult: ((score * 200) / (data.length * 200)) * 100
            });
            window.location.reload()
            toast.success('Finish Quiz To Score');
            localStorage.removeItem('token');
        } catch (error) {
            console.error(error);
        }
    };


    // Handle Water Test
    // if (currentQuestion + 1 === data.length) {
    //     setTimeout(() => {
    //         HandleSendDataServer()
    //     }, 10000);
    // }

    // Use Effect 
    useEffect(() => {
        GetAllData()
        GetScoreData()
    }, [Id]);

    // Handle Check User Quiz To Score
    if (returnScore) {
        return (
            <div className='flex flex-col gap-5'>
                <div className='flex justify-center items-center'>
                    <h1 className='text-3xl font-bold'>Your final score is {returnScore.score}/{data.length}</h1>
                </div>
                <div className='flex justify-center items-center'>
                    <h1 className='text-3xl font-bold'>
                        {((returnScore.score * 200) / (data.length * 200)) * 100}%
                    </h1>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                        data-original="#000000"
                    />
                </svg>
            </div>
        )
    }


    return (
        <>
            {showScoreQuestion ? (
                <div className='flex flex-col gap-5'>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-3xl font-bold'>Your final score is {score}/{data.length}</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-3xl font-bold'>
                            {((score * 200) / (data.length * 200)) * 100}%
                        </h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button
                            type='submit'
                            onClick={HandleSendDataServer}
                            className='group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white h-12 px-4 rounded-xl text-lg font-semibold'
                        >
                            Finish
                        </button>
                    </div>
                </div>
            ) : (
                <form className='mt-3 ml-4'>
                    <>
                        <div className="flex flex-row">
                            <p className='text-2xl font-semibold'>{currentQuestion + 1} - {data[currentQuestion]?.Question}</p>
                        </div>
                        <div className="flex flex-col gap-3 my-3">
                            {data[currentQuestion]?.answers?.map((it, index) => {
                                return (
                                    <button
                                        key={index}
                                        value={it}
                                        onClick={(e) => handleOptionChange(e, index)}
                                        type='button'
                                        className="group flex items-center gap-2 bg-white h-12 px-3 rounded-xl hover:text-black"
                                    >
                                        <input
                                            type="radio"
                                            id={it}
                                            value={it}
                                            // onChange={handleOptionChange}
                                            checked={selectedOption === it}
                                            className="appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-blue-600 checked:border-transparent focus:outline-none"
                                        />
                                        <label
                                            className={`${selectedOption === it ? 'text-gray-900' : 'text-gray-500'} text-lg cursor-pointer lowercase text-gray-600 hover:text-gray-900 font-semibold group-hover:text-gray-900`}
                                            htmlFor={it}
                                        >
                                            {it}
                                        </label>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                    <button
                        disabled={selectedOption ? false : true}
                        onClick={handleNextQuestion}
                        className={`${selectedOption ? 'bg-blue-500' : 'bg-blue-200 cursor-not-allowed'} w-full py-2 rounded-xl text-white font-semibold mt-3`}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )}
        </>
    );
}

export default React.memo(FormQuiz);
