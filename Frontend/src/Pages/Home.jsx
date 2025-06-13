import React from 'react'
import Header from '../Components/Header'
import HeroSection from '../Components/Home/HeroSection'
import FeatureSection from '../Components/Home/Features'

function Home() {
  return (
    <div>
      <Header/>
        <HeroSection/>
        <FeatureSection/>
      Welcome to Our Platform
    </div>
  )
}

export default Home

