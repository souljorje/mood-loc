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
        <div className="w-full">
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

        </div>
      </section>
    </main>
  )
}

export default App
