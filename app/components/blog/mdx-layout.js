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
    <div className="prose">
      {children}
    </div>
  )
}

