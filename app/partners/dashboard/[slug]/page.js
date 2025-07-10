"use client"

import { withAuth } from "@/lib/firebase";
// import { use } from 'react'
// import { useParams } from 'next/navigation'

const ClientDashboard = ({ params }) => {
    console.log(params);
    const { slug } = params 

    return (
        <div>
            <p>{slug}</p>
        </div>
    )
}

export default withAuth(ClientDashboard)
