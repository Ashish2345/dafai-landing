import Link from 'next/link'

const teamMembers = [
  {
    initials: 'RK',
    name: 'Rohan Khanal',
    role: 'CEO & Founder',
    bio: 'Former tax consultant at Big 4. Built Mero Dafa to eliminate compliance blind spots for Nepal\'s finance sector.',
    gradientFrom: '#2563EB',
    gradientTo: '#1d4ed8',
  },
  {
    initials: 'AS',
    name: 'Aarav Shrestha',
    role: 'CTO',
    bio: 'ML engineer with 8 years in NLP. Previously at Esewa and CloudFactory. Leads our RAG pipeline architecture.',
    gradientFrom: '#059669',
    gradientTo: '#047857',
  },
  {
    initials: 'PM',
    name: 'Priya Maharjan',
    role: 'Lead CA & Legal Advisor',
    bio: 'Chartered Accountant with 10+ years in Nepal tax law. Audits all AI-generated legal interpretations.',
    gradientFrom: '#EA580C',
    gradientTo: '#c2410c',
  },
  {
    initials: 'ST',
    name: 'Suraj Tamang',
    role: 'Product Lead',
    bio: 'Product leader who has shipped compliance tools for 3 Nepali fintech startups. Obsessed with UX clarity.',
    gradientFrom: '#7C3AED',
    gradientTo: '#6d28d9',
  },
  {
    initials: 'NK',
    name: 'Nisha Karki',
    role: 'ML Engineer',
    bio: 'Specialises in OCR and document parsing. Her Docsumo pipeline achieves 99.9% accuracy on scanned gazettes.',
    gradientFrom: '#0891b2',
    gradientTo: '#0e7490',
  },
  {
    initials: 'BR',
    name: 'Bikash Rai',
    role: 'Legal Advisor',
    bio: 'Practicing advocate with focus on corporate and financial law. Ensures Mero Dafa stays legally compliant.',
    gradientFrom: '#be185d',
    gradientTo: '#9d174d',
  },
]

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-electric text-xs uppercase tracking-widest font-semibold mb-4 block">
          THE TEAM
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-midnight leading-tight mb-6">
          Built by Engineers,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Verified by CAs.
          </span>
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          A multidisciplinary team combining deep legal expertise with cutting-edge AI to
          serve Nepal&apos;s financial professionals.
        </p>
      </div>

      {/* Mission block */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-xl border border-slate-200 border-l-4 pl-8 pr-8 py-8 flex flex-col gap-3 shadow-sm"
          style={{ borderLeftColor: '#059669', borderLeftWidth: '4px' }}
        >
          <span className="text-emerald text-xs font-semibold uppercase tracking-widest">
            OUR MISSION
          </span>
          <blockquote className="font-display text-2xl md:text-3xl font-semibold text-midnight leading-snug">
            &ldquo;To eliminate the Risk Gap in Nepal&apos;s financial decisions.&rdquo;
          </blockquote>
          <p className="text-slate-500 text-base leading-relaxed">
            Every day, CAs and finance teams make decisions without full visibility of the
            latest regulations. We&apos;re closing that gap — one cited answer at a time.
          </p>
        </div>
      </div>

      {/* Team grid */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${member.gradientFrom} 0%, ${member.gradientTo} 100%)`,
                }}
              >
                {member.initials}
              </div>

              {/* Name + role */}
              <div className="flex flex-col gap-0.5">
                <h3 className="font-display font-semibold text-lg text-midnight">
                  {member.name}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: member.gradientFrom }}
                >
                  {member.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join the team CTA */}
      <div className="mt-20 mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-midnight rounded-2xl px-8 py-12 flex flex-col items-center gap-5">
          <span className="text-electric text-xs font-semibold uppercase tracking-widest">
            CAREERS
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            We&apos;re hiring.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">
            Join a team that&apos;s reshaping how Nepal&apos;s financial professionals
            interact with legal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-lg bg-electric text-white font-semibold px-6 py-3 text-sm shadow-lg shadow-electric/25 hover:brightness-110 transition-all duration-200"
            >
              View Open Roles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/20 text-white font-semibold px-6 py-3 text-sm hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
