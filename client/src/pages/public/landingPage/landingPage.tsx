import Hero from './Hero/Hero'
import HowItWorks from './HowItWorks/HowItWorks'
import Story from './Story/Story'
import LatestJobs from './LatestJobs/LatestJobs'
import FinalCTA from './FinalCTA/FinalCTA'

import './landingPage.css'

function LandingPage() {
  return (
    <main className="landing">
      <Hero />

      <section className="landing__stats">
        Stats
      </section>

      <HowItWorks />
      <Story 
      variant='left' 
      title='lorem ipsum' 
      text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis tortor orci, vel luctus eros pharetra a. Mauris non ultrices nulla. Quisque quis rhoncus nunc. Donec malesuada facilisis lacus, nec viverra justo. Ut quis lacus non sem rutrum hendrerit. Pellentesque consectetur ornare dolor euismod eleifend. Integer suscipit vel metus vitae sollicitudin. Vivamus faucibus, ex sed vehicula fringilla, est lorem luctus nisi, at volutpat libero purus vel ex.'
      image=''
      imageAlt='belle image de vigne'
      subtitle='lorem ipsum'
      subtext='lorem ipsum'
      />
      <Story 
      variant='right' 
      title='lorem ipsum' 
      text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis tortor orci, vel luctus eros pharetra a. Mauris non ultrices nulla. Quisque quis rhoncus nunc. Donec malesuada facilisis lacus, nec viverra justo. Ut quis lacus non sem rutrum hendrerit. Pellentesque consectetur ornare dolor euismod eleifend. Integer suscipit vel metus vitae sollicitudin. Vivamus faucibus, ex sed vehicula fringilla, est lorem luctus nisi, at volutpat libero purus vel ex.'
      image=''
      imageAlt='belle image de champ'
      subtitle='lorem ipsum'
      subtext='lorem ipsum'
      />
      <LatestJobs />
      <FinalCTA />
      
    </main>
  )
}

export default LandingPage