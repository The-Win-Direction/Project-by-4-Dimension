import React from 'react'
import Header from '../Components/Header'
import HeroSection from '../Components/Home/HeroSection'
import FeatureSection from '../Components/Home/Features'
import Footer from '../Components/Footer'

function Home() {
  return (
    <div className='bg-green-50'>
      <Header/>
        <HeroSection/>
        <FeatureSection/>
        <Footer/>
    </div>
  )
}

export default Home

