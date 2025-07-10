'use client'

import Link from 'next/link';
import { ContactUs } from '../components/blog/forms/contact-us';
import { useAuth } from '@/lib/firebase';
import { Login, SignOut } from '../components/general';

export default function ProjectsHome() {
    const { user, loading } = useAuth()

    return(
        <div className='flex flex-col md:flex-row justify-evenly items-center min-h-[calc(100vh-64px)]'>
            <div className='h-fit w-fit min-w-96'>
                <Login/>
            </div>
            <div className='h-fit w-fit'>
                <ContactUs/>
            </div>
        {user && (
            <>
              <p className="text-xl">Welcome, {user.email}!</p>
              <Link
                href="/partners/test"
                className="text-blue-500 underline text-lg"
              >
                <p>Visit the protected page</p>
              </Link>
              <SignOut />
            </>
          )}
        </div>
    )
}

