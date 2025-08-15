import { MdxLayout } from "@/components/blog";
import { Footer } from "@/components/blog";

export default function WritingLayout({ children }) {
    return (
        <>
            <div className="w-full h-full min-h-screen">
                <MdxLayout>
                    {children}
                </MdxLayout>
            </div>
            <Footer/>
        </>
    );
}
