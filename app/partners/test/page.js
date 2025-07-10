"use client"

import { withAuth } from "@/lib/firebase";
// import { use } from 'react'
// import { useParams } from 'next/navigation'

const ClientDashboard = () => {

    return (
        <div>
            <p>TESTING PROTECTION</p>
        </div>
    )
}

export default withAuth(ClientDashboard)
