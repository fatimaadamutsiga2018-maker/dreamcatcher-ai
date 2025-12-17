import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, Calendar } from "lucide-react"

interface RelationshipViewProps {
  searchQuery: string
}

const relationshipData = [
  {
    id: 1,
    name: "Sarah Johnson",
    relationship: "Friend",
    totalCards: 8,
    lastCard: "Dec 10, 2024",
    frequency: "Every 2 months",
    trend: "up",
    cards: [
      { occasion: "Birthday", date: "Dec 10, 2024" },
      { occasion: "Thank You", date: "Oct 15, 2024" },
      { occasion: "Holiday", date: "Aug 20, 2024" },
    ],
  },
  {
    id: 2,
    name: "Mom",
    relationship: "Parent",
    totalCards: 12,
    lastCard: "Dec 5, 2024",
    frequency: "Monthly",
    trend: "up",
    cards: [
      { occasion: "Thank You", date: "Dec 5, 2024" },
      { occasion: "Birthday", date: "Nov 10, 2024" },
      { occasion: "Mother's Day", date: "May 12, 2024" },
    ],
  },
  {
    id: 3,
    name: "John Smith",
    relationship: "Friend",
    totalCards: 5,
    lastCard: "Dec 8, 2024",
    frequency: "Every 3 months",
    trend: "stable",
    cards: [
      { occasion: "Graduation", date: "Dec 8, 2024" },
      { occasion: "Birthday", date: "Sep 15, 2024" },
    ],
  },
]

export function RelationshipView({ searchQuery }: RelationshipViewProps) {
  return (
    <div className="space-y-6">
      {relationshipData.map((person) => (
        <Card key={person.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {person.name}
                  <Badge variant="secondary">{person.relationship}</Badge>
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {person.totalCards} cards sent
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {person.frequency}
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      person.trend === "up" ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {person.trend === "up" ? "Active" : "Stable"}
                  </span>
                </div>
              </div>
              <Button size="sm">Create Card</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Recent Cards</h4>
              <div className="space-y-2">
                {person.cards.map((card, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Heart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{card.occasion}</p>
                        <p className="text-xs text-muted-foreground">{card.date}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
