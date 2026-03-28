function App() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.35),_transparent_65%)]" />
      <div className="absolute right-[-8rem] top-28 -z-10 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="absolute left-[-6rem] top-80 -z-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="w-full">
          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-black leading-none text-stone-900 sm:text-6xl lg:text-7xl">
                Hello, I'm Mood-loc, your personal mood tracker
              </h1>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

export default App
