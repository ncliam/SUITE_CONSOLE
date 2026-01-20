import { atom } from 'jotai'

// Active team ID được lưu trong applicationStore.ts (activeTeamIdAtom)
// File này chứa các derived atoms và helper atoms khác cho team management

// Atom lưu teamId để query (for React Query hooks)
export const currentTeamIdAtom = atom<string | null>(null)
