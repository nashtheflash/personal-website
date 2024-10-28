import { MdxLayout } from "../components/blog/mdx-layout"

export default function MDXPage({ children }) {
  return (
        <div className='grid grid-cols-1 justify-items-stretch w-full h-fit bg-[#f2f1ed] text-gray-700'>
            {children}
        </div>
    )
}
