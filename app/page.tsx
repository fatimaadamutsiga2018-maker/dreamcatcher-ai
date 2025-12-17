import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Clock, Zap, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI-Powered Greeting Cards</span>
            </div>
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              A Blessing Card for Those Who Matter, <span className="text-primary">and for Your Future Self</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground sm:text-xl">
              If you wish, it will remember this moment for you.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/create">
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                <Link href="/dashboard">View My Cards</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Create, Share, and Cherish
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            From a quick blessing to a treasured memory, our platform helps you connect with the people who matter most.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">3-Step Creation</h3>
            <p className="text-muted-foreground">
              Simple and quick. Choose your moment, add your touch, and let AI help you express what matters.
            </p>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Time Capsule Archive</h3>
            <p className="text-muted-foreground">
              Every card becomes a memory. Build your emotional timeline and revisit special moments anytime.
            </p>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">For You, Too</h3>
            <p className="text-muted-foreground">
              Not just for others. Create private moments for yourself - milestones, reflections, and growth.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Start Your First Card Today
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Create meaningful connections, one card at a time.
            </p>
            <Button size="lg" asChild>
              <Link href="/create">
                <Sparkles className="mr-2 h-5 w-5" />
                Create Your First Card
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
