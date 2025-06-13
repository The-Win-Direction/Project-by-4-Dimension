import Header from '../Components/Header'
import WhoWeAre from '../Components/About/WhoWeAre';
import OurMission from '../Components/About/OurMission';
import WhatWeDo from '../Components/About/WhatWeDo';
import OurTeam from '../Components/About/OurTeam';
import Footer from '../Components/Footer';

function About() {
  return (
    <div>
      <Header/>
       <WhoWeAre/>
       <OurMission/>
       <WhatWeDo/>
       <OurTeam/>
       <Footer/>
    </div>
  )
}

export default About
