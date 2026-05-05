import { Link } from 'react-router-dom'
import Button from '../../../../components/ui/Button/Button'
import heroIMG from '../../../../assets/img-landingpage/heroIMG.jpg'


import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      {/* Image de fond */}
      <img className='hero__image' src={heroIMG} alt="" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">
          Trouvez vos saisonniers
          <br />
          Trouvez votre saison
        </h1>

        <p className="hero__subtitle">
          La plateforme qui connecte agriculteurs et travailleurs saisonniers
        </p>

        <div className="hero__ctas">
          <Link to="/inscription/agriculteur" className="hero__cta-link">
            <Button variant="primary">Je suis agriculteur</Button>
          </Link>
          <Link to="/inscription/saisonnier" className="hero__cta-link">
            <Button variant="secondary">Je suis saisonnier</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero