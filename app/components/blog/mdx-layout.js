export function MdxLayoutFullWidth({ children }) {
  // Create any shared layout or styles here
  return (
    <div className="prose max-w-none">
      {children}
    </div>
  )
}


export function MdxLayout({ children }) {
  // Create any shared layout or styles here
  return (
    <div className="prose prose-lg flex flex-col justify-self-center items-start w-full my-3">
      {children}
    </div>
  )
}

export function MdxLayoutParentWidth({ children }) {
  // Create any shared layout or styles here
  return (
    <div className="prose w-full px-6">
      {children}
    </div>
  )
}

