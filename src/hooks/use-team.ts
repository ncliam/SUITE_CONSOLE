import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { activeTeamIdAtom } from '@/stores/applicationStore'
import { request } from '@/utils/request'
import type { Team, TeamMember } from '@/types/team'

// Get all teams for current user
export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      return await request<Team[]>('/teams')
    },
  })
}

// Get active team
export function useActiveTeam() {
  const activeTeamId = useAtomValue(activeTeamIdAtom)

  return useQuery({
    queryKey: ['team', activeTeamId],
    queryFn: async () => {
      const teams = await request<Team[]>('/teams')
      return teams.find(t => t.id === activeTeamId) ?? null
    },
    enabled: !!activeTeamId,
  })
}

// Get team members
export function useTeamMembers(teamId?: string) {
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const selectedTeamId = teamId ?? activeTeamId

  return useQuery({
    queryKey: ['team-members', selectedTeamId],
    queryFn: async () => {
      const allMembers = await request<TeamMember[]>('/team-members')
      return allMembers.filter(m => m.teamId === selectedTeamId)
    },
    enabled: !!selectedTeamId,
  })
}
