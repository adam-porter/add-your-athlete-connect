import type { Competition } from '../types'

export const competitions: Competition[] = [
  // Basketball
  {
    id: 'comp-metro-basketball-league',
    name: 'Metro Basketball League',
    abbreviation: 'MBL',
    sportId: 'sport-basketball',
    season: '2024-25',
    startDate: '2024-11-01',
    endDate: '2025-03-15',
    teamIds: [
      'team-lincoln-lions',
      'team-riverside-rockets',
      'team-eastwood-eagles',
      'team-westfield-wolves',
    ],
  },
  {
    id: 'comp-regional-hoops-classic',
    name: 'Regional Hoops Classic',
    abbreviation: 'RHC',
    sportId: 'sport-basketball',
    season: '2024-25',
    startDate: '2024-12-20',
    endDate: '2024-12-23',
    teamIds: [
      'team-lincoln-lions',
      'team-riverside-rockets',
    ],
  },

  // Football
  {
    id: 'comp-state-football-conference',
    name: 'State Football Conference',
    abbreviation: 'SFC',
    sportId: 'sport-football',
    season: '2024',
    startDate: '2024-08-30',
    endDate: '2024-12-07',
    teamIds: [
      'team-northside-knights',
      'team-southport-stallions',
    ],
  },

  // Soccer
  {
    id: 'comp-premier-soccer-league',
    name: 'Premier Soccer League',
    abbreviation: 'PSL',
    sportId: 'sport-soccer',
    season: '2024',
    startDate: '2024-03-01',
    endDate: '2024-10-31',
    teamIds: [
      'team-metro-fc',
      'team-united-city',
    ],
  },

  // Volleyball
  {
    id: 'comp-coastal-volleyball-invitational',
    name: 'Coastal Volleyball Invitational',
    abbreviation: 'CVI',
    sportId: 'sport-volleyball',
    season: '2024',
    startDate: '2024-09-15',
    endDate: '2024-11-20',
    teamIds: [
      'team-coastal-wave',
      'team-valley-thunder',
    ],
  },
]
