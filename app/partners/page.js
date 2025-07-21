'use client'

import Link from 'next/link';
import Image from 'next/image';
import { ContactUs } from '../components/blog/forms/contact-us';
import { useAggressiveAuth } from '@/lib/firebase';
import { Login, SignOut } from '../components/general';

//Images
import logo from '@/public/hokusai-nashbrowns-logo.png'
import door from '@/public/local-images/login/door.png'

//Fonts
import { didot } from "@/lib/fonts";
import { AddGrain } from '../components/styles';

export default function Partners() {
    const { user, loading, isAssumed, hasError } = useAggressiveAuth()

    return(
        <AddGrain bg={'bg-base-200'}>
            <div className=" flex flex-col justify-center items-start w-3/4 m-auto">
                <div className='flex flex-col md:flex-row justify-evenly items-center w-full min-h-[calc(100vh-64px)]'>
                    <div className='h-fit w-96'>
                        <Image
                            alt="Door"
                            src={door}
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
                </div>
            </div>
            <div className="flex justify-center items-center bg-[url('/local-images/login/coperation-2.png')] bg-no-repeat bg-cover w-full min-h-screen aspect-16/9">
                <div className="flex flex-col justify-center items-start w-3/4 m-auto py-10 px-3 rounded-xl opacity-90 bg-[url('/textures/noise-grey-2.png')] bg-repeat bg-[length:50px]">
                    <ContactUs/>
                </div>
            </div>
        </AddGrain>
    )
}

