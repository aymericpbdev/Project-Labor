import { useNavigate } from 'react-router-dom'
import Cereals from '../../../assets/cultures/Cereals.jpg'
import Fruits from '../../../assets/cultures/Fruits.jpg'
import './inscriptionChoice.css'
import { useEffect } from 'react'

function InscriptionChoicePage() {
  const navigate = useNavigate()

useEffect(() => {
    window.scrollTo(0, 0)
    const images = [Cereals, Fruits]
    images.forEach(src => {
        const img = new Image()
        img.src = src
    })
}, [])

  return (
    <div className="choice-wrapper">
      <div className="choice-card">
        
        <div className="form-card-header">
          <span className="form-card-badge">Inscription</span>
          <h1 className="form-card-title">Rejoignez Labor</h1>
          <p className="form-card-subtitle">Choisissez votre profil pour commencer</p>
          <div className="form-divider"></div>
        </div>
        
        <div className="choice-grid">
          
          <button
            className="choice-item"
            onClick={() => navigate('/inscription/agriculteur')}
            style={{ backgroundImage: `url(${Cereals})` }}
          >
            <div className="choice-item__overlay" />
            <div className="choice-item__content">
              <span className="choice-item__badge choice-item__badge--agri">Agriculteur</span>
              <h2 className="choice-item__title">Je recrute</h2>
              <p className="choice-item__desc">Publiez vos annonces et trouvez vos saisonniers</p>
            </div>
          </button>
          
          <button
            className="choice-item"
            onClick={() => navigate('/inscription/saisonnier')}
            style={{ backgroundImage: `url(${Fruits})` }}
          >
            <div className="choice-item__overlay" />
            <div className="choice-item__content">
              <span className="choice-item__badge choice-item__badge--saison">Saisonnier</span>
              <h2 className="choice-item__title">Je cherche</h2>
              <p className="choice-item__desc">Trouvez votre prochaine mission agricole</p>
            </div>
          </button>

        </div>
        
        <p className="form-footer">
          Déjà un compte ?{' '}
          <span className="link-text" onClick={() => navigate('/connexion')}>
            Se connecter
          </span>
        </p>

      </div>
    </div>
  )
}

export default InscriptionChoicePage