import Hero from './Hero/Hero'
import HowItWorks from './HowItWorks/HowItWorks'
import Story from './Story/Story'
import LatestJobs from './LatestJobs/LatestJobs'
import FinalCTA from './FinalCTA/FinalCTA'
import StoryIMG1 from '../../../assets/img-landingpage/storyIMG1.jpg'
import StoryIMG2 from '../../../assets/img-landingpage/storyIMG2.jpg'


import './landingPage.css'

function LandingPage() {

  // Pour l'instant, valeurs en dur
  // TODO : remplacer par un appel API via MSW quand le service stats sera prêt
  const stats = {
    agriculteurs: 124,
    saisonniers: 389,
    annonces: 67,
  } 

  return (
    <main className="landing">
      <Hero />

      <section className="landing__stats">
        <div className="landing__stat">
          <span className="landing__stat-value">{stats.agriculteurs}</span>
          <span className="landing__stat-label">agriculteurs</span>
        </div>
        <div className="landing__stat">
          <span className="landing__stat-value">{stats.saisonniers}</span>
          <span className="landing__stat-label">saisonniers</span>
        </div>
        <div className="landing__stat">
          <span className="landing__stat-value">{stats.annonces}</span>
          <span className="landing__stat-label">annonces</span>
        </div>
      </section>

      <HowItWorks />
      <Story 
      variant='left' 
      title='lorem ipsum' 
      text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis tortor orci, vel luctus eros pharetra a. Mauris non ultrices nulla. Quisque quis rhoncus nunc. Donec malesuada facilisis lacus, nec viverra justo. Ut quis lacus non sem rutrum hendrerit. Pellentesque consectetur ornare dolor euismod eleifend. Integer suscipit vel metus vitae sollicitudin. Vivamus faucibus, ex sed vehicula fringilla, est lorem luctus nisi, at volutpat libero purus vel ex.'
      image={StoryIMG1}
      imageAlt='belle image de vigne'
      subtitle='lorem ipsum'
      subtext='lorem ipsum'
      />
      <Story 
      variant='right' 
      title='lorem ipsum' 
      text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis tortor orci, vel luctus eros pharetra a. Mauris non ultrices nulla. Quisque quis rhoncus nunc. Donec malesuada facilisis lacus, nec viverra justo. Ut quis lacus non sem rutrum hendrerit. Pellentesque consectetur ornare dolor euismod eleifend. Integer suscipit vel metus vitae sollicitudin. Vivamus faucibus, ex sed vehicula fringilla, est lorem luctus nisi, at volutpat libero purus vel ex.'
      image={StoryIMG2}
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