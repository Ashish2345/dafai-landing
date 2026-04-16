import { Hero } from '@/components/sections/Hero'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { ProductShowcase } from '@/components/sections/ProductShowcase'
import { UseCases } from '@/components/sections/UseCases'
import { FeaturesBento } from '@/components/sections/FeaturesBento'
import { HowItWorksPreview } from '@/components/sections/HowItWorksPreview'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { FadeInView } from '@/components/ui/FadeInView'

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <FadeInView><BeforeAfter /></FadeInView>
      <FadeInView><ProductShowcase /></FadeInView>
      <FadeInView><UseCases /></FadeInView>
      <FadeInView><FeaturesBento /></FadeInView>
      <FadeInView><HowItWorksPreview /></FadeInView>
      <FadeInView><Pricing /></FadeInView>
      <FadeInView><FAQ /></FadeInView>
      <FadeInView><CtaBanner /></FadeInView>
    </main>
  )
}
