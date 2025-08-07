import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faSignature,
    faPhone,
    faEnvelope,
} from '@awesome.me/kit-237330da78/icons/classic/regular'

export function ContactUs() {

    return (
        <div className="mx-auto w-full md:p-10 py-5 md:py-0">
            <h2 className={`text-center text-2xl sm:text-6xl font-didot text-base-content`}>Work With Us</h2>
            <div className="w-full mt-2 sm:mt-5">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col md:flex-row gap-3 w-full">
                        <label 
                            className="group input input-bordered flex items-center gap-2 w-full md:w-1/2 font-serif text-base-content border border-indigo-900 bg-opacity-10 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                        >
                            <FontAwesomeIcon icon={faSignature} className='h-5 w-5'/>
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                className={`grow text-base-content placeholder:text-base-content placeholder:font-didot`}
                            />
                        </label>
                        <label 
                            className="group input input-bordered flex items-center gap-2 w-full md:w-1/2 font-serif text-base-content border border-indigo-900 bg-opacity-10 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                        >
                            <FontAwesomeIcon icon={faSignature} className='h-5 w-5'/>
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                className={`grow text-base-content placeholder:text-base-content placeholder:font-didot`}
                            />
                        </label>
                    </div>
                    <label 
                        className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-10 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                        <input 
                            type="text" 
                            placeholder="Email"
                            className={`grow text-base-content placeholder:text-base-content placeholder:font-didot`}
                        />
                    </label>
                    <label 
                        className="group input input-bordered flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-10 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faPhone} className='h-5 w-5'/>
                        <input 
                            type="text" 
                            placeholder="Phone"
                            className={`grow text-base-content placeholder:text-base-content placeholder:font-didot`}
                        />
                    </label>
                    <textarea
                        placeholder="Hey Nash! We would love to partner up on a upcoming project!!"
                        className={`group input input-bordered placeholder:text-base-content placeholder:font-didot flex items-center gap-2 font-serif text-base-content border border-indigo-900 bg-opacity-10 bg-black rounded-xl shadow-sm has-[:focus]:bg-opacity-20 hover:bg-opacity-20 hover:shadow-md transition-all duration-200`}
                    >
                    </textarea>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                        <button 
                            className="px-6 py-2 w-full font-serif text-base-content border border-indigo-900 bg-opacity-10 bg-black rounded-xl shadow-sm hover:bg-opacity-20 hover:shadow-md transition-all duration-200"
                           >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
