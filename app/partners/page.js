import Image from 'next/image';
import { ContactUs } from '@/components/blog/forms/contact-us';
import { Login } from '@/components/general';
import { generateMetadata } from '@/lib/seo';

//Images
import door from '@/public/local-images/login/door.png'
import hippyDoor from '@/public/local-images/login/hippy-door.png'

export const metadata = generateMetadata({
    title:"Partners",
    description:"Nash Browns Partner Login Page",
    keywords: ['Nash Browns', 'Nash', 'Browns', 'Login']
});

export default function Partners() {
    return(
        <>
            <div className="hidden md:block">
                <div className="flex flex-col justify-center items-start w-3/4 m-auto">
                    <LoginForm/>
                </div>
            </div>
            <div className="block md:hidden">
                <MobileLoginForm/>
                <br/>
            </div>
            <div className="flex justify-center items-center bg-[url('/local-images/login/hippy-coperation.jpg')] bg-no-repeat bg-cover w-full min-h-screen aspect-16/9">
                <div className="flex flex-col justify-center items-start w-3/4 m-auto py-10 px-3 rounded-xl bg-base-100/50 backdrop-blur-md shadow-md border border-transparent">
                    <ContactUs/>
                </div>
            </div>
        </>
    )
}


function LoginForm() {
    return(
        <div className='flex flex-col md:flex-row gap-40 justify-evenly items-center w-full min-h-[calc(100vh-64px)]'>
            <div className='h-fit w-96'>
                <Image
                    alt="Door"
                    src={hippyDoor}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </div>
            <div className='h-fit w-fit min-w-80'>
                <Login/>
            </div>
        </div>
    )
}

function MobileLoginForm() {
    return(
        <>
            <div className="flex justify-center items-center bg-[url('/local-images/login/hippy-door.png')] bg-no-repeat bg-cover w-full min-h-screen aspect-16/9">
                <div className="flex flex-col justify-center items-start w-3/4 m-auto py-10 px-3 rounded-xl opacity-90 bg-[url('/textures/noise-grey-2.png')] bg-repeat bg-[length:50px]">
                    <Login/>
                </div>
            </div>
        </>
    )
}
