import { useEffect, useMemo, useRef, useState } from 'react'
import '@d3-maps/react/index.css'
import { MapBase, MapFeatures, MapGraticule, MapMesh } from '@d3-maps/react'
import worldMapData from 'world-atlas/countries-110m.json'

const STORAGE_KEY = 'mood-loc-record'

const shortcuts = [
  { label: 'Happy', emoji: '🙂', value: 10 },
  { label: 'Neutral', emoji: '😐', value: 5 },
  { label: 'Angry', emoji: '😠', value: 0 },
]

function getStoredRecord() {
  if (typeof window === 'undefined') {
    return null
  }

  let savedRecord = null

  try {
    savedRecord = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }

  if (!savedRecord) {
    return null
  }

  try {
    const parsedRecord = JSON.parse(savedRecord)
    const hasValidScore = typeof parsedRecord.score === 'number'
    const hasValidCity = typeof parsedRecord.city === 'string' && parsedRecord.city.length > 0

    if (!hasValidScore || !hasValidCity) {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        return null
      }

      return null
    }

    return {
      score: parsedRecord.score,
      city: parsedRecord.city,
    }
  } catch {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      return null
    }

    return null
  }
}

function saveStoredRecord(record) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Ignore storage write failures so the tracker keeps working.
  }
}

function clampMoodValue(value) {
  if (value === '') {
    return ''
  }

  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return ''
  }

  return String(Math.min(10, Math.max(0, numericValue)))
}

function getMoodTone(score) {
  if (score === null) {
    return {
      badge: 'Pick a score',
      helper: 'Enter a number from 0 to 10 or use a shortcut.',
      inputClassName:
        'border-stone-300 bg-white/80 text-stone-900 shadow-[0_18px_45px_rgba(120,53,15,0.08)]',
      accentClassName: 'bg-stone-200 text-stone-700',
      panelClassName: 'border-white/70 bg-white/55',
      shouldShake: false,
    }
  }

  if (score <= 3) {
    return {
      badge: 'Angry energy',
      helper: 'Low score detected. The field reacts with extra tension.',
      inputClassName:
        'border-rose-500 bg-rose-50 text-rose-900 shadow-[0_20px_50px_rgba(225,29,72,0.2)]',
      accentClassName: 'bg-rose-500 text-white',
      panelClassName: 'border-rose-200/80 bg-white/75',
      shouldShake: true,
    }
  }

  if (score <= 6) {
    return {
      badge: 'Steady middle',
      helper: 'A balanced score keeps the form calm and neutral.',
      inputClassName:
        'border-amber-400 bg-amber-50 text-amber-950 shadow-[0_20px_50px_rgba(245,158,11,0.18)]',
      accentClassName: 'bg-amber-400 text-amber-950',
      panelClassName: 'border-amber-200/80 bg-white/75',
      shouldShake: false,
    }
  }

  return {
    badge: 'Bright mood',
    helper: 'High score brings in a warmer, happier glow.',
    inputClassName:
      'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-[0_20px_50px_rgba(16,185,129,0.18)]',
    accentClassName: 'bg-emerald-500 text-white',
    panelClassName: 'border-emerald-200/80 bg-white/75',
    shouldShake: false,
  }
}

async function resolveCityName(latitude, longitude) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error('Unable to fetch city')
  }

  const data = await response.json()
  const address = data.address ?? {}

  return (
    address.city
    || address.town
    || address.village
    || address.state
    || 'Location found'
  )
}

function App() {
  const storedRecord = getStoredRecord()
  const [scoreInput, setScoreInput] = useState(storedRecord ? String(storedRecord.score) : '')
  const [trackedScore, setTrackedScore] = useState(storedRecord?.score ?? null)
  const [trackedCity, setTrackedCity] = useState(storedRecord?.city ?? '')
  const [currentCity, setCurrentCity] = useState(storedRecord?.city ?? '')
  const [locationState, setLocationState] = useState(storedRecord?.city ? 'ready' : 'idle')
  const [locationMessage, setLocationMessage] = useState(
    storedRecord?.city
      ? `Saved location restored: ${storedRecord.city}.`
      : 'Attach your current city to save this mood log.',
  )
  
  const mapCardRef = useRef(null)

  const numericScore = scoreInput === '' ? null : Number(scoreInput)
  const moodTone = useMemo(() => getMoodTone(numericScore), [numericScore])

  useEffect(() => {
    if (trackedScore === null || !trackedCity) {
      return
    }

    saveStoredRecord({
      score: trackedScore,
      city: trackedCity,
    })
  }, [trackedCity, trackedScore])

  function handleScoreChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '')
    setScoreInput(clampMoodValue(digitsOnly))
  }

  function handleShortcutSelect(value) {
    setScoreInput(String(value))
  }

  function handleLocationRequest() {
    if (!navigator.geolocation) {
      setLocationState('error')
      setCurrentCity('')
      setLocationMessage('Geolocation is not supported in this browser.')
      return
    }

    setLocationState('loading')
    setLocationMessage('Finding your location...')

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const city = await resolveCityName(coords.latitude, coords.longitude)
          setCurrentCity(city)
          setLocationState('ready')
          setLocationMessage(`Current location attached: ${city}.`)
        } catch {
          setLocationState('error')
          setLocationMessage(
            currentCity
              ? `Could not refresh location. Keeping current city: ${currentCity}.`
              : 'Location permission worked, but city lookup failed. Please try again.',
          )
        }
      },
      () => {
        setLocationState('error')
        setLocationMessage(
          currentCity
            ? `Location refresh failed. Keeping current city: ${currentCity}.`
            : 'Location is required before you can add a mood record.',
        )
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (numericScore === null || !currentCity) {
      return
    }

    setTrackedScore(numericScore)
    setTrackedCity(currentCity)
    setLocationMessage(`Saved locally with location: ${currentCity}.`)
  }

  return (
    <main className="relative isolate overflow-hidden">
      <section className="mx-auto flex min-h-screen max-w-[1500px] items-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="w-full space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-black leading-none text-stone-900 sm:text-6xl lg:text-7xl">
              Hello, I&apos;m your personal mood tracker
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">
              Log today&apos;s mood with a simple score and explore the map
              viewport right beneath the headline as part of the landing
              experience.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)] lg:items-stretch">
            <div className="pb-4">
              <div
                className="w-full rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-2xl shadow-orange-950/10 backdrop-blur-xl"
                ref={mapCardRef}
              >
                <MapBase
                  aria-label="Mood-loc map viewport"
                  aspectRatio={16 / 9}
                  className="block aspect-video h-auto w-full overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,_#fff7ed_0%,_#ffedd5_100%)]"
                  data={worldMapData}
                  height={900}
                  width={1600}
                >
                  <MapGraticule
                    stroke="rgba(120, 53, 15, 0.12)"
                    strokeWidth={0.6}
                  />
                  <MapFeatures
                    fill="#fdba74"
                    stroke="rgba(194, 65, 12, 0.52)"
                    strokeWidth={0.55}
                    styles={{
                      default: { opacity: 0.96 },
                      hover: { opacity: 0.82 },
                      active: { opacity: 1 },
                    }}
                  />
                  <MapMesh
                    fill="none"
                    stroke="rgba(120, 53, 15, 0.22)"
                    strokeWidth={0.45}
                  />
                </MapBase>
              </div>
            </div>

            <form
              className={`rounded-[2rem] border p-6 backdrop-blur-xl transition-all duration-300 sm:p-8 ${moodTone.panelClassName}`}
              onSubmit={handleSubmit}
            >
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Today&apos;s mood score
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-stone-900">
                    Rate from 0 to 10
                  </h2>
                </div>
                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${moodTone.accentClassName}`}>
                  {moodTone.badge}
                </span>
              </div>

              <label className="block">
                <span className="mb-3 block text-sm font-semibold text-stone-600">
                  Numeric only
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={scoreInput}
                  onChange={handleScoreChange}
                  placeholder="0 - 10"
                  aria-label="Mood score"
                  className={`w-full rounded-[1.5rem] border px-5 py-4 text-4xl font-black outline-none transition-all duration-300 placeholder:text-stone-400 focus:scale-[1.01] ${moodTone.inputClassName} ${moodTone.shouldShake ? 'mood-shake' : ''}`}
                />
              </label>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-stone-600">
                  Shortcuts
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {shortcuts.map((shortcut) => (
                    <button
                      key={shortcut.label}
                      type="button"
                      onClick={() => handleShortcutSelect(shortcut.value)}
                      className="rounded-[1.25rem] border border-stone-200 bg-white/80 px-4 py-4 text-center transition-transform duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white"
                    >
                      <span className="block text-3xl">{shortcut.emoji}</span>
                      <span className="mt-2 block text-sm font-semibold text-stone-700">
                        {shortcut.label}
                      </span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-stone-400">
                        {shortcut.value}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-[1.5rem] border border-stone-200/80 bg-white/75 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-600">
                      Geography
                    </p>
                    <p className="mt-1 text-sm leading-6 text-stone-600">
                      Add your current city to this mood log. Without location, you can&apos;t add a record.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLocationRequest}
                    disabled={locationState === 'loading'}
                    className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 disabled:cursor-wait disabled:opacity-70"
                  >
                    {locationState === 'loading' ? 'Locating...' : currentCity ? 'Refresh location' : 'Use my location'}
                  </button>
                </div>
                <p className={`text-sm ${locationState === 'error' ? 'text-rose-700' : 'text-stone-600'}`}>
                  {locationMessage}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-sm leading-6 text-stone-600">
                  {moodTone.helper}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex min-h-12 items-center rounded-full border border-stone-200 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-700">
                    Current location:
                    <span className="ml-2 font-black text-stone-900">
                      {currentCity || 'Not attached'}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={numericScore === null || !currentCity}
                    className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
                  >
                    Track
                  </button>
                </div>
              </div>

              {trackedScore !== null ? (
                <div className="rounded-[1.25rem] border border-stone-200 bg-white/85 px-4 py-3 text-sm font-medium text-stone-700">
                  Mood score <span className="font-black text-stone-900">{trackedScore}</span> tracked for today in <span className="font-black text-stone-900">{trackedCity}</span>.
                </div>
              ) : null}
          </div>
            </form>
        </div>
        </div>
      </section>
    </main>
  )
}

export default App
