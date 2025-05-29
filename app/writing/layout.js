import { Footer } from "../components/blog";

export default function WritingLayout({ children }) {
    return (
        <>
            <div className="w-full h-full min-h-screen bg-slate-50">
                <div className="prose prose-lg flex flex-col justify-self-center items-start w-full py-3 px-3 sm:px-16 text-gray-600">
                    {children}
                </div>
            </div>
            <Footer/>
        </>
    );
}
