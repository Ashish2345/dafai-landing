'use client'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'

type TeamMember = {
  name: string
  role: string
  photo: string // path under /public/team/
  initials: string
}

/**
 * Team members.
 * To add a real photo: drop a square JPG/PNG into /public/team/<filename>.
 * If the file is missing, the card automatically shows a teal initials avatar.
 */
const teamMembers: TeamMember[] = [
  {
    name: 'Aashish Rayamajhi',
    role: 'CTO',
    photo: '/team/aashish-rayamajhi.jpg',
    initials: 'AR',
  },
  {
    name: 'Sabin Adhikari',
    role: 'Chartered Accountant',
    photo: '/team/sabin-adhikari.jpg',
    initials: 'SA',
  },
]

export default function TeamPage() {
  return (
    <main className="bg-white pb-16">
      <PageHero
        kicker="The team"
        title="Engineering meets"
        titleAccent="chartered accountancy."
        description={
          <>
            Two people, one goal &mdash; make Nepal&apos;s tax law searchable, cited,
            and trustworthy for the professionals who rely on it every day.
          </>
        }
      />

      {/* Mission block */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div
          className="rounded-xl border border-slate-200 border-l-4 pl-8 pr-8 py-8 flex flex-col gap-3 shadow-sm"
          style={{ borderLeftColor: '#09383e', borderLeftWidth: '4px' }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#09383e' }}>
            OUR MISSION
          </span>
          <blockquote className="font-display text-2xl md:text-3xl font-semibold text-slate-900 leading-snug">
            &ldquo;To eliminate the Risk Gap in Nepal&apos;s financial decisions.&rdquo;
          </blockquote>
          <p className="text-slate-600 text-base leading-relaxed">
            Every day, CAs and finance teams make decisions without full visibility of the
            latest regulations. We&apos;re closing that gap &mdash; one cited answer at a time.
          </p>
        </div>
      </div>

      {/* Team grid */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="rounded-2xl px-8 py-10 flex flex-col items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
            Want to get in touch?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed max-w-sm">
            Whether you&rsquo;re a CA interested in piloting Mero Dafa or want to explore
            working with us, we&rsquo;d love to hear from you.
          </p>
          <Link
            href="mailto:support@dafa.ai"
            className="inline-flex items-center justify-center rounded-full bg-white font-semibold px-6 py-3 text-sm transition-all duration-200 hover:brightness-95"
            style={{ color: '#09383e' }}
          >
            Contact the team
          </Link>
        </div>
      </div>
    </main>
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Avatar — photo with initials fallback */}
      <div
        className="relative w-28 h-28 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-3xl shadow-md"
        style={{
          background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
        }}
      >
        {/* Initials as fallback — rendered underneath the image */}
        <span className="absolute inset-0 flex items-center justify-center">{member.initials}</span>
        {/* Image on top; if it 404s, we hide it and the initials show through. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.photo}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>

      {/* Name + role */}
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-xl text-slate-900">{member.name}</h3>
        <p className="text-sm font-medium" style={{ color: '#09383e' }}>
          {member.role}
        </p>
      </div>
    </div>
  )
}
