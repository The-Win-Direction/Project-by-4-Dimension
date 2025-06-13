import React from 'react'
import Header from '../Components/Header'
import HeroSection from '../Components/Home/HeroSection'
import FeatureSection from '../Components/Home/Features'
import Testimonials from '../Components/Home/Testimonial'

function Home() {
  return (
    <div>
      <Header/>
        <HeroSection/>
        <FeatureSection/>
        <Testimonials/>
    </div>
  )
}

export default Home

