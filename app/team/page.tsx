import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { TeamCard, type TeamMember } from './TeamCard'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  teamPersonSchemas,
  breadcrumbListSchema,
  SITE_URL,
} from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'Team & Mission',
  description:
    "Built by engineers, verified by CAs. Meet the team eliminating Nepal's compliance risk gap with hierarchy-aware AI for tax and legal research.",
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team & Mission — Mero Dafa',
    description:
      "Built by engineers, verified by CAs. Meet the team eliminating Nepal's compliance risk gap.",
    url: '/team',
    type: 'website',
  },
}

const teamMembers: TeamMember[] = [
  {
    name: 'Aashish Rayamajhi',
    role: 'Co-founder & CTO',
    bio: 'Builds the AI and infrastructure behind MeroDafa. Focused on making legal documents searchable and accessible.',
    photo: '/team/aashish-rayamajhi.jpg',
    initials: 'AR',
  },
  {
    name: 'Sabin Adhikari',
    role: 'Co-founder & CA',
    bio: "Practicing Chartered Accountant who reviews how the system interprets Nepal's tax law. Ensures every answer is accurate.",
    photo: '/team/sabin-adhikari.jpg',
    initials: 'SA',
  },
]

const VALUES = [
  {
    title: 'Accuracy over speed',
    description:
      'Every answer links to the original source. We’d rather say "not found" than give an unverified answer.',
  },
  {
    title: 'Built by practitioners',
    description:
      "A CA validates the AI's interpretation. We don't ship what we can't professionally stand behind.",
  },
  {
    title: 'Nepal-first',
    description:
      'Not a generic legal AI adapted for Nepal. Built from the ground up for Nepali acts, directives, and gazettes.',
  },
]

export default function TeamPage() {
  return (
    <main className="bg-white pb-16">
      <JsonLd id="ld-team-people" data={teamPersonSchemas(teamMembers)} />
      <JsonLd
        id="ld-team-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Team', url: `${SITE_URL}/team` },
        ])}
      />

      <PageHero
        kicker="Who we are"
        title="Built by the people who"
        titleAccent="understand the problem."
        description={
          <>
            A CA and a technologist, building the legal research tool they wished existed
            &mdash; for the professionals who need it most.
          </>
        }
      />

      {/* Team cards */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Why we built this */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: 'rgba(9,56,62,0.1)', color: '#09383e' }}
          >
            Why we built this
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
            Nepal&apos;s finance professionals deserve better tools.
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed max-w-xl mx-auto">
            Every day, CAs and tax consultants make critical decisions while manually
            searching through hundreds of pages of acts and directives. We&apos;re building
            the tool that gives them instant, verified answers &mdash; so they can focus
            on advisory, not document hunting.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-slate-200 p-6 flex flex-col gap-2 hover:border-[#09383e]/25 hover:shadow-sm transition-all duration-200"
            >
              <h3 className="font-display font-semibold text-base text-slate-900">{v.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-20 mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="rounded-2xl px-8 py-10 flex flex-col items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
        >
          <h2 className="font-display font-bold text-2xl text-white">
            Want to get in touch?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
            Whether you want to try MeroDafa, partner with us, or just say hello &mdash; we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              href="mailto:support@merodafa.com"
              className="inline-flex items-center justify-center rounded-full bg-white font-semibold px-6 py-3 text-sm transition-all duration-200 hover:brightness-95 cursor-pointer"
              style={{ color: '#09383e' }}
            >
              support@merodafa.com
            </Link>
            <a
              href="tel:+9779823380132"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              +977 9823380132
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
