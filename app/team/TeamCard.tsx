'use client'

export type TeamMember = {
  name: string
  role: string
  bio: string
  photo: string
  initials: string
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow duration-200">
      {/* Avatar */}
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-2xl shadow-md"
        style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
      >
        <span className="absolute inset-0 flex items-center justify-center">{member.initials}</span>
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

      {/* Info */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display font-semibold text-xl text-slate-900">{member.name}</h3>
        <p className="text-sm font-medium" style={{ color: '#09383e' }}>{member.role}</p>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{member.bio}</p>
    </div>
  )
}
