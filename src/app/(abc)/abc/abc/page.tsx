"use client"
import { useSession } from "next-auth/react"

function AbcabcPage(){
    const { data: session, status } = useSession();

    console.log(session, status)
    console.log("www")
    return (
        <>Abc abc Page</>
    )
}

export default AbcabcPage

