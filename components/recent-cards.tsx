import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

const recentCards = [
  {
    id: 1,
    title: "Happy Birthday!",
    recipient: "Sarah",
    occasion: "Birthday",
    date: "Dec 10, 2024",
    status: "sent",
  },
  {
    id: 2,
    title: "Congratulations!",
    recipient: "John",
    occasion: "Graduation",
    date: "Dec 8, 2024",
    status: "sent",
  },
  {
    id: 3,
    title: "Thank You",
    recipient: "Mom",
    occasion: "Thank You",
    date: "Dec 5, 2024",
    status: "sent",
  },
  {
    id: 4,
    title: "Get Well Soon",
    recipient: "Emma",
    occasion: "Get Well",
    date: "Dec 1, 2024",
    status: "draft",
  },
]

export function RecentCards() {
  return (
    <div className="space-y-4">
      {recentCards.map((card) => (
        <div key={card.id} className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{card.title}</h4>
              <Badge variant={card.status === "sent" ? "default" : "secondary"}>{card.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              To: {card.recipient} • {card.occasion}
            </p>
            <p className="text-xs text-muted-foreground">{card.date}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
