const toolkit = [
  'Vite 8 scaffold',
  'React 19 entrypoint',
  'Tailwind CSS 4',
  'daisyUI components',
]

function App() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.35),_transparent_65%)]" />
      <div className="absolute right-[-8rem] top-28 -z-10 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="absolute left-[-6rem] top-80 -z-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="badge badge-warning badge-lg gap-2 border border-stone-900/10 bg-white/70 px-4 py-4 text-stone-800 shadow-sm backdrop-blur">
              Fresh stack initialized
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-500">
                mood-loc starter
              </p>
              <h1 className="max-w-3xl text-5xl font-black leading-none text-stone-900 sm:text-6xl lg:text-7xl">
                Vite, React, Tailwind 4, and daisyUI are wired and ready.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-700 sm:text-xl">
                The default Vite demo has been replaced with a clean launchpad so
                you can start building immediately without legacy starter styles
                or Tailwind 3 setup files.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-orange-300/40"
                href="https://vite.dev/guide/"
                target="_blank"
                rel="noreferrer"
              >
                Vite docs
              </a>
              <a
                className="btn btn-outline btn-lg rounded-full border-stone-900/15 bg-white/60 px-8 text-stone-900 backdrop-blur hover:bg-white"
                href="https://daisyui.com/docs/install/"
                target="_blank"
                rel="noreferrer"
              >
                daisyUI docs
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {toolkit.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-900/10 bg-white/65 px-4 py-2 text-sm font-medium text-stone-700 shadow-sm backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="card border border-white/60 bg-white/70 shadow-2xl shadow-orange-950/10 backdrop-blur-xl">
            <div className="card-body gap-6 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
                    Current setup
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-stone-900">
                    Styling pipeline
                  </h2>
                </div>
                <div className="avatar placeholder">
                  <div className="w-14 rounded-2xl bg-orange-500 text-lg font-bold text-white">
                    UI
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl border border-stone-900/10 bg-stone-950 p-4 text-sm text-stone-100 shadow-inner">
                  <span className="text-orange-300">@import</span> "tailwindcss";
                  <br />
                  <span className="text-orange-300">@plugin</span> "daisyui";
                </div>
                <div className="stats stats-vertical border border-stone-900/10 bg-orange-50 text-stone-800 shadow-sm sm:stats-horizontal">
                  <div className="stat">
                    <div className="stat-title text-stone-500">Bundler</div>
                    <div className="stat-value text-2xl">Vite 8</div>
                    <div className="stat-desc text-stone-600">Latest scaffold path</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-stone-500">CSS Engine</div>
                    <div className="stat-value text-2xl">Tailwind 4</div>
                    <div className="stat-desc text-stone-600">Vite plugin integration</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-stone-300 bg-white/60 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-400">
                  Next command
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-stone-900 px-4 py-3 text-sm text-stone-100">
                  <code>pnpm dev</code>
                  <span className="badge badge-warning badge-outline">local</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Start the dev server and begin replacing this launch screen with
                  your product UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
