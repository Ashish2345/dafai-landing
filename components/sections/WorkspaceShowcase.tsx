const callouts = [
  {
    icon: '🔗',
    title: 'Cited Sources',
    description: 'Every claim links to the original gazette page',
  },
  {
    icon: '📑',
    title: 'Original Scans',
    description: 'View the stamped document, not just parsed text',
  },
  {
    icon: '🕐',
    title: 'Saved History',
    description: "Your firm's research is saved and searchable",
  },
]

export function WorkspaceShowcase() {
  return (
    <section id="workspace" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-[1620px] px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#09383e' }}>
            THE WORKSPACE
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-midnight">
            Your Modern Compliance Command Center.
          </h2>
        </div>

        {/* Browser chrome mockup */}
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
            {/* macOS dots */}
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            {/* URL bar */}
            <div className="ml-3 flex-1 max-w-xs">
              <div className="flex items-center gap-2 bg-white rounded-md px-3 py-1.5 border border-slate-200">
                <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0V7m0 4v4m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-slate-500 font-mono">merodafa.com/workspace</span>
              </div>
            </div>
          </div>

          {/* App interior */}
          <div className="flex bg-white" style={{ minHeight: '420px' }}>
            {/* Sidebar */}
            <div className="w-12 flex flex-col items-center gap-4 py-4 bg-slate-800 border-r border-slate-700 flex-shrink-0">
              {['🏠', '💬', '📂', '⚙️'].map((icon, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${
                    i === 1 ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  style={i === 1 ? { backgroundColor: '#09383e' } : undefined}
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* Chat panel */}
            <div className="flex-1 flex flex-col border-r border-slate-100 p-4 gap-3" style={{ minWidth: 0 }}>
              {/* Panel header */}
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">AI Chat</span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                  Live
                </span>
              </div>

              {/* User query bubble */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-xl rounded-tr-sm text-white px-3.5 py-2.5" style={{ backgroundColor: '#09383e' }}>
                  <p className="text-xs leading-relaxed">
                    What tax rate applies to bonus income above रू 500,000?
                  </p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex flex-col gap-2">
                <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-slate-50 border border-slate-200 px-3.5 py-3">
                  <p className="text-xs text-slate-700 leading-relaxed mb-2">
                    Under{' '}
                    <span className="font-semibold" style={{ color: '#09383e' }}>Section 27(2)</span> of the
                    Income Tax Act 2058, bonus income exceeding रू 500,000 is taxed at{' '}
                    <span className="font-semibold text-slate-900">a flat 15%</span> withholding rate.
                  </p>
                  {/* Citation chip */}
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: 'rgba(9,56,62,0.08)', border: '1px solid rgba(9,56,62,0.2)', color: '#09383e' }}>
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      ITA 2058 §27(2)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-medium">
                      Finance Act 2081
                    </span>
                  </div>
                </div>

                {/* Toolbar icons row */}
                <div className="flex gap-1 mt-1">
                  {['📋', '🔗', '⬇️', '↩️'].map((icon, i) => (
                    <button
                      key={i}
                      className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-xs hover:bg-slate-100 transition-colors"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input bar */}
              <div className="mt-auto flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <span className="flex-1 text-slate-400 text-xs">Ask a compliance question…</span>
                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#09383e' }}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Document panel */}
            <div className="flex-1 flex flex-col p-4 gap-3" style={{ minWidth: 0 }}>
              {/* Panel header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Original Gazette</span>
                <span className="text-[10px] text-slate-400 font-mono">ITA-2058.pdf</span>
              </div>

              {/* Document page */}
              <div className="flex-1 rounded-lg bg-white border border-slate-200 p-4 flex flex-col gap-2.5 shadow-sm">
                {/* Doc header */}
                <div className="flex flex-col gap-1.5 pb-3 border-b border-slate-100">
                  <div className="h-2 w-3/4 bg-slate-200 rounded" />
                  <div className="h-1.5 w-1/2 bg-slate-100 rounded" />
                </div>

                {/* Regular lines */}
                <div className="space-y-1.5">
                  {[90, 75, 85, 60].map((w, i) => (
                    <div key={i} className="h-1.5 bg-slate-100 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>

                {/* Highlighted section — teal border */}
                <div className="rounded-md px-3 py-2.5 space-y-1.5" style={{ border: '2px solid #09383e', backgroundColor: '#F0FDFA' }}>
                  <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: '#09383e' }}>
                    §27(2) — Matched
                  </span>
                  {[100, 95, 88, 100].map((w, i) => (
                    <div key={i} className="h-1.5 rounded" style={{ width: `${w}%`, backgroundColor: 'rgba(9,56,62,0.2)' }} />
                  ))}
                </div>

                {/* More lines */}
                <div className="space-y-1.5">
                  {[70, 90, 55].map((w, i) => (
                    <div key={i} className="h-1.5 bg-slate-100 rounded" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>

              {/* Page indicator */}
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Page 12 of 88</span>
                <div className="flex gap-1">
                  {['◀', '▶'].map((a) => (
                    <button
                      key={a}
                      className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Callouts */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {callouts.map((c) => (
            <div key={c.title} className="flex flex-col items-center text-center gap-2">
              <span className="text-2xl">{c.icon}</span>
              <span className="font-semibold text-midnight text-sm">{c.title}</span>
              <span className="text-slate-500 text-sm max-w-[200px]">{c.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
