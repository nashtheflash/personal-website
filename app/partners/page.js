import { Login } from '../components/blog/login/login';
import { ContactUs } from '../components/blog/forms/contact-us';

export default function ProjectsHome() {

    return(
        <div className='flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-64px)]'>
            <div className='h-fit w-1/2'>
                <Login/>
            </div>
            <div className='h-fit w-1/2'>
                <ContactUs/>
            </div>
        </div>
    )
}

