'use client'

import { useAuth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function withAuth(WrappedComponent) {
  const ComponentWithAuth = (props) => {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        router.replace("/partners")
      }
    }, [user, router])

    if (!user) {
      return null // or a loading spinner
    }

    return <WrappedComponent {...props} />
  }

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return ComponentWithAuth
}
