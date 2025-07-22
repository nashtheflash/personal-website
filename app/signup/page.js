import { Suspense } from "react"
import { SignUp } from "../components/general";


export default function SignUpPage() {
    return (
        <Suspense fallback={'Loading...'}>
            <div className="flex justify-center items-center bg-[url('/local-images/signup/sking.jpg')] bg-no-repeat bg-cover w-full h-[calc(100vh-64px)] aspect-16/9">
                <div className="flex flex-col justify-center items-start w-fit m-auto py-4 px-3 rounded-xl opacity-90 bg-[url('/textures/noise-grey-2.png')] bg-repeat bg-[length:50px]">
                    <div className="mx-auto w-fit">
                        <SignUp/>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
