import { useAtomValue } from 'jotai'
import { userAtom } from '@/stores/authStore'
import { activeTeamIdAtom } from '@/stores/applicationStore'
import { useTeamMembers, useActiveTeam } from './use-team'
import type { TeamPermission } from '@/types/team'

const rolePermissions: Record<string, TeamPermission[]> = {
  owner: [
    'view:billing',
    'manage:billing',
    'view:invoices',
    'pay:invoices',
    'invite:members',
    'manage:members',
    'edit:team',
    'subscribe:apps',
    'access:apps',
  ],
  billing_admin: [
    'view:billing',
    'manage:billing',
    'view:invoices',
    'pay:invoices',
    'subscribe:apps',
    'access:apps',
  ],
  member: [
    'view:billing',
    'access:apps',
  ],
}

export function usePermission() {
  const user = useAtomValue(userAtom)
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const { data: activeTeam } = useActiveTeam()
  const { data: members } = useTeamMembers()

  // Tìm role của user trong active team
  const currentMember = members?.find(m => m.email === user?.email)
  const teamRole = currentMember?.role || 'member'

  const can = (permission: TeamPermission): boolean => {
    // *** KEY: subscribe:apps chỉ available nếu team verified
    if (permission === 'subscribe:apps' && !activeTeam?.verified) {
      return false
    }

    return rolePermissions[teamRole]?.includes(permission) ?? false
  }

  const hasRole = (role: 'owner' | 'billing_admin' | 'member'): boolean => {
    return teamRole === role
  }

  return {
    can,
    hasRole,
    role: teamRole,
    isTeamVerified: activeTeam?.verified ?? false,
  }
}
