export interface UserProps {
    id?: string
    profilePictureHash?: string
    ordinal_address?:string
    payment_address?:string
    balance?:number;
    isConnected: boolean;
    error?: string;
    isLoading?: boolean;
  }
  
export  interface CreateContextProps {
    children: React.ReactNode
}
  
export  interface CreateUserContextProps {
    user: UserProps | undefined
    setUser: (user: UserProps | undefined) => void
  
}