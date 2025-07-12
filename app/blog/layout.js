export default function MDXPage({ children }) {
  return (
        <div className="grid grid-cols-1 justify-items-stretch w-full min-h-[calc(100vh-64px)] bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px] text-gray-900">
            {children}
        </div>
    )
}
