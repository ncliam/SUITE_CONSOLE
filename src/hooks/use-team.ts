import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { activeTeamIdAtom, savedAppState, appsState } from '@/stores/applicationStore'
import { request, requestWithPost, requestWithPatch, requestWithDelete } from '@/utils/request'
import type { Team, TeamMember } from '@/types/team'
import { useTeamSubscriptions } from './use-app-subscription'

export type TeamRole = 'owner' | 'admin' | 'member' | null

// Get all teams for current user
export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      return await request<Team[]>('/teams')
    },
  })
}

// Create new team
export function useCreateTeam() {
  const queryClient = useQueryClient()
  const setActiveTeamId = useSetAtom(activeTeamIdAtom)

  return useMutation({
    mutationFn: async (teamData: Partial<Team>) => {
      return await requestWithPost<Partial<Team>, Team>('/teams', teamData)
    },
    onSuccess: (newTeam) => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
      // Tự động chọn team mới tạo
      if (newTeam?.id) {
        setActiveTeamId(newTeam.id)
      }
    },
  })
}

// Update team
export function useUpdateTeam() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...teamData }: Partial<Team> & { id: string }) => {
      return await requestWithPatch<Partial<Team>, Team>(`/teams/${id}`, teamData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    },
  })
}

// Get active team (from owned teams or accepted invitations)
export function useActiveTeam() {
  const activeTeamId = useAtomValue(activeTeamIdAtom)

  const query = useQuery({
    queryKey: ['team', activeTeamId],
    queryFn: async () => {
      const [teams, invitations] = await Promise.all([
        request<Team[]>('/teams'),
        request<{ id: string; status: string; role: string; team?: Team }[]>('/invitations'),
      ])

      // Find in owned teams first
      const ownedTeam = teams.find(t => t.id === activeTeamId)
      if (ownedTeam) {
        return { team: ownedTeam, role: 'owner' as TeamRole, isOwner: true }
      }

      // Find in active invitations
      const invitation = invitations.find(
        inv => inv.status === 'active' && inv.team?.id === activeTeamId
      )
      if (invitation?.team) {
        return {
          team: invitation.team,
          role: invitation.role as TeamRole,
          isOwner: false,
        }
      }

      return { team: null, role: null, isOwner: false }
    },
    enabled: !!activeTeamId,
  })

  return {
    ...query,
    data: query.data?.team ?? null,
    role: query.data?.role ?? null,
    isOwner: query.data?.isOwner ?? false,
  }
}

// Get team members by subscription
export function useTeamMembers() {
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const activeAppCode = useAtomValue(savedAppState)
  const apps = useAtomValue(appsState)
  const { data: subscriptions } = useTeamSubscriptions()

  // Find active app
  const activeApp = apps.find(app => app.code === activeAppCode)

  // Find subscription for current team and app
  const subscription = subscriptions?.find(
    (sub: any) => sub.team_id === activeTeamId && sub.app_id === activeApp?.id
  )

  return useQuery({
    queryKey: ['team-members', subscription?.id],
    queryFn: async () => {
      if (!subscription?.id) return []

      // Call real API endpoint: GET /subscriptions/{subscription_id}/members
      const API_URL = import.meta.env.VITE_API_URL
      if (!API_URL) {
        return []
      }

      return await request<TeamMember[]>(`/subscriptions/${subscription.id}/members`)
    },
    enabled: !!subscription?.id,
  })
}

// Invite team member (creates member with pending status)
export function useInviteTeamMember() {
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const activeAppCode = useAtomValue(savedAppState)
  const apps = useAtomValue(appsState)
  const { data: subscriptions } = useTeamSubscriptions()

  const activeApp = apps.find(app => app.code === activeAppCode)
  const subscription = subscriptions?.find(
    (sub: any) => sub.team_id === activeTeamId && sub.app_id === activeApp?.id
  )

  return {
    inviteMember: async (email: string, role: string = 'member') => {
      if (!subscription?.id) {
        throw new Error('No active subscription found')
      }

      const API_URL = import.meta.env.VITE_API_URL
      if (!API_URL) {
        throw new Error('API URL not configured')
      }

      return await requestWithPost<{ email: string; role: string }, TeamMember>(
        `/subscriptions/${subscription.id}/members`,
        { email, role }
      )
    },
    subscriptionId: subscription?.id,
  }
}

// Revoke team member (owner only - deletes invitation)
export function useRevokeMember() {
  const queryClient = useQueryClient()
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const activeAppCode = useAtomValue(savedAppState)
  const apps = useAtomValue(appsState)
  const { data: subscriptions } = useTeamSubscriptions()

  const activeApp = apps.find(app => app.code === activeAppCode)
  const subscription = subscriptions?.find(
    (sub: any) => sub.team_id === activeTeamId && sub.app_id === activeApp?.id
  )

  return useMutation({
    mutationFn: async (memberId: string) => {
      if (!subscription?.id) {
        throw new Error('No active subscription found')
      }

      return await requestWithDelete<{ message: string }>(
        `/subscriptions/${subscription.id}/members/${memberId}`
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-members', subscription?.id] })
    },
  })
}
