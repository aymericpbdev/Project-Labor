import Hero from './Hero/Hero'
import HowItWorks from './HowItWorks/HowItWorks'
//import Story from './Story/Story'
import LatestJobs from './LatestJobs/LatestJobs'
//import FinalCTA from './FinalCTA/FinalCTA'

import './landingPage.css'

function LandingPage() {
  return (
    <main className="landing">
      <Hero />

      <section className="landing__stats">
        Stats
      </section>

      <HowItWorks />
      
      <LatestJobs />
      
    </main>
  )
}

export default LandingPage