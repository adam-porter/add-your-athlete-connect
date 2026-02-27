import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Athlete {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  grade: string
}

export interface UserData {
  firstName: string
  lastName: string
  email: string
  athletes: Athlete[]
}

interface UserContextType {
  userData: UserData | null
  setUserData: (data: UserData | null) => void
  addAthlete: (athlete: Athlete) => void
  clearUserData: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const USER_DATA_KEY = 'ux-prototype-user-data'

export function UserProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage
  const [userData, setUserDataState] = useState<UserData | null>(() => {
    try {
      const stored = localStorage.getItem(USER_DATA_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  // Persist to localStorage whenever userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
    } else {
      localStorage.removeItem(USER_DATA_KEY)
    }
  }, [userData])

  const setUserData = (data: UserData | null) => {
    setUserDataState(data)
  }

  const addAthlete = (athlete: Athlete) => {
    if (userData) {
      setUserDataState({
        ...userData,
        athletes: [...userData.athletes, athlete]
      })
    }
  }

  const clearUserData = () => {
    setUserDataState(null)
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, addAthlete, clearUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
