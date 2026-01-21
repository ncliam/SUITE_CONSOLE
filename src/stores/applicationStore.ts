import { atom } from 'jotai'
import { atomWithStorage } from "jotai/utils";
import { requestWithFallback } from "@/utils/request";
import type { Team } from '@/types/team'

export interface SuiteApp {
  id: string;
  name: string;
  code: string;
  desc?: string;
  connected?: boolean;
  logo?: string;
}

// Original teams từ server (read-only)
export const originalTeamsState = atom(async () => {
  const data = await requestWithFallback<Team[]>('/teams', [])
  return data
})

// Local teams state (mutable) - initialized from original
export const localTeamsAtom = atom<Team[]>([])

// Combined teams state - uses local if available, otherwise original
export const teamsState = atom(
  async (get) => {
    const localTeams = get(localTeamsAtom)
    if (localTeams.length > 0) {
      return localTeams
    }
    return await get(originalTeamsState)
  }
)

// Track IDs của teams có thay đổi
export const modifiedTeamIdsAtom = atom<Set<string>>(new Set<string>())

export const appsState = atom(async () => {
  const data = await requestWithFallback<SuiteApp[]>('/apps', [])
  return data
})


export const savedAppState = atomWithStorage<SuiteApp["code"]>("current_app", "");

export const activeAppState = atom(async (get) => {
  const savedApp = get(savedAppState);
  if (savedApp) {
    const apps = await get(appsState);
    const match_apps = apps.filter((a) =>
      a.code == savedApp
    );
    return (match_apps.length > 0) ? match_apps[0] : undefined;
  }
  return undefined;

});

// Active team management (*** KEY for team-based architecture)
export const activeTeamIdAtom = atomWithStorage<string | null>('active_team_id', null)

// Derived atom - get active team details
export const activeTeamAtom = atom(async (get) => {
  const teams = await get(teamsState)
  const activeTeamId = get(activeTeamIdAtom)
  return teams.find(t => t.id === activeTeamId) ?? null
})



