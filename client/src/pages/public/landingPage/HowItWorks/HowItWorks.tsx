import './HowItWorks.css'

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h2 className="how-it-works__title">Comment ça marche</h2>

      <div className="how-it-works__steps">
        <div className="how-it-works__step step-1">
          {/* TODO : icône épis */}
          <h3 className="how-it-works__step-title">Créez votre profil</h3>
        </div>

        <div className="how-it-works__step step-2">
          {/* TODO : icône épis */}
          <h3 className="how-it-works__step-title">Connectez-vous</h3>
        </div>

        <div className="how-it-works__step step-3">
          {/* TODO : icône épis */}
          <h3 className="how-it-works__step-title">Publiez ou cherchez</h3>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks