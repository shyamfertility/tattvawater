import { useCallback, useEffect, useMemo, useState } from "react"

import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type ElementType = "Water" | "Fire" | "Earth" | "Air" | "Space"

type WaterEntry = {
  id: string
  date: string
  amount: number
  infuser: string
  element: ElementType
  timestamp: string
}

const STORAGE_KEY = "tattva-water-story-data"
const DAILY_GOAL = 2000
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * 56

const DAILY_QUOTES = [
  {
    quote:
      "Water is the driving force of all nature. Your body is 60% water - honor it with conscious hydration and watch miracles unfold.",
    author: "Ancient Ayurvedic Wisdom",
  },
  {
    quote:
      "The human brain is 73% water. Even 2% dehydration can affect memory, mood and concentration. Drink mindfully, think clearly.",
    author: "Neuroscience Research",
  },
  {
    quote:
      "Water carries nutrients to every cell and flushes toxins from your body. Each glass is a gift of renewal to your temple.",
    author: "Holistic Health Wisdom",
  },
  {
    quote:
      "Your kidneys filter 50 gallons of blood daily, requiring adequate water to function optimally. Hydration is kidney protection.",
    author: "Medical Science",
  },
  {
    quote:
      "Proper hydration can boost metabolism by up to 30%. Water is not just life - it's vitality and energy in liquid form.",
    author: "Metabolic Research",
  },
  {
    quote:
      "Water regulates body temperature through perspiration. In ancient wisdom, this cooling represents the balance of fire and water elements.",
    author: "Ayurvedic Science",
  },
  {
    quote:
      "Dehydration is the #1 cause of daytime fatigue. Before reaching for caffeine, reach for water - nature's energy drink.",
    author: "Wellness Studies",
  },
]

const INFUSER_TO_ELEMENT: Record<string, ElementType> = {
  "Lemon & Ginger": "Fire",
  "Cucumber & Mint": "Water",
  "Turmeric & Honey": "Earth",
  "Rose Petals": "Space",
  "Cinnamon & Cardamom": "Fire",
  "Basil & Clove": "Air",
}

const INFUSERS = [
  {
    name: "Lemon & Ginger",
    emoji: "🍋",
    benefits: "Boosts immunity, aids digestion, detoxifies",
    bestTime: "Morning, empty stomach",
    preparation: "1 lemon slice + 1 inch ginger in 500ml water",
    buttonClasses: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    name: "Cucumber & Mint",
    emoji: "🥒",
    benefits: "Hydrates, reduces inflammation, cooling",
    bestTime: "Afternoon, hot weather",
    preparation: "5 cucumber slices + 5 mint leaves in 500ml water",
    buttonClasses: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Turmeric & Honey",
    emoji: "🍯",
    benefits: "Anti-inflammatory, antioxidant, healing",
    bestTime: "Evening, before bed",
    preparation: "1/2 tsp turmeric + 1 tsp honey in warm water",
    buttonClasses: "bg-orange-500 hover:bg-orange-600",
  },
  {
    name: "Rose Petals",
    emoji: "🌹",
    benefits: "Calms mind, improves skin, reduces stress",
    bestTime: "Evening, relaxation",
    preparation: "5-7 organic rose petals in 500ml water",
    buttonClasses: "bg-pink-500 hover:bg-pink-600",
  },
  {
    name: "Cinnamon & Cardamom",
    emoji: "🌰",
    benefits: "Regulates blood sugar, improves metabolism",
    bestTime: "Morning, with meals",
    preparation: "1 cinnamon stick + 2 cardamom pods in 500ml water",
    buttonClasses: "bg-amber-600 hover:bg-amber-700",
  },
  {
    name: "Basil & Clove",
    emoji: "🌿",
    benefits: "Respiratory health, antimicrobial, immunity",
    bestTime: "Morning, during illness",
    preparation: "5 basil leaves + 2 cloves in 500ml water",
    buttonClasses: "bg-emerald-600 hover:bg-emerald-700",
  },
]

const TESTIMONIALS = [
  {
    initial: "S",
    colorClass: "bg-blue-500",
    name: "Sarah M.",
    quote:
      "The lemon-ginger infusion has completely transformed my mornings! I feel more energized and my digestion has improved significantly. The app's reminders keep me consistent.",
    favoriteInfuser: "Lemon & Ginger",
    duration: "3 months",
  },
  {
    initial: "R",
    colorClass: "bg-green-500",
    name: "Raj P.",
    quote:
      "As someone with chronic inflammation, the turmeric-honey water has been a game-changer. My joint pain has reduced, and I sleep better. The Tattva balance feature is fascinating!",
    favoriteInfuser: "Turmeric & Honey",
    duration: "6 months",
  },
  {
    initial: "M",
    colorClass: "bg-purple-500",
    name: "Maya K.",
    quote:
      "The rose petal infusion is my evening ritual now. It's so calming and has helped with my stress levels. The app's tracking feature motivates me to stay hydrated throughout the day.",
    favoriteInfuser: "Rose Petals",
    duration: "4 months",
  },
  {
    initial: "A",
    colorClass: "bg-orange-500",
    name: "Arjun S.",
    quote:
      "The cucumber-mint combination is perfect for hot summer days. It keeps me cool and refreshed. The elemental balance insights have helped me understand my body better.",
    favoriteInfuser: "Cucumber & Mint",
    duration: "2 months",
  },
  {
    initial: "P",
    colorClass: "bg-red-500",
    name: "Priya D.",
    quote:
      "The basil-clove infusion helped me recover faster from a recent cold. The antimicrobial properties are amazing. I love how the app connects ancient wisdom with modern tracking.",
    favoriteInfuser: "Basil & Clove",
    duration: "5 months",
  },
  {
    initial: "V",
    colorClass: "bg-indigo-500",
    name: "Vikram L.",
    quote:
      "The cinnamon-cardamom water has helped regulate my blood sugar levels naturally. Combined with the app's smart reminders, I've never been more consistent with my hydration.",
    favoriteInfuser: "Cinnamon & Cardamom",
    duration: "8 months",
  },
]

const ELEMENT_DETAILS: Array<{
  key: ElementType
  emoji: string
  titleColor: string
  title: string
  description: string
  recommended: string
  bestInfusers: string
  healing: string
}> = [
  {
    key: "Water",
    emoji: "💧",
    titleColor: "text-blue-600",
    title: "Water Element",
    description:
      "Governs emotions, circulation, and kidney function. Promotes flow and adaptability.",
    recommended: "40-50% of daily intake",
    bestInfusers: "Cucumber, Rose petals",
    healing: "Emotional balance, detox",
  },
  {
    key: "Fire",
    emoji: "🔥",
    titleColor: "text-red-600",
    title: "Fire Element",
    description:
      "Controls metabolism, digestion, and energy. Promotes transformation and vitality.",
    recommended: "20-30% of daily intake",
    bestInfusers: "Ginger, Cinnamon",
    healing: "Metabolism boost, warmth",
  },
  {
    key: "Earth",
    emoji: "🌍",
    titleColor: "text-green-600",
    title: "Earth Element",
    description:
      "Provides stability, strength, and grounding. Supports bone and muscle health.",
    recommended: "15-25% of daily intake",
    bestInfusers: "Turmeric, Basil",
    healing: "Grounding, strength",
  },
  {
    key: "Air",
    emoji: "💨",
    titleColor: "text-gray-600",
    title: "Air Element",
    description:
      "Governs breathing, circulation, and nervous system. Promotes movement and communication.",
    recommended: "10-15% of daily intake",
    bestInfusers: "Mint, Cardamom",
    healing: "Respiratory health, clarity",
  },
  {
    key: "Space",
    emoji: "🌌",
    titleColor: "text-purple-600",
    title: "Space Element",
    description:
      "Creates room for all other elements. Promotes consciousness and spiritual connection.",
    recommended: "5-10% of daily intake",
    bestInfusers: "Rose petals, Pure water",
    healing: "Mental clarity, peace",
  },
]

const ELEMENT_BAR_META: Array<{
  key: ElementType
  emoji: string
  containerColor: string
  barColor: string
  textColor: string
}> = [
  {
    key: "Water",
    emoji: "💧",
    containerColor: "bg-blue-200",
    barColor: "bg-blue-500",
    textColor: "text-blue-600",
  },
  {
    key: "Fire",
    emoji: "🔥",
    containerColor: "bg-red-200",
    barColor: "bg-red-500",
    textColor: "text-red-600",
  },
  {
    key: "Earth",
    emoji: "🌍",
    containerColor: "bg-green-200",
    barColor: "bg-green-600",
    textColor: "text-green-600",
  },
  {
    key: "Air",
    emoji: "💨",
    containerColor: "bg-gray-200",
    barColor: "bg-gray-500",
    textColor: "text-gray-600",
  },
  {
    key: "Space",
    emoji: "🌌",
    containerColor: "bg-purple-200",
    barColor: "bg-purple-500",
    textColor: "text-purple-600",
  },
]

const QUICK_ADD_AMOUNTS = [250, 500, 750]

function getTodayDate() {
  return new Date().toISOString().split("T")[0]
}

function getElementForInfuser(infuser?: string | null): ElementType {
  if (!infuser) {
    return "Water"
  }

  return INFUSER_TO_ELEMENT[infuser] ?? "Water"
}

export default function Home() {
  const [waterData, setWaterData] = useState<WaterEntry[]>([])
  const [selectedInfuser, setSelectedInfuser] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [reminderIntervalMinutes, setReminderIntervalMinutes] = useState(60)
  const [reminderMessage, setReminderMessage] = useState(
    "Time to hydrate with healing water!"
  )
  const [reminderActive, setReminderActive] = useState(false)
  const [nextReminder, setNextReminder] = useState<Date | null>(null)
  const [today, setToday] = useState(getTodayDate)

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) return

      const parsed = JSON.parse(stored) as WaterEntry[]
      if (Array.isArray(parsed)) {
        setWaterData(parsed)
      }
    } catch (error) {
      console.error("Failed to load stored water data", error)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(waterData))
  }, [waterData])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setToday(getTodayDate())
    }, 60_000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (!reminderActive) {
      setNextReminder(null)
      return
    }

    const intervalMs = reminderIntervalMinutes * 60_000
    const scheduleNext = () => {
      setNextReminder(new Date(Date.now() + intervalMs))
    }

    scheduleNext()

    const id = window.setInterval(() => {
      toast({
        title: "Hydration reminder",
        description: reminderMessage,
      })
      scheduleNext()
    }, intervalMs)

    return () => {
      window.clearInterval(id)
    }
  }, [reminderActive, reminderIntervalMinutes, reminderMessage])

  const todayQuote = useMemo(() => {
    const currentDate = new Date()
    const startOfYear = new Date(currentDate.getFullYear(), 0, 0)
    const diff =
      currentDate.getTime() -
      startOfYear.getTime() +
      (startOfYear.getTimezoneOffset() - currentDate.getTimezoneOffset()) * 60_000
    const dayOfYear = Math.floor(diff / 86_400_000)
    return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length]
  }, [today])

  const todayEntries = useMemo(
    () => waterData.filter((entry) => entry.date === today),
    [waterData, today]
  )

  const currentIntake = useMemo(
    () => todayEntries.reduce((total, entry) => total + entry.amount, 0),
    [todayEntries]
  )

  const rawProgress = DAILY_GOAL > 0 ? Math.min((currentIntake / DAILY_GOAL) * 100, 100) : 0
  const progressPercentage = Math.round(rawProgress)
  const progressOffset = PROGRESS_CIRCUMFERENCE - (rawProgress / 100) * PROGRESS_CIRCUMFERENCE

  const elementTotals = useMemo(() => {
    return todayEntries.reduce(
      (acc, entry) => {
        acc[entry.element] += entry.amount
        return acc
      },
      { Water: 0, Fire: 0, Earth: 0, Air: 0, Space: 0 } as Record<ElementType, number>
    )
  }, [todayEntries])

  const totalElementIntake = useMemo(
    () => Object.values(elementTotals).reduce((sum, value) => sum + value, 0),
    [elementTotals]
  )

  const elementPercentages = useMemo(() => {
    if (totalElementIntake === 0) {
      return {
        Water: 0,
        Fire: 0,
        Earth: 0,
        Air: 0,
        Space: 0,
      }
    }

    return {
      Water: (elementTotals.Water / totalElementIntake) * 100,
      Fire: (elementTotals.Fire / totalElementIntake) * 100,
      Earth: (elementTotals.Earth / totalElementIntake) * 100,
      Air: (elementTotals.Air / totalElementIntake) * 100,
      Space: (elementTotals.Space / totalElementIntake) * 100,
    }
  }, [elementTotals, totalElementIntake])

  const aiRecommendation = useMemo(() => {
    if (totalElementIntake === 0) {
      return "Add your first infusion to receive personalized elemental insights."
    }

    const suggestions: string[] = []

    if (elementPercentages.Water < 40) {
      suggestions.push(
        "Increase Water element intake with cucumber or rose petal infusions."
      )
    }

    if (elementPercentages.Fire < 20) {
      suggestions.push(
        "Add Fire element with ginger or cinnamon infusions for better metabolism."
      )
    }

    if (elementPercentages.Earth < 15) {
      suggestions.push(
        "Include Earth element with turmeric or basil for grounding energy."
      )
    }

    if (suggestions.length === 0) {
      return "Your elemental balance looks good! Continue with your current infusion routine."
    }

    return `Based on your current intake: ${suggestions.join(" ")}`
  }, [elementPercentages, totalElementIntake])

  const activityLog = useMemo(
    () =>
      [...todayEntries].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [todayEntries]
  )

  const handleSelectInfuser = useCallback((infuserName: string) => {
    setSelectedInfuser(infuserName)
    toast({
      title: "Infuser selected",
      description: `Selected ${infuserName}`,
    })
  }, [])

  const handleAddWater = useCallback(
    (amount: number) => {
      if (!Number.isFinite(amount) || amount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a positive amount in milliliters.",
          variant: "destructive",
        })
        return
      }

      if (waterData.length >= 999) {
        toast({
          title: "Entry limit reached",
          description:
            "Maximum limit of 999 water entries reached. Please delete some entries first.",
          variant: "destructive",
        })
        return
      }

      const now = new Date()
      const entry: WaterEntry = {
        id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
        date: today,
        amount,
        infuser: selectedInfuser ?? "Plain Water",
        element: getElementForInfuser(selectedInfuser),
        timestamp: now.toISOString(),
      }

      setWaterData((prev) => [...prev, entry])

      toast({
        title: "Water added",
        description: `Added ${amount}ml of ${entry.infuser}.`,
      })
    },
    [selectedInfuser, today, waterData.length]
  )

  const handleCustomAdd = useCallback(() => {
    const amount = parseInt(customAmount, 10)
    if (Number.isNaN(amount)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number in milliliters.",
        variant: "destructive",
      })
      return
    }

    handleAddWater(amount)
    setCustomAmount("")
  }, [customAmount, handleAddWater])

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-full">
        <header className="bg-gradient-to-br from-indigo-500 via-indigo-500 to-purple-600 text-white p-8 shadow-lg">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">🌊 Tattva Water Story</h1>
              <p className="text-xl text-blue-100">
                Ancient Wisdom • Modern Wellness • Elemental Balance
              </p>
            </div>

            <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm space-y-3">
              <h2 className="text-2xl font-semibold">✨ Transform Your Life, One Drop at a Time</h2>
              <p className="text-lg text-blue-50 leading-relaxed">
                Water is not just H2O - it's the essence of life, the carrier of healing, and the foundation of wellness. Through the ancient wisdom of Tattva elements and the power of medicinal infusions, discover how conscious hydration can heal your body, calm your mind, and elevate your spirit.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 shadow-lg space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">💧</span>
                <span className="text-sm font-medium text-blue-100">DAILY WATER WISDOM</span>
              </div>
              <p className="text-lg font-medium italic">"{todayQuote.quote}"</p>
              <p className="text-sm text-blue-200">- {todayQuote.author}</p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-6 space-y-12">
          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">💧 Water Intake Tracker</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Today's Progress</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg
                        className="w-32 h-32 -rotate-90 transform"
                        viewBox="0 0 128 128"
                      >
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={PROGRESS_CIRCUMFERENCE}
                          strokeDashoffset={progressOffset}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {progressPercentage}%
                          </div>
                          <div className="text-sm text-gray-500">Complete</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-700 space-x-1">
                  <span className="text-xl font-semibold" data-testid="current-intake">
                    {currentIntake}
                  </span>
                  <span className="text-gray-500">/</span>
                  <span className="text-xl font-semibold text-blue-600">{DAILY_GOAL}</span>
                  <span className="text-gray-500">ml</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {QUICK_ADD_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAddWater(amount)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg font-medium transition-colors"
                      >
                        +{amount}ml
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(event) => setCustomAmount(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault()
                          handleCustomAdd()
                        }
                      }}
                      placeholder="Custom ml"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleCustomAdd}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 space-y-4">
                <h3 className="text-xl font-bold text-gray-800">⏰ Smart Reminders</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminder Interval
                    </label>
                    <select
                      value={reminderIntervalMinutes}
                      onChange={(event) =>
                        setReminderIntervalMinutes(Number(event.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={30}>Every 30 minutes</option>
                      <option value={60}>Every 1 hour</option>
                      <option value={90}>Every 1.5 hours</option>
                      <option value={120}>Every 2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminder Message
                    </label>
                    <input
                      type="text"
                      value={reminderMessage}
                      onChange={(event) => setReminderMessage(event.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={() => setReminderActive((prev) => !prev)}
                    className={cn(
                      "w-full text-white py-2 px-4 rounded-lg font-medium transition-colors",
                      reminderActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    )}
                  >
                    {reminderActive ? "Stop Reminders" : "Start Reminders"}
                  </button>

                  <div
                    className={cn(
                      "text-sm text-gray-500 text-center",
                      !nextReminder && "hidden"
                    )}
                  >
                    {nextReminder
                      ? `Next reminder: ${nextReminder.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Today's Activity</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activityLog.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No water intake recorded today. Start tracking!
                  </p>
                ) : (
                  activityLog.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="space-x-2">
                        <span className="font-medium">{entry.amount}ml</span>
                        <span className="text-gray-500">• {entry.infuser}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              🌿 Medicinal Water Infusers
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INFUSERS.map((infuser) => (
                <div
                  key={infuser.name}
                  className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="text-4xl mb-4 text-center">{infuser.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {infuser.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>
                      <strong>Benefits:</strong> {infuser.benefits}
                    </p>
                    <p>
                      <strong>Best Time:</strong> {infuser.bestTime}
                    </p>
                    <p>
                      <strong>Preparation:</strong> {infuser.preparation}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectInfuser(infuser.name)}
                    className={cn(
                      "w-full text-white py-2 rounded-lg font-medium transition-colors",
                      infuser.buttonClasses,
                      selectedInfuser === infuser.name &&
                        "ring-2 ring-offset-2 ring-blue-500"
                    )}
                  >
                    Use This Infuser
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              ⚡ Tattva Elemental Balance
            </h2>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">🤖 AI Wellness Recommendation</h3>
              <div className="text-lg">{aiRecommendation}</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h3 className="text-xl font-bold text-gray-800">📊 Your Elemental Balance</h3>
              <div className="grid grid-cols-5 gap-4">
                {ELEMENT_BAR_META.map((element) => (
                  <div key={element.key} className="text-center space-y-2">
                    <div className="text-3xl">{element.emoji}</div>
                    <div className="text-sm font-medium text-gray-600">
                      {element.key}
                    </div>
                    <div
                      className={cn(
                        "rounded-full h-24 flex items-end justify-center mt-2",
                        element.containerColor
                      )}
                    >
                      <div
                        className={cn("w-full rounded-full transition-all duration-500", element.barColor)}
                        style={{
                          height: `${Math.round(elementPercentages[element.key])}%`,
                        }}
                      />
                    </div>
                    <div className={cn("text-sm font-bold", element.textColor)}>
                      {Math.round(elementPercentages[element.key])}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ELEMENT_DETAILS.map((element) => (
                <div key={element.key} className="bg-white rounded-xl shadow-lg p-6 space-y-3">
                  <div className="text-4xl text-center">{element.emoji}</div>
                  <h3 className={cn("text-xl font-bold", element.titleColor)}>
                    {element.title}
                  </h3>
                  <p className="text-gray-600">{element.description}</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <strong>Recommended:</strong> {element.recommended}
                    </p>
                    <p>
                      <strong>Best Infusers:</strong> {element.bestInfusers}
                    </p>
                    <p>
                      <strong>Healing Properties:</strong> {element.healing}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">💬 Success Stories</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                        testimonial.colorClass
                      )}
                    >
                      {testimonial.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <strong>Favorite Infuser:</strong> {testimonial.favoriteInfuser}
                    </p>
                    <p>
                      <strong>Using for:</strong> {testimonial.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">📝 Share Your Success Story</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Select Your Favorite Infuser</option>
                  {INFUSERS.map((infuser) => (
                    <option key={infuser.name}>{infuser.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Share your experience with Tattva Water Story..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Submit Story
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
