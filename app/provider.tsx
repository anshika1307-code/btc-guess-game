'use client'
import AccountContextProvider from "@/contexts/AccountContext"

export function Providers({children}:{children:React.ReactNode}){
    return(
        <AccountContextProvider>
            {children}
        </AccountContextProvider>
    )
}