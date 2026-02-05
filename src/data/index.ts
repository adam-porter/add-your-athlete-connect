/**
 * Seed Data for Prototypes
 *
 * This module provides structured sample data for building prototypes.
 * Import what you need and use the helper functions to query related data.
 *
 * @example
 * // Import specific data
 * import { teams, athletes } from './data'
 *
 * // Import everything
 * import { seedData } from './data'
 *
 * // Use helper functions
 * import { getTeamsBySport, getAthletesByTeam } from './data'
 */

// Types
export * from './types'

// Data collections
export { sports } from './sports'
export { teams } from './teams'
export { athletes } from './athletes'
export { competitions } from './competitions'
export { games } from './games'
export { events } from './events'

// Import for internal use
import { sports } from './sports'
import { teams } from './teams'
import { athletes } from './athletes'
import { competitions } from './competitions'
import { games } from './games'
import { events } from './events'
import type { SeedData, Sport, Team, Athlete, Competition, Game, GameEvent } from './types'

/**
 * All seed data in a single object
 */
export const seedData: SeedData = {
  sports,
  teams,
  athletes,
  competitions,
  games,
  events,
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a sport by ID
 */
export function getSport(sportId: string): Sport | undefined {
  return sports.find((s) => s.id === sportId)
}

/**
 * Get a team by ID
 */
export function getTeam(teamId: string): Team | undefined {
  return teams.find((t) => t.id === teamId)
}

/**
 * Get an athlete by ID
 */
export function getAthlete(athleteId: string): Athlete | undefined {
  return athletes.find((a) => a.id === athleteId)
}

/**
 * Get a competition by ID
 */
export function getCompetition(competitionId: string): Competition | undefined {
  return competitions.find((c) => c.id === competitionId)
}

/**
 * Get a game by ID
 */
export function getGame(gameId: string): Game | undefined {
  return games.find((g) => g.id === gameId)
}

/**
 * Get all teams for a specific sport
 */
export function getTeamsBySport(sportId: string): Team[] {
  return teams.filter((t) => t.sportId === sportId)
}

/**
 * Get all athletes for a specific team
 */
export function getAthletesByTeam(teamId: string): Athlete[] {
  return athletes.filter((a) => a.teamId === teamId)
}

/**
 * Get all competitions for a specific sport
 */
export function getCompetitionsBySport(sportId: string): Competition[] {
  return competitions.filter((c) => c.sportId === sportId)
}

/**
 * Get all games for a specific competition
 */
export function getGamesByCompetition(competitionId: string): Game[] {
  return games.filter((g) => g.competitionId === competitionId)
}

/**
 * Get all games for a specific team (home or away)
 */
export function getGamesByTeam(teamId: string): Game[] {
  return games.filter((g) => g.homeTeamId === teamId || g.awayTeamId === teamId)
}

/**
 * Get all events for a specific game
 */
export function getEventsByGame(gameId: string): GameEvent[] {
  return events.filter((e) => e.gameId === gameId)
}

/**
 * Get all events for a specific athlete
 */
export function getEventsByAthlete(athleteId: string): GameEvent[] {
  return events.filter((e) => e.athleteId === athleteId)
}

/**
 * Get the sport for a team
 */
export function getSportForTeam(teamId: string): Sport | undefined {
  const team = getTeam(teamId)
  return team ? getSport(team.sportId) : undefined
}

/**
 * Get the team for an athlete
 */
export function getTeamForAthlete(athleteId: string): Team | undefined {
  const athlete = getAthlete(athleteId)
  return athlete ? getTeam(athlete.teamId) : undefined
}
