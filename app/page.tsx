import { Hero } from '@/components/sections/Hero'
import { FeaturesBento } from '@/components/sections/FeaturesBento'
import { HowItWorksPreview } from '@/components/sections/HowItWorksPreview'
import { WorkspaceShowcase } from '@/components/sections/WorkspaceShowcase'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Pricing } from '@/components/sections/Pricing'
import { FadeInView } from '@/components/ui/FadeInView'

export default function Home() {
  return (
    <main>
      <Hero />
      <FadeInView><FeaturesBento /></FadeInView>
      <FadeInView><HowItWorksPreview /></FadeInView>
      <FadeInView><WorkspaceShowcase /></FadeInView>
      <FadeInView><CtaBanner /></FadeInView>
      <FadeInView><Pricing /></FadeInView>
    </main>
  )
}
