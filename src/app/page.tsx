import { CategoryGrid, FeaturedProducts, Features, HeroSection, Newsletter } from '@/components/home'
import { products } from '@/data/products'

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  return (
    <>
    {/* <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"> */}
      <HeroSection /> 
      <FeaturedProducts products={featuredProducts} />
      <CategoryGrid />
      <Features />
      <Newsletter />
    {/* </main> */}
    </>
  )
}