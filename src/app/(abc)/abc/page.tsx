"use client"
import { useSession } from "next-auth/react"

function AbcPage(){
    const { data: session, status } = useSession();

    console.log(session, status)
    console.log("www")
    return (
        <>AbcPage</>
    )
}

export default AbcPage