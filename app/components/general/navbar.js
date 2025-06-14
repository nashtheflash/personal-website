import Image from 'next/image';

const menuItems = [
    {name: 'Blog', href: '/blog'},
    // {name: 'Projects', href: '/projects'},
    // {name: 'Marketing', href: '/blog/marketing'},
    // {name: 'Outdoor', href: '/blog/outdoor'},
    // {name: 'Travel', href: '/blog/travel'},
]

export function NavBar() {
    return(
        <div className="navbar bg-base-300 h-11 max-h-11">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            menuItems.map((item) => (
                                <li key={item.name}><a href={item.href}>{item.name}</a></li>
                            ))
                        }
                    </ul>
                </div>
                <a className="" href='/' >
                    <Image
                        src={"/nashbrowns-logo-white.png"}
                        alt='Nash Borowns Logo Long'
                        width={248}
                        height={48}
                    />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        menuItems.map((item) => (
                            <li key={item.name}><a href={item.href}>{item.name}</a></li>
                        ))
                    }
                </ul>
            </div>
            <div className="navbar-end">
            </div>
        </div>
    )
}
