import type { ToolIcon as ToolIconName } from '@/lib/tools-registry'

const PATHS: Record<ToolIconName, string> = {
  calc: 'M9 7h6m-6 4h6m-6 4h4M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z',
  percent: 'M19 5L5 19m2-12a2 2 0 11-4 0 2 2 0 014 0zm14 12a2 2 0 11-4 0 2 2 0 014 0z',
  chart: 'M3 3v18h18M7 14l4-4 4 4 5-7',
  car: 'M3 9l1.5-4.5A2 2 0 016.4 3h11.2a2 2 0 011.9 1.5L21 9m-18 0v9a1 1 0 001 1h2a1 1 0 001-1v-2h12v2a1 1 0 001 1h2a1 1 0 001-1V9m-18 0h18M7 14a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z',
  plane: 'M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1L15 22v-1.5L13 19v-5.5l8 2.5z',
  home: 'M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10',
  receipt: 'M6 3h12v18l-3-2-3 2-3-2-3 2V3zm3 5h6m-6 4h6m-6 4h3',
  briefcase: 'M4 7h16v12H4V7zm5 0V5a2 2 0 012-2h2a2 2 0 012 2v2M4 12h16',
  clock: 'M12 7v5l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  scale: 'M12 3v18m-7 0h14M5 7h14M5 7l-3 7a3 3 0 006 0L5 7zm14 0l-3 7a3 3 0 006 0l-3-7z',
  gift: 'M4 11h16v10H4V11zm-1-4h18v4H3V7zm9 0v14m0-14S10.5 3 8 3.5 8 7 12 7zm0 0s1.5-4 4-3.5S16 7 12 7z',
  doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z',
}

export function ToolIcon({ name, className = 'w-5 h-5' }: { name: ToolIconName; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={PATHS[name]} />
    </svg>
  )
}
