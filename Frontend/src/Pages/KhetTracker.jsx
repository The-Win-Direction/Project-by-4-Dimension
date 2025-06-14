import React from 'react'
import Header from '../Components/Header'
import CreateKhet from '../Components/Khet Tracker/CreateKhet'
import Footer from '../Components/Footer'

function KhetTracker() {
  return (
    <div className='bg-green-50'>
        <Header/>
        <CreateKhet/>
        <Footer/>
    </div>
  )
}

export default KhetTracker
