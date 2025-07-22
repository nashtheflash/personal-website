'use client'

import Image from 'next/image';
import Link from 'next/link';

import { useAggressiveAuth } from '@/lib/firebase';
import { SignOut } from '@/app//components/general';

import nashBrwonsWhite from '@/public/nashbrowns-logo-white.png'
import hokuasiWordLogo from '@/public/hokusai-nashborwns-logo.png'

//Fonts
import { didot } from "@/lib/fonts"
import { AddGrain } from '../styles';

const menuItems = [
    {name: 'Blog', href: '/blog'},
    // {name: 'Projects', href: '/projects'},
    // {name: 'Marketing', href: '/blog/marketing'},
    // {name: 'Outdoor', href: '/blog/outdoor'},
    // {name: 'Travel', href: '/blog/travel'},
]

export function NavBar() {

    return(
        <div className="navbar h-11 max-h-11 border-b-4 border-black text-base-content">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            menuItems.map((item) => (
                                <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                            ))
                        }
                    </ul>
                </div>
                <Link className="" href='/' >
                    <Image
                        src={hokuasiWordLogo}
                        alt='Nash Borowns Logo Long'
                        width={248}
                        height={48}
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className={`menu menu-horizontal px-1 text-2xl ${didot.className}`}>
                    {
                        menuItems.map((item) => (
                            <li key={item.name}><Link href={item.href}>{item.name}</Link></li>
                        ))
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <ul className={`menu menu-horizontal px-1 text-2xl text-base-content ${didot.className}`}>
                    <PartnerSignOutButton/>
                </ul>
            </div>
        </div>
    )
}

function PartnerSignOutButton() {
    const { user, loading, isAssumed, hasError } = useAggressiveAuth()

    if(user) {
        return (
            <div className='flex flex-row gap-1'>
                <li><Link href='/partners/dashboard'>Dashboard</Link></li>
                <li><SignOut/></li>
            </div>
        )
    }

    return (
        <li><Link href='/partners'>Partners</Link></li>
    )

}
