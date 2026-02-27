export interface RegistrationItem {
  id: string
  price: string
  name: string
  startDate: string
  endDate: string
  fullPayment: string
  depositPayment: string
  birthdateRange: string
  gender: string
  grade: string
  description: string
}

export interface Athlete {
  name: string
  gender: string
  grade: string
}

export type Theme = 'dark' | 'light'
