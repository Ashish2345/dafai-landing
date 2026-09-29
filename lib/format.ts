// Plain formatters usable from both server and client components.

const NPR = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 })

export function npr(v: number): string {
  return `Rs ${NPR.format(Math.round(v * 100) / 100)}`
}

export function pct(rate: number): string {
  const v = rate * 100
  return `${Number.isInteger(v) ? v : v.toFixed(v * 10 === Math.round(v * 10) ? 1 : 2)}%`
}
