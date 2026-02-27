import type { Athlete, RegistrationItem } from '../types'
import type { Athlete as UserAthlete } from '../contexts/UserContext'

// Helper function to parse date in format "Mon DD, YYYY"
function parseDate(dateString: string): Date | null {
  try {
    return new Date(dateString)
  } catch {
    return null
  }
}

// Helper function to check if athlete is eligible for a registration
// This works with both mock data athletes and user-entered athletes
export function isAthleteEligible(athlete: Athlete | UserAthlete, registration: RegistrationItem): boolean {
  // Check gender eligibility
  const genderMatch = registration.gender === 'Mixed' ||
                      registration.gender === 'Boys & Girls' ||
                      (registration.gender === 'Girls' && athlete.gender === 'female') ||
                      (registration.gender === 'Boys' && athlete.gender === 'male')

  if (!genderMatch) return false

  // If registration has birth date range, check that
  if (registration.birthdateRange && 'dateOfBirth' in athlete && athlete.dateOfBirth) {
    // Parse the birth date range (e.g., "Jul 1, 2013 - Jun 30, 2014")
    const rangeParts = registration.birthdateRange.split(' - ')
    if (rangeParts.length === 2) {
      const startDate = parseDate(rangeParts[0])
      const endDate = parseDate(rangeParts[1])
      const athleteDOB = new Date(athlete.dateOfBirth)

      if (startDate && endDate && athleteDOB) {
        // Check if athlete's DOB falls within the range
        return athleteDOB >= startDate && athleteDOB <= endDate
      }
    }
  }

  // Fall back to grade-based eligibility if no birth date range
  if (registration.grade) {
    const gradeMap: { [key: string]: number } = {
      'PreK': 0,
      'pre-k': 0,
      'Kindergarten': 0,
      'kindergarten': 0,
      '1st': 1, '2nd': 2, '3rd': 3, '4th': 4, '5th': 5, '6th': 6,
      '7th': 7, '8th': 8, '9th': 9, '10th': 10, '11th': 11, '12th': 12,
    }

    const athleteGradeNum = gradeMap[athlete.grade] || 0

    // Parse registration grade ranges
    if (registration.grade === 'PreK') return athleteGradeNum === 0
    if (registration.grade === 'PreK – Kindergarten') return athleteGradeNum === 0
    if (registration.grade === '1st – 3rd') return athleteGradeNum >= 1 && athleteGradeNum <= 3
    if (registration.grade === '4th – 6th') return athleteGradeNum >= 4 && athleteGradeNum <= 6
  }

  return false
}

// Get eligible athletes for a registration
// Accepts either mock athletes or user athletes
export function getEligibleAthletes(registration: RegistrationItem, athletes?: (Athlete | UserAthlete)[]): (Athlete | UserAthlete)[] {
  // If no athletes provided, return empty array
  if (!athletes || athletes.length === 0) return []

  return athletes.filter(athlete => isAthleteEligible(athlete, registration))
}
