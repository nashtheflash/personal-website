export function MdxLayoutFullWidth({ children }) {
  // Create any shared layout or styles here
  return (
    <div className="prose max-w-none">
      {children}
    </div>
  )
}


//still needs some work but it is a start....
export function MdxLayout({ children }) {
  // Create any shared layout or styles here
    // <div className="prose prose-xl flex flex-col justify-self-center items-start w-full my-3 p-3 text-gray-600 bg-base-300 bg-[url('/textures/default-noise-8.png')] bg-repeat bg-[length:50px] rounded-xl shadow-2xl">
  return (
        <div className="w-full flex flex-col justify-center items-center my-3 px-2 sm:px-0">
            <div className="rounded-xl shadow-lg sm:shadow-2xl bg-gradient-to-r from-[#d0c091] to-[#d6c597] w-full max-w-6xl">
                <div className="prose prose-sm sm:prose-lg lg:prose-xl bg-[url('/textures/default-noise-8.png')] bg-repeat bg-[length:25px] sm:bg-[length:50px]">
                    <div className="p-2 sm:p-3 lg:p-4"> 
                        {children}
                    </div>
                </div>
            </div>
        </div>
  )
}

export function MdxLayoutParentWidth({ children }) {
  // Create any shared layout or styles here
  return (
    <div className="prose w-full px-2 sm:px-6">
      {children}
    </div>
  )
}

export function MdxPageWidth({ children }) {
  // Create any shared layout or styles here
  return (
    <div className="w-full my-3">
      {children}
    </div>
  )
}

export function MdxTableWraper({ children }) {
  return (
    <div className="w-full overflow-x-scroll sm:overflow-auto">
      {children}
    </div>
  )
}
