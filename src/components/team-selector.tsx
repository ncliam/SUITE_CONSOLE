import { useAtom } from 'jotai'
import { activeTeamIdAtom } from '@/stores/applicationStore'
import { useTeams } from '@/hooks/use-team'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'

export function TeamSelector() {
  const { data: teams, isLoading } = useTeams()
  const [activeTeamId, setActiveTeamId] = useAtom(activeTeamIdAtom)

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Đang tải teams...</div>
  }

  if (!teams || teams.length === 0) {
    return <div className="text-sm text-muted-foreground">Không có team nào</div>
  }

  const activeTeam = teams.find(t => t.id === activeTeamId)

  return (
    <Select value={activeTeamId ?? ''} onValueChange={setActiveTeamId}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Chọn team">
          {activeTeam && (
            <div className="flex items-center gap-2">
              <span>{activeTeam.name}</span>
              {activeTeam.verified && (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              )}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {teams.map((team) => (
          <SelectItem key={team.id} value={team.id}>
            <div className="flex items-center gap-2">
              <span>{team.name}</span>
              {team.verified ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <Badge variant="secondary" className="text-xs">
                  Chờ duyệt
                </Badge>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
