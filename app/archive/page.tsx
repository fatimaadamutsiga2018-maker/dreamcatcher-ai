"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Calendar, Users, Heart, Eye, Download, Clock } from "lucide-react"
import { TimelineView } from "@/components/timeline-view"
import { RelationshipView } from "@/components/relationship-view"

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOccasion, setFilterOccasion] = useState("all")
  const [filterRelationship, setFilterRelationship] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Time Capsule Archive</h1>
          <p className="text-muted-foreground">Your emotional continuity timeline - every card tells a story</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search cards by recipient, occasion, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-4">
                <Select value={filterOccasion} onValueChange={setFilterOccasion}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Occasions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Occasions</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRelationship} onValueChange={setFilterRelationship}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Relationships" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Relationships</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="colleagues">Colleagues</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Tabs */}
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="relationships" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              By Person
            </TabsTrigger>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Grid View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <TimelineView searchQuery={searchQuery} filterOccasion={filterOccasion} />
          </TabsContent>

          <TabsContent value="relationships">
            <RelationshipView searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="grid">
            <GridView searchQuery={searchQuery} filterOccasion={filterOccasion} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Grid View Component (inline for simplicity)
function GridView({ searchQuery, filterOccasion }: { searchQuery: string; filterOccasion: string }) {
  const cards = [
    {
      id: 1,
      title: "Happy Birthday Sarah!",
      recipient: "Sarah",
      occasion: "Birthday",
      date: "Dec 10, 2024",
      relationship: "Friend",
    },
    {
      id: 2,
      title: "Congratulations John!",
      recipient: "John",
      occasion: "Graduation",
      date: "Dec 8, 2024",
      relationship: "Friend",
    },
    {
      id: 3,
      title: "Thank You Mom",
      recipient: "Mom",
      occasion: "Thank You",
      date: "Dec 5, 2024",
      relationship: "Parent",
    },
    {
      id: 4,
      title: "Happy Anniversary!",
      recipient: "Partner",
      occasion: "Anniversary",
      date: "Nov 28, 2024",
      relationship: "Spouse",
    },
    {
      id: 5,
      title: "Get Well Soon Emma",
      recipient: "Emma",
      occasion: "Get Well",
      date: "Nov 20, 2024",
      relationship: "Friend",
    },
    {
      id: 6,
      title: "Happy Holidays!",
      recipient: "Team",
      occasion: "Holiday",
      date: "Nov 15, 2024",
      relationship: "Colleagues",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.id} className="overflow-hidden transition-all hover:shadow-lg">
          <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/10 to-background p-6">
            <div className="flex h-full flex-col justify-between">
              <div>
                <Badge className="mb-2">{card.occasion}</Badge>
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Heart className="h-3 w-3" />
                <span>To: {card.recipient}</span>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{card.date}</span>
              <Badge variant="secondary">{card.relationship}</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
