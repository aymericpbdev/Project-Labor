import Button from '../../../../components/ui/Button/Button'

import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      {/* Image de fond */}
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
          <Button variant="primary" size='m'>Je suis agriculteur</Button>
          <Button variant="secondary" size='m'>Je suis saisonnier</Button>
        </div>
      </div>
    </section>
  )
}

export default Hero