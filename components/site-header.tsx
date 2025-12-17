import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg">BlessingCards</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/create"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Create Card
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/archive"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Archive
          </Link>
          <Link
            href="/enterprise"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Enterprise
          </Link>
        </nav>

        <Button asChild>
          <Link href="/create">Create Card</Link>
        </Button>
      </div>
    </header>
  )
}
