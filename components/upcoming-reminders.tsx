import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

const reminders = [
  {
    id: 1,
    name: "Sarah's Birthday",
    date: "Dec 20, 2024",
    daysUntil: 5,
    relationship: "Friend",
    priority: "high",
  },
  {
    id: 2,
    name: "Wedding Anniversary",
    date: "Jan 5, 2025",
    daysUntil: 21,
    relationship: "Spouse",
    priority: "high",
  },
  {
    id: 3,
    name: "Mom's Birthday",
    date: "Jan 15, 2025",
    daysUntil: 31,
    relationship: "Parent",
    priority: "high",
  },
  {
    id: 4,
    name: "Holiday Cards",
    date: "Dec 24, 2024",
    daysUntil: 9,
    relationship: "Multiple",
    priority: "medium",
  },
]

export function UpcomingReminders() {
  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <div key={reminder.id} className="flex items-start justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{reminder.name}</h4>
              {reminder.priority === "high" && <Badge variant="destructive">Urgent</Badge>}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {reminder.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {reminder.daysUntil} days
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {reminder.relationship}
            </Badge>
          </div>
          <Button size="sm" variant="outline">
            Create Card
          </Button>
        </div>
      ))}
    </div>
  )
}
