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


export const teamsState = atom(async () => {
  const data = await requestWithFallback<Team[]>('/teams', [])
  return data
})

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



