import React from 'react'
import { User } from '../interfaces/User'

const init = { name: '', userId: '' }
const UserContext = React.createContext<User>(init)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContext.Provider value={init}>{children}</UserContext.Provider>
}

export default UserContext
