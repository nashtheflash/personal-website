import { generateMetadata } from '@/utils';
import { Footer } from "../components/blog";

export const metadata = generateMetadata({
    title:"Partners",
    description:"Nash Browns Partner Login Page",
    keywords: ['Nash Browns', 'Nash', 'Browns', 'Login']
});

export default function PartnerLayout({ children }) {
    
    return (
        <>
            {children}
            <Footer/>
        </>
    );
}
