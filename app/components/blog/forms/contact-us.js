import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faSignature,
    faPhone,
    faEnvelope,
} from '@awesome.me/kit-237330da78/icons/classic/regular'

export function ContactUs() {

    return (
        <div className="mx-auto w-full md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4A07DA]">
                Not A Partner?
            </h1>
            <h4 className="text-center text-sm sm:text-xs font-semibold text-[#4A07DA]">
                Please fill out the contact form below to get in touch!
            </h4>
            <div className="w-full mt-2 sm:mt-5">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col md:flex-row  gap-3 w-full">
                        <label className="input input-bordered flex items-center gap-2 w-full md:w-1/2">
                            <FontAwesomeIcon icon={faSignature} className='h-5 w-5'/>
                            <input type="text" className="grow" placeholder="First Name" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 w-full md:w-1/2">
                            <FontAwesomeIcon icon={faSignature} className='h-5 w-5'/>
                            <input type="text" className="grow" placeholder="Last Name" />
                        </label>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} className='h-5 w-5'/>
                        <input type="text" className="grow" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <FontAwesomeIcon icon={faPhone} className='h-5 w-5'/>
                        <input type="text" className="grow" placeholder="Phone" />
                    </label>
                    <textarea
                        placeholder="Hey Nash! We would love to partner up on a upcoming project!!"
                        className="textarea textarea-bordered textarea-md w-full">
                    </textarea>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                        <button className="btn btn-active btn-primary btn-block">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
