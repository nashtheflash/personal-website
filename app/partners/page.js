'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ContactUs } from '../components/blog/forms/contact-us';
import { useAggressiveAuth } from '@/lib/firebase';
import { Login, SignOut } from '../components/general';

import logo from '@/public/hokusai-nashbrowns-logo.png'
import { didot } from "@/lib/fonts";

export default function ProjectsHome() {
    const { user, loading, isAssumed, hasError } = useAggressiveAuth()

    return(
        <div className="bg-[url('/noise.png')] bg-repeat bg-[length:50px]">
            <div className='flex flex-col md:flex-row justify-evenly items-center min-h-[calc(100vh-64px)]'>
                <div className='h-fit w-fit min-w-96'>
                    <Image
                        alt="Mountains"
                        src={logo}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
                <div className='h-fit w-fit'>
                    <Login/>
                </div>
                {user && (
                    <>
                        <p className="text-xl">
                            Welcome, {user.email}!
                            {isAssumed && <span className="text-sm text-yellow-400 ml-2">(assumed)</span>}
                            {hasError && <span className="text-sm text-red-400 ml-2">(error)</span>}
                        </p>
                        <Link
                            href="/partners/dashboard/tune-outdoor"
                            className="text-blue-500 underline text-lg"
                        >
                            <p>Visit the protected page</p>
                        </Link>
                        <SignOut />
                    </>
                )}
            </div>
            <div className="divider divider-neutral px-5"></div>
            <h2 className='text-center font-mono'>Related Articles</h2>
            <h2 className='text-center text-2xl font-didot'>Related Articles</h2>
            <h2 className={`text-center text-2xl ${didot.className}`}>Related Articles</h2>
            <ContactUs/>
        </div>
    )
}

