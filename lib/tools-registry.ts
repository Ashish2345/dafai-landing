// Single list of every free tool — feeds the /tools index, related-tool links,
// the sitemap and llms.txt so a new calculator only needs registering once.

export type ToolIcon =
  | 'calc'
  | 'doc'
  | 'percent'
  | 'chart'
  | 'car'
  | 'plane'
  | 'home'
  | 'receipt'
  | 'briefcase'
  | 'clock'
  | 'scale'
  | 'gift'

export type Tool = {
  slug: string
  title: string
  /** Short name for footers, related-tool chips and breadcrumbs. */
  shortTitle: string
  description: string
  audience: string
  status: 'live' | 'soon'
  icon: ToolIcon
}

export const TOOLS: Tool[] = [
  {
    slug: 'salary-tax-calculator',
    title: 'Salary Tax Calculator (FY 2083/84)',
    shortTitle: 'Salary Tax Calculator',
    description:
      'Monthly TDS on the Finance Act 2083 slabs — first Rs 10 lakh at 1%, top rate 29%. SSF, pension fund, PF/EPF, CIT, life/health/house insurance and the women’s rebate handled. FY 2082/83 included.',
    audience: 'Employees · HR · CAs',
    status: 'live',
    icon: 'calc',
  },
  {
    slug: 'tds-calculator',
    title: 'TDS Calculator (All Payment Types)',
    shortTitle: 'TDS Calculator',
    description:
      'Withholding tax on rent, service fees, contracts, interest, dividends, commission, royalty and more — the right Income Tax Act section, rate and whether it is final. VAT-exclusive base handled.',
    audience: 'Accountants · Businesses · CAs',
    status: 'live',
    icon: 'receipt',
  },
  {
    slug: 'vat-calculator',
    title: 'VAT Calculator (13% / 5%)',
    shortTitle: 'VAT Calculator',
    description:
      'Add or extract Nepal VAT on any invoice — 13% standard, the new 5% rate, or exempt, per line. Shows the 10% digital-payment rebate.',
    audience: 'Accountants · Small businesses',
    status: 'live',
    icon: 'percent',
  },
  {
    slug: 'property-tax-calculator',
    title: 'Land & House Registration Fee + Capital Gains Tax',
    shortTitle: 'Property Tax Calculator',
    description:
      'Malpot registration fee for the buyer and capital gains tax for the seller (7.5% / 10% under Finance Act 2083), with the women’s concession and the Rs 10 lakh exemption.',
    audience: 'Home buyers · Sellers · Brokers',
    status: 'live',
    icon: 'home',
  },
  {
    slug: 'share-cgt-calculator',
    title: 'NEPSE Share Profit & CGT Calculator',
    shortTitle: 'NEPSE CGT Calculator',
    description:
      'See your real bankable profit on NEPSE trades — broker commission, SEBON fee, DP charge, and Capital Gains Tax at the new FY 2083/84 rates (10% / 7.5%) all handled.',
    audience: 'Investors · Brokers · CAs',
    status: 'live',
    icon: 'chart',
  },
  {
    slug: 'bonus-right-share-calculator',
    title: 'Bonus & Right Share Price Adjustment + Dividend Tax',
    shortTitle: 'Bonus / Right Share Calculator',
    description:
      'NEPSE price adjustment after bonus and right issues, new share count, and the 5% dividend tax on cash and bonus dividends.',
    audience: 'NEPSE investors',
    status: 'live',
    icon: 'gift',
  },
  {
    slug: 'gratuity-ssf-calculator',
    title: 'Gratuity, PF & SSF Calculator',
    shortTitle: 'Gratuity & SSF Calculator',
    description:
      'Labour Act 2074 gratuity (8.33%), provident fund (10% + 10%) and SSF (11% + 20%) contributions, your retirement balance and the tax on withdrawal.',
    audience: 'Employees · HR · Payroll',
    status: 'live',
    icon: 'briefcase',
  },
  {
    slug: 'tax-penalty-calculator',
    title: 'Late Tax Return Fine & Interest Calculator',
    shortTitle: 'Tax Fine & Interest Calculator',
    description:
      'IRD late-filing fee (Section 117), 15% interest on unpaid tax (Section 119), and fees for missed estimated and TDS returns.',
    audience: 'Taxpayers · CAs · Businesses',
    status: 'live',
    icon: 'clock',
  },
  {
    slug: 'court-fee-calculator',
    title: 'Court Fee Calculator (Civil Procedure Code 2074)',
    shortTitle: 'Court Fee Calculator',
    description:
      'Court fee (कोर्ट फी) on a civil claim under Section 69, the 15% appeal addition, and flat fees for non-monetary suits.',
    audience: 'Lawyers · Litigants · Law students',
    status: 'live',
    icon: 'scale',
  },
  {
    slug: 'bluebook-fine-calculator',
    title: 'Bluebook Fine & Vehicle Tax Calculator',
    shortTitle: 'Bluebook Fine Calculator',
    description:
      'FY 2083/84 vehicle tax for all 7 provinces, EVs, the 90-day grace window, late fines and multi-year arrears for bikes and cars.',
    audience: 'Vehicle owners · Bike & car drivers',
    status: 'live',
    icon: 'car',
  },
  {
    slug: 'customs-calculator',
    title: 'Customs Duty Calculator (Gold, Mobile, TV)',
    shortTitle: 'Customs Duty Calculator',
    description:
      'FY 2083/84 baggage rules — gold (25 g men / 50 g women free, 20% duty), raw gold, silver, 65" TVs and mobile phones. Free vs taxable vs not allowed.',
    audience: 'Travellers · NRNs · Returning workers',
    status: 'live',
    icon: 'plane',
  },
  {
    slug: 'finance-act-changelog',
    title: 'Finance Act Changelog',
    shortTitle: 'Finance Act Changelog',
    description:
      'Side-by-side diff of every Finance Act change since 2078 — what was deleted, what was added, what was amended.',
    audience: 'CAs · Tax lawyers',
    status: 'soon',
    icon: 'doc',
  },
]

export function toolBySlug(slug: string): Tool {
  const t = TOOLS.find((x) => x.slug === slug)
  if (!t) throw new Error(`Unknown tool: ${slug}`)
  return t
}

export const LIVE_TOOLS = TOOLS.filter((t) => t.status === 'live')
