import { MdxLayout } from "../components/blog/mdx-layout"

export default function MDXPage({ children }) {
  return (
        <div className='flex flex-col justify-center items-center py-12 w-full'>
            <MdxLayout>{children}</MdxLayout>
        </div>
    )
}
