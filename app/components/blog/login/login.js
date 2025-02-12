import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faEnvelope,
    faKey,
} from '@awesome.me/kit-237330da78/icons/classic/regular'

export function Login() {
    return (
        <div className="mx-auto w-full md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4A07DA]">
                Login
            </h1>
            <div className="w-full mt-5 sm:mt-8">
                <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                    <label className="input input-bordered flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                        <input type="text" className="grow" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <FontAwesomeIcon icon={faKey} className='h-5 w-5'/>
                        <input type="password" className="grow" placeholder="Password" />
                    </label>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                        <button className="btn btn-active btn-primary btn-block">
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
