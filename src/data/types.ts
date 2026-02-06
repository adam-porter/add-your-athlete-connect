/**
 * Seed Data Types
 *
 * These interfaces define the structure for prototype seed data.
 * All entities use string IDs and have relationships via ID references.
 */

export interface Sport {
  id: string
  name: string
  abbreviation: string
  icon: string
  playersPerTeam: number
}

export interface Team {
  id: string
  name: string
  abbreviation: string
  sportId: string
  city: string
  primaryColor: string
  secondaryColor: string
  logoUrl: string
}

export interface Athlete {
  id: string
  firstName: string
  lastName: string
  teamId: string
  position: string
  jerseyNumber: number
  heightCm: number
  weightKg: number
  birthDate: string
  photoUrl: string
}

export interface Competition {
  id: string
  name: string
  abbreviation: string
  sportId: string
  season: string
  startDate: string
  endDate: string
  teamIds: string[]
}

export interface Game {
  id: string
  competitionId: string
  homeTeamId: string
  awayTeamId: string
  date: string
  venue: string
  homeScore: number | null
  awayScore: number | null
  status: 'scheduled' | 'in_progress' | 'final'
}

export interface GameEvent {
  id: string
  gameId: string
  teamId: string
  athleteId: string | null
  type: 'goal' | 'assist' | 'foul' | 'substitution' | 'timeout' | 'highlight'
  description: string
  timestamp: string
  videoUrl: string | null
}

// Utility type for accessing related data
export interface SeedData {
  sports: Sport[]
  teams: Team[]
  athletes: Athlete[]
  competitions: Competition[]
  games: Game[]
  events: GameEvent[]
}
