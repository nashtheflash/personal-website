import { Suspense } from "react"
import { ForgotPassword } from "@/app/components/auth";
import { AddBackground } from "@/app/components/styles";
import { SimpleSpinner } from "@/app/components/loading"

import { didot } from "@/lib/fonts";

export default function ForgotPasswordPage({ searchParams }) {
    const mode = searchParams?.mode;
    const oobCode = searchParams?.oobCode;
    const apiKey = searchParams?.apiKey;
    const lang = searchParams?.lang;

    return (
        <Suspense fallback={<SimpleSpinner/>}>
            <div className="flex justify-center items-center bg-[url('/local-images/forgot-password/dog-shit-3.jpg')] bg-no-repeat bg-cover w-full h-[calc(100vh-64px)] aspect-16/9">
                <AddBackground bgColor="bg-base-100 rounded-xl">
                    <div className="flex flex-col justify-center items-start w-fit m-auto py-4 px-3 opacity-90">
                        <div className="mx-auto w-fit">
                            <div className="flex justify-center items-center w-full text-base-content">
                                <h2 className={`text-3xl p-0 ${didot.className}`}>
                                    {mode === 'resetPassword' ? 'Set New Password' : 'Reset Password'}
                                </h2>
                            </div>
                            <ForgotPassword 
                                mode={mode}
                                oobCode={oobCode}
                                apiKey={apiKey}
                                lang={lang}
                            />
                        </div>
                    </div>
                </AddBackground>
            </div>
        </Suspense>
    );
}


