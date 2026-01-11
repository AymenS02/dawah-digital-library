import React from 'react'

const apps = [
  {
    name: 'Dhikr & Dua App',
    category: 'Recommended Adhkar Routines',
    description: 'Daily remembrance and supplications',
    link: 'https://apps.apple.com/ca/app/dhikr-dua/id1561598617'
  },
  {
    name: 'Salah Pro App',
    category: 'Learning Salah',
    description: 'Visual and audio resources for prayer',
    link: 'https://apps.apple.com/ca/app/salah-pro/id6744323227'
  },
  {
    name: 'Islamic Calendar 2025-2026',
    category: 'Islamic Calendar & Basics',
    description: 'Hijri 1447 to Gregorian Calendar 2025',
    link: 'https://www.islamicfinder.org/islamic-calendar/'
  },
  {
    name: 'PrayWatch',
    category: 'Prayer Tools',
    description: 'Qibla, local masajid, calendar dates, and detailed prayer timings including last third of night',
    link: 'https://apps.apple.com/us/app/pray-watch/id989923828'
  },
  {
    name: 'Azkar',
    category: 'Daily Remembrance',
    description: 'اذكار - Athan & Prayer',
    link: 'https://apps.apple.com/us/app/azkar-%D8%A7%D8%B0%D9%83%D8%A7%D8%B1-athan-prayer/id1454509502'
  },
  {
    name: 'Quran by Quran.com',
    category: 'Quran Study',
    description: 'قرآن - Complete Quran with translations',
    link: 'https://apps.apple.com/us/app/quran-by-quran-com-%D9%82%D8%B1%D8%A2%D9%86/id1118663303'
  }
]

const page = () => {
  return (
    <div className='min-h-screen mt-42 m-10 font-ovo'>
      <div className="text-center lg:text-left mb-16">
        <h1 className="relative font-proxima text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground">
          <span className="absolute inset-0 translate-x-1 translate-y-1 text-gray-200/40">
            MUSLIMS
          </span>
          <span className="absolute inset-0 translate-x-2 translate-y-2 text-gray-200/10">
            MUSLIMS
          </span>
          <span className="relative">
            MUSLIMS
          </span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Essential Islamic Apps & Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <a
              key={index}
              href={app.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="mb-2">
                <span className="text-xs font-semibold text-background uppercase tracking-wide">
                  {app.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-blue-600 transition-colors">
                {app.name}
              </h3>
              <p className="text-background text-sm leading-relaxed">
                {app.description}
              </p>
              <div className="mt-4 text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                Learn more →
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-6 bg-foreground rounded-lg border border-gray-200">
          <p className="text-sm text-background italic">
            <strong>Note:</strong> Lunar app will be included when released
          </p>
        </div>
      </div>
    </div>
  )
}

export default page