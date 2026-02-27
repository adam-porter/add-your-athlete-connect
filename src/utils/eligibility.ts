import type { Athlete, RegistrationItem } from '../types'
import { mockAthletes } from '../data/athletes'

// Helper function to check if athlete is eligible for a registration
export function isAthleteEligible(athlete: Athlete, registration: RegistrationItem): boolean {
  // Check gender eligibility
  const genderMatch = registration.gender === 'Boys & Girls' ||
                      (registration.gender === 'Girls' && athlete.gender === 'female') ||
                      (registration.gender === 'Boys' && athlete.gender === 'male')

  if (!genderMatch) return false

  // Check grade eligibility (simplified check)
  const gradeMap: { [key: string]: number } = {
    'PreK': 0,
    'Kindergarten': 0,
    '1st': 1, '2nd': 2, '3rd': 3, '4th': 4, '5th': 5, '6th': 6,
  }

  const athleteGradeNum = gradeMap[athlete.grade] || 0

  // Parse registration grade ranges
  if (registration.grade === 'PreK') return athleteGradeNum === 0
  if (registration.grade === 'PreK – Kindergarten') return athleteGradeNum === 0
  if (registration.grade === '1st – 3rd') return athleteGradeNum >= 1 && athleteGradeNum <= 3
  if (registration.grade === '4th – 6th') return athleteGradeNum >= 4 && athleteGradeNum <= 6

  return false
}

// Get eligible athletes for a registration
export function getEligibleAthletes(registration: RegistrationItem): Athlete[] {
  return mockAthletes.filter(athlete => isAthleteEligible(athlete, registration))
}
