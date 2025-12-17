import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Users, Globe, Shield, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <Badge className="mb-4">Enterprise Solutions</Badge>
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Scale Your Greeting Card Operations
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Bulk generation API, white-label options, and team collaboration features for businesses that need to send
            greeting cards at scale.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Bulk Generation API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Generate hundreds of personalized cards with a single API call.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>White-Label Platform</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Customize the platform with your brand, colors, and domain.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Multiple team members can create and manage cards together.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Enterprise Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">SSO, SOC 2 compliance, and advanced security features.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Track engagement, delivery rates, and team performance.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Check className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Priority Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">24/7 dedicated support with guaranteed response times.</p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Enterprise Pricing</h2>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Up to 5 team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>1,000 cards/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Basic API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <Badge className="mb-2 w-fit">Most Popular</Badge>
                <CardTitle>Professional</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Up to 20 team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>5,000 cards/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Full API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>White-label options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Unlimited cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span>SLA guarantees</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full bg-transparent" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-primary/5">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Contact our sales team to discuss your specific needs and get a custom quote.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
