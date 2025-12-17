import { Heart } from "lucide-react"

interface CardPreviewProps {
  title: string
  message: string
  design: string
}

export function CardPreview({ title, message, design }: CardPreviewProps) {
  return (
    <div className="relative aspect-[3/4] max-w-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background p-12">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 backdrop-blur-sm">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">BlessingCards</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight">{title}</h1>

          <div className="prose prose-sm max-w-none space-y-4">
            {message.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>With love</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </div>
  )
}
