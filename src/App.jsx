import { useMemo, useState } from 'react'

const shortcuts = [
  { label: 'Happy', emoji: '🙂', value: 10 },
  { label: 'Neutral', emoji: '😐', value: 5 },
  { label: 'Angry', emoji: '😠', value: 0 },
]

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
      inputClassName: 'border-stone-300 bg-white/80 text-stone-900 shadow-[0_18px_45px_rgba(120,53,15,0.08)]',
      accentClassName: 'bg-stone-200 text-stone-700',
      panelClassName: 'border-white/70 bg-white/55',
      shouldShake: false,
    }
  }

  if (score <= 3) {
    return {
      badge: 'Angry energy',
      helper: 'Low score detected. The field reacts with extra tension.',
      inputClassName: 'border-rose-500 bg-rose-50 text-rose-900 shadow-[0_20px_50px_rgba(225,29,72,0.2)]',
      accentClassName: 'bg-rose-500 text-white',
      panelClassName: 'border-rose-200/80 bg-white/75',
      shouldShake: true,
    }
  }

  if (score <= 6) {
    return {
      badge: 'Steady middle',
      helper: 'A balanced score keeps the form calm and neutral.',
      inputClassName: 'border-amber-400 bg-amber-50 text-amber-950 shadow-[0_20px_50px_rgba(245,158,11,0.18)]',
      accentClassName: 'bg-amber-400 text-amber-950',
      panelClassName: 'border-amber-200/80 bg-white/75',
      shouldShake: false,
    }
  }

  return {
    badge: 'Bright mood',
    helper: 'High score brings in a warmer, happier glow.',
    inputClassName: 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-[0_20px_50px_rgba(16,185,129,0.18)]',
    accentClassName: 'bg-emerald-500 text-white',
    panelClassName: 'border-emerald-200/80 bg-white/75',
    shouldShake: false,
  }
}

function App() {
  const [scoreInput, setScoreInput] = useState('')
  const [trackedScore, setTrackedScore] = useState(null)

  const numericScore = scoreInput === '' ? null : Number(scoreInput)
  const moodTone = useMemo(() => getMoodTone(numericScore), [numericScore])

  function handleScoreChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '')
    setScoreInput(clampMoodValue(digitsOnly))
  }

  function handleShortcutSelect(value) {
    setScoreInput(String(value))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (numericScore === null) {
      return
    }

    setTrackedScore(numericScore)
  }

  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.35),_transparent_65%)]" />
      <div className="absolute right-[-8rem] top-28 -z-10 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="absolute left-[-6rem] top-80 -z-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-stone-900/10 bg-white/60 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-stone-600 backdrop-blur-sm">
                Mood check-in
              </p>
              <h1 className="max-w-3xl text-5xl font-black leading-none text-stone-900 sm:text-6xl lg:text-7xl">
                Hello, I&apos;m Mood-loc, your personal mood tracker
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-700">
                Log today&apos;s mood with a simple score. Use the numeric input or the quick emotion shortcuts, then track it right from the home page.
              </p>
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

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-stone-600">
                  {moodTone.helper}
                </p>
                <button
                  type="submit"
                  disabled={numericScore === null}
                  className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-400"
                >
                  Track
                </button>
              </div>

              {trackedScore !== null ? (
                <div className="rounded-[1.25rem] border border-stone-200 bg-white/85 px-4 py-3 text-sm font-medium text-stone-700">
                  Mood score <span className="font-black text-stone-900">{trackedScore}</span> tracked for today.
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default App
