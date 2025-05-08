import { Footer } from "@/app/components/blog";

export default function MDXPage({ children }) {

    return (
        <>
            {children}
            <Footer/>
        </>
    )
}
