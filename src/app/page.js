'use client'
import Image from "next/image";
import FormLogin from "./Components/FormLogin";
import { useAuth } from "./context/context";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const { user, loading } = useAuth()
    const [path, setPath] = useState('')

    // Handle path
    useEffect(() => {
        if (user?.user.AcademicYear === 'First grade') {
            setPath('first-grade')
        } else if (user?.user.AcademicYear === 'Second grade') {
            setPath('second-grade')
        } else if (user?.user.AcademicYear === 'Third grade') {
            setPath('third-grade')
        } else if (user?.user.AcademicYear === 'Fourth grade') {
            setPath('fourth-grade')
        }
    }, [user]);


    if (user) {
        return <h2 className="w-full h-screen flex items-center justify-center"><Link href={`/quiz/${path}`} className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-xl text-white">Go Quiz</Link></h2>
    }


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="font-[sans-serif]">
                <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
                    <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
                        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                            <FormLogin />
                        </div>
                        <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
                            <Image
                                src="https://readymadeui.com/login-image.webp"
                                className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                                alt="Dining Experience"
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
