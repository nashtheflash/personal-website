export default function MDXPage({ children }) {
  return (
        <div className='grid grid-cols-1 justify-items-stretch w-full min-h-[calc(100vh-64px)] bg-[#f2f1ed] text-gray-900'>
            {children}
        </div>
    )
}
