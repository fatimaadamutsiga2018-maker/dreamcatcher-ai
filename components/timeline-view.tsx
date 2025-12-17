import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Heart } from "lucide-react"

interface TimelineViewProps {
  searchQuery: string
  filterOccasion: string
}

const timelineData = [
  {
    year: 2024,
    months: [
      {
        month: "December",
        cards: [
          {
            id: 1,
            title: "Happy Birthday Sarah!",
            recipient: "Sarah",
            occasion: "Birthday",
            date: "Dec 10",
            relationship: "Friend",
            preview: "Wishing you all the happiness on your special day...",
          },
          {
            id: 2,
            title: "Congratulations John!",
            recipient: "John",
            occasion: "Graduation",
            date: "Dec 8",
            relationship: "Friend",
            preview: "Your hard work has paid off! Congratulations on...",
          },
        ],
      },
      {
        month: "November",
        cards: [
          {
            id: 3,
            title: "Happy Anniversary!",
            recipient: "Partner",
            occasion: "Anniversary",
            date: "Nov 28",
            relationship: "Spouse",
            preview: "Another year of love and memories together...",
          },
          {
            id: 4,
            title: "Get Well Soon Emma",
            recipient: "Emma",
            occasion: "Get Well",
            date: "Nov 20",
            relationship: "Friend",
            preview: "Sending healing thoughts and warm wishes...",
          },
        ],
      },
    ],
  },
  {
    year: 2023,
    months: [
      {
        month: "December",
        cards: [
          {
            id: 5,
            title: "Happy Holidays!",
            recipient: "Team",
            occasion: "Holiday",
            date: "Dec 20",
            relationship: "Colleagues",
            preview: "Wishing you all a wonderful holiday season...",
          },
        ],
      },
    ],
  },
]

export function TimelineView({ searchQuery, filterOccasion }: TimelineViewProps) {
  return (
    <div className="space-y-12">
      {timelineData.map((yearData) => (
        <div key={yearData.year}>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              {yearData.year}
            </div>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-8">
            {yearData.months.map((monthData) => (
              <div key={monthData.month} className="relative ml-6 border-l-2 border-primary/20 pl-8">
                <div className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <h3 className="mb-4 text-lg font-semibold text-muted-foreground">{monthData.month}</h3>

                <div className="space-y-4">
                  {monthData.cards.map((card) => (
                    <Card key={card.id} className="transition-all hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{card.title}</h4>
                              <Badge>{card.occasion}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{card.preview}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                To: {card.recipient}
                              </span>
                              <span>{card.date}</span>
                              <Badge variant="secondary">{card.relationship}</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
