import AnnonceCard from '../AnnonceCard/AnnonceCard'
import type { CropType } from '../../../types'

import './AnnonceCardPublic.css'

// TYPES
type AnnonceCardPublicProps = {
  titre: string
  departement: string
  postesRestants: number
  cropType: CropType
  imgUrl?: string
  onClick?: () => void
}

// COMPOSANT 
function AnnonceCardPublic({
  titre,
  departement,
  postesRestants,
  cropType,
  imgUrl,
  onClick,
}: AnnonceCardPublicProps) {
  return (
    <AnnonceCard
      typeCulture={cropType}
      imgUrl={imgUrl}
      onClick={onClick}
    >
      <div className="annonce-public__layout">
        {/* Gauche : titre + département */}
        <div className="annonce-public__info">
          <h3 className="annonce-public__title">{titre}</h3>
          <p className="annonce-public__location">{departement}</p>
        </div>

        {/* Droite : postes restants */}
        <div className="annonce-public__count">
          <span className="annonce-public__count-value">{postesRestants}</span>
          <span className="annonce-public__count-label">
            poste{postesRestants > 1 ? 's' : ''} restant{postesRestants > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </AnnonceCard>
  )
}

export default AnnonceCardPublic