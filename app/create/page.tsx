"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles, ArrowRight, ArrowLeft, Download, Share2, User, Users, AlertCircle } from "lucide-react"
import { CardPreview } from "@/components/card-preview"

const occasions = [
  "Birthday",
  "Wedding",
  "Anniversary",
  "Graduation",
  "New Baby",
  "Sympathy",
  "Thank You",
  "Get Well Soon",
  "Holiday",
  "Congratulations",
  "Retirement",
  "Valentine's Day",
]

const relationships = [
  "Parent",
  "Spouse/Partner",
  "Child",
  "Sibling",
  "Friend",
  "Colleague",
  "Boss",
  "Client",
  "Teacher",
  "Grandparent",
  "Extended Family",
]

const tones = ["Warm & Personal", "Professional", "Humorous", "Sincere & Heartfelt", "Casual & Friendly"]

function NativeSelect({
  id,
  value,
  onChange,
  placeholder,
  options,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: string[]
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default function CreatePage() {
  const [creationMode, setCreationMode] = useState<"quick_blessing" | "personal_moment" | null>(null)
  const [silentMode, setSilentMode] = useState(false)
  const [showTimeCapsuleModal, setShowTimeCapsuleModal] = useState(false)
  const [showHumorAlert, setShowHumorAlert] = useState(false)

  const [step, setStep] = useState(0)
  const [occasion, setOccasion] = useState("")
  const [relationship, setRelationship] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [tone, setTone] = useState("")
  const [additionalContext, setAdditionalContext] = useState("")
  const [generatedCard, setGeneratedCard] = useState<{
    title: string
    message: string
    design: string
    humorRisk?: boolean
  } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          occasion,
          recipientName,
          relationship,
          tone,
          additionalContext,
          creationMode,
          silentMode,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate card")
      }

      const data = await response.json()
      setGeneratedCard(data)

      if (data.humorRisk && tone === "Humorous") {
        setShowHumorAlert(true)
      }

      setStep(4)
    } catch (error) {
      console.error("[v0] Error generating card:", error)
      alert("Failed to generate card. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const content = `${generatedCard?.title}\n\n${generatedCard?.message}`
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${recipientName}-${occasion}-card.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    setShowTimeCapsuleModal(true)
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {step > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-1 items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-colors ${
                      step >= i
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 bg-background text-muted-foreground"
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`mx-2 h-0.5 flex-1 transition-colors ${
                        step > i ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <span className={step >= 1 ? "font-medium text-foreground" : "text-muted-foreground"}>
                Select Occasion
              </span>
              <span className={step >= 2 ? "font-medium text-foreground" : "text-muted-foreground"}>
                Define Details
              </span>
              <span className={step >= 3 ? "font-medium text-foreground" : "text-muted-foreground"}>Generate Card</span>
            </div>
          </div>
        )}

        {step === 0 && (
          <Card className="p-8">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-3xl font-bold">What Would You Like to Create?</h2>
              <p className="text-muted-foreground">Choose your intention</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <button
                onClick={() => {
                  setCreationMode("quick_blessing")
                  setSilentMode(false)
                  setStep(1)
                }}
                className={`group rounded-xl border-2 p-8 text-left transition-all hover:border-primary hover:shadow-lg ${
                  creationMode === "quick_blessing" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Quick Blessing</h3>
                <p className="text-sm text-muted-foreground">
                  Create a card for someone special. Fast, thoughtful, and meaningful.
                </p>
              </button>

              <button
                onClick={() => {
                  setCreationMode("personal_moment")
                  setSilentMode(true)
                  setStep(1)
                }}
                className={`group rounded-xl border-2 p-8 text-left transition-all hover:border-primary hover:shadow-lg ${
                  creationMode === "personal_moment" ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Personal Moment</h3>
                <p className="text-sm text-muted-foreground">
                  For yourself. Private reflections, milestones, and moments of growth.
                </p>
              </button>
            </div>
          </Card>
        )}

        {step === 1 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Select an Occasion</h2>
              <p className="text-muted-foreground">
                {creationMode === "personal_moment"
                  ? "What moment would you like to capture?"
                  : "Choose the type of card you want to create"}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setOccasion(occ)}
                  className={`rounded-lg border-2 p-4 text-left transition-all hover:border-primary ${
                    occasion === occ ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <span className="font-medium">{occ}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(0)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={() => setStep(2)} disabled={!occasion}>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">
                {creationMode === "personal_moment" ? "Define Your Moment" : "Define Relationship"}
              </h2>
              <p className="text-muted-foreground">
                {creationMode === "personal_moment"
                  ? "Tell us about this moment for yourself"
                  : "Tell us about the recipient to personalize the card"}
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipient-name">
                  {creationMode === "personal_moment" ? "Your Name (Optional)" : "Recipient's Name"}
                </Label>
                <Input
                  id="recipient-name"
                  placeholder={creationMode === "personal_moment" ? "Leave blank or enter your name" : "Enter name"}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>

              {creationMode === "quick_blessing" && (
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <NativeSelect
                    id="relationship"
                    value={relationship}
                    onChange={setRelationship}
                    placeholder="Select relationship"
                    options={relationships}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <NativeSelect id="tone" value={tone} onChange={setTone} placeholder="Select tone" options={tones} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">
                  {creationMode === "personal_moment" ? "Your Thoughts (Optional)" : "Additional Context (Optional)"}
                </Label>
                <Textarea
                  id="context"
                  placeholder={
                    creationMode === "personal_moment"
                      ? "Share your feelings, reflections, or what this moment means to you..."
                      : "Add any specific details you want to include (hobbies, memories, achievements, etc.)"
                  }
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={4}
                />
              </div>

              {creationMode === "personal_moment" && (
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="silent-mode" className="font-medium">
                      Silent Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Keep this completely private. No sharing options or notifications.
                    </p>
                  </div>
                  <Switch id="silent-mode" checked={silentMode} onCheckedChange={setSilentMode} />
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={creationMode === "quick_blessing" ? !recipientName || !relationship || !tone : !tone}
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">Review & Generate</h2>
              <p className="text-muted-foreground">Check the details before generating your card</p>
            </div>

            <div className="space-y-4 rounded-lg bg-muted/50 p-6">
              <div className="flex justify-between">
                <span className="font-medium">Mode:</span>
                <span className="text-muted-foreground">
                  {creationMode === "personal_moment" ? "Personal Moment" : "Quick Blessing"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Occasion:</span>
                <span className="text-muted-foreground">{occasion}</span>
              </div>
              {recipientName && (
                <div className="flex justify-between">
                  <span className="font-medium">{creationMode === "personal_moment" ? "Name:" : "Recipient:"}</span>
                  <span className="text-muted-foreground">{recipientName}</span>
                </div>
              )}
              {relationship && (
                <div className="flex justify-between">
                  <span className="font-medium">Relationship:</span>
                  <span className="text-muted-foreground">{relationship}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">Tone:</span>
                <span className="text-muted-foreground">{tone}</span>
              </div>
              {silentMode && (
                <div className="flex justify-between">
                  <span className="font-medium">Privacy:</span>
                  <span className="text-muted-foreground">Silent Mode (Private)</span>
                </div>
              )}
              {additionalContext && (
                <div className="border-t pt-4">
                  <span className="font-medium">Additional Context:</span>
                  <p className="mt-2 text-sm text-muted-foreground">{additionalContext}</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Card"}
              </Button>
            </div>
          </Card>
        )}

        {step === 4 && generatedCard && (
          <div className="space-y-6">
            {showHumorAlert && (
              <Card className="border-primary/50 bg-primary/5">
                <div className="flex items-start gap-3 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div className="flex-1">
                    <h4 className="font-medium text-primary">Friendly Note</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This card has a playful tone. If you have a close relationship, that's perfect! Otherwise, you
                      might want to adjust the tone.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 h-auto p-0 text-primary hover:text-primary/80"
                      onClick={() => setShowHumorAlert(false)}
                    >
                      I know, continue
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Card className="overflow-hidden">
              <CardPreview title={generatedCard.title} message={generatedCard.message} design={generatedCard.design} />
            </Card>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="flex-1" size="lg" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download Card
              </Button>
              {!silentMode && (
                <Button variant="outline" className="flex-1 bg-transparent" size="lg">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Card
                </Button>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(0)
                  setCreationMode(null)
                  setGeneratedCard(null)
                  setOccasion("")
                  setRecipientName("")
                  setRelationship("")
                  setTone("")
                  setAdditionalContext("")
                  setSilentMode(false)
                  setShowHumorAlert(false)
                }}
              >
                Create Another Card
              </Button>
            </div>
          </div>
        )}

        <Dialog open={showTimeCapsuleModal} onOpenChange={setShowTimeCapsuleModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save as Time Capsule?</DialogTitle>
              <DialogDescription>
                If you'd like, we can save this moment and remind you about it in the future.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Choose when you'd like to be reminded of this card, or skip to just save it in your archive.
              </p>
              <div className="flex flex-col gap-2">
                <Button className="w-full">Remind me in 1 year</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Remind me in 6 months
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setShowTimeCapsuleModal(false)}>
                  Just save to archive
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
