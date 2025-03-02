"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DailyDuaProps {
  date: Date
}

// Sample duas for Ramadan
const ramadanDuas = [
  {
    title: "Dua for Breaking Fast (Iftar)",
    arabic:
      "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration:
      "Dhahabadh-dhama'u wabtallatil 'urooqu, wa thabatal-ajru insha'Allah",
    translation:
      "The thirst has gone, the veins are moistened and the reward is confirmed, if Allah wills.",
    source: "Abu Dawud",
  },
  {
    title: "Dua for Laylatul Qadr",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
    translation:
      "O Allah, You are forgiving and love forgiveness, so forgive me.",
    source: "Tirmidhi",
  },
  {
    title: "Dua Before Eating Suhur",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah.",
    source: "Bukhari",
  },
  {
    title: "Dua for Fasting",
    arabic:
      "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration:
      "Allahumma inni laka sumtu, wa bika aamantu, wa 'alayka tawakkaltu, wa 'ala rizqika aftartu",
    translation:
      "O Allah, I fasted for You, I believe in You, I put my trust in You, and I break my fast with Your sustenance.",
    source: "Abu Dawud",
  },
  {
    title: "Dua for Forgiveness",
    arabic:
      "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    transliteration:
      "Rabbana-ghfir li wa li walidayya wa lil mu'minina yawma yaqumul hisab",
    translation:
      "Our Lord, forgive me and my parents and the believers on the Day when the reckoning will take place.",
    source: "Quran 14:41",
  },
  {
    title: "Dua for Acceptance",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka antas Sami'ul 'Alim",
    translation:
      "Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.",
    source: "Quran 2:127",
  },
  {
    title: "Dua for Guidance",
    arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ",
    transliteration: "Allahumma-hdini fi man hadayt",
    translation: "O Allah, guide me among those whom You have guided.",
    source: "Tirmidhi",
  },
]

export function DailyDua({ date }: DailyDuaProps) {
  const [copied, setCopied] = useState(false)

  // Select a dua based on the date to ensure it changes daily
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const duaIndex = dayOfYear % ramadanDuas.length
  const dua = ramadanDuas[duaIndex]

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Daily Dua</span>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </CardTitle>
        <CardDescription>{dua.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="font-arabic text-right text-xl leading-loose">
            {dua.arabic}
          </p>
          <p className="text-sm italic">{dua.transliteration}</p>
          <p className="text-sm">{dua.translation}</p>
          <p className="text-xs text-muted-foreground">Source: {dua.source}</p>
        </div>
      </CardContent>
    </Card>
  )
}
