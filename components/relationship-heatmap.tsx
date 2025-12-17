"use client"

import { useMemo } from "react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Generate sample data for the heatmap
const generateHeatmapData = () => {
  const data: number[][] = []
  for (let month = 0; month < 12; month++) {
    const days = new Date(2024, month + 1, 0).getDate()
    const monthData: number[] = []
    for (let day = 0; day < days; day++) {
      // Random intensity between 0-4 (0 = no activity, 4 = high activity)
      monthData.push(Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0)
    }
    data.push(monthData)
  }
  return data
}

export function RelationshipHeatmap() {
  const heatmapData = useMemo(() => generateHeatmapData(), [])

  const getColorClass = (intensity: number) => {
    if (intensity === 0) return "bg-muted"
    if (intensity === 1) return "bg-primary/20"
    if (intensity === 2) return "bg-primary/40"
    if (intensity === 3) return "bg-primary/60"
    return "bg-primary"
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full flex-col gap-2">
          {months.map((month, monthIndex) => (
            <div key={month} className="flex items-center gap-2">
              <span className="w-8 text-xs text-muted-foreground">{month}</span>
              <div className="flex flex-1 gap-1">
                {heatmapData[monthIndex].map((intensity, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`h-3 w-3 rounded-sm transition-colors hover:ring-2 hover:ring-primary hover:ring-offset-1 ${getColorClass(
                      intensity,
                    )}`}
                    title={`${month} ${dayIndex + 1}: ${intensity} card${intensity !== 1 ? "s" : ""}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-muted-foreground">Activity level:</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`h-3 w-3 rounded-sm ${getColorClass(level)}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
      </div>
    </div>
  )
}
