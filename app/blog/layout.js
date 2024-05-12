import { MdxLayout } from "../components/blog/mdx-layout"

export default function MDXPage({ children }) {
  return (
        <div className='flex flex-cal justify-center items-center py-12'>
            <MdxLayout>{children}</MdxLayout>
        </div>
    )
}
