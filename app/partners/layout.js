import { Footer } from "@/components/blog";

import { generateMetadata } from '@/lib/seo';
export const metadata = generateMetadata({
    title:"Partners",
    description:"Nash Browns Partner Login Page",
    keywords: []
});

export default function PartnerLayout({ children }) {
    
    return (
        <>
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer/>
        </>
    );
}
