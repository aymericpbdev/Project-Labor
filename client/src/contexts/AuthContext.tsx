/*
 * AuthContext - Version 1 (mock en dur)
 *
 * Utilisateur actuellement mocké : Jean Dupont (agriculteur)
 *
 * Pour tester un autre rôle, change simplement la ligne "role" dans mockCurrentUser :
 *   - 'agriculteur'
 *   - 'admin'
 *   - 'client'
 *
 * Une fois le vrai backend + MSW prêt, on remplacera le mock par un vrai appel API.
 */

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/user'
// import { Role } from '../types/enums'
import {
  login as loginService,
  logout as logoutService,
  register as registerService,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  fetchCurrentUser,
} from '../services/authService'

interface AuthContextType {
  currentUser: User | null
  role: User['role'] | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      const user = await fetchCurrentUser()
      setCurrentUser(user)
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const role = currentUser?.role ?? null

  const login = async (email: string, password: string): Promise<void> => {
    const user = await loginService(email, password)
    setCurrentUser(user)
  }

  const logout = (): void => {
    logoutService()
    setCurrentUser(null)
  }

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ): Promise<void> => {
    const user = await registerService(email, password, firstName, lastName, role)
    setCurrentUser(user)
  }

  const forgotPassword = async (email: string): Promise<void> => {
    await forgotPasswordService(email)
  }

  const resetPassword = async (
    token: string,
    newPassword: string
  ): Promise<void> => {
    await resetPasswordService(token, newPassword)
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      role,
      isLoading,
      login,
      logout,
      register,
      forgotPassword,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth() doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
