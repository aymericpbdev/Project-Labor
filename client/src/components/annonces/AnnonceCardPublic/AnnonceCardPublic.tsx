import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { getGradientForCulture } from '../../../utils/cultureGradient'
import type { CropType } from '../../../types'

import './AnnonceCardPublic.css'

// TYPES 
type AnnonceCardPublicProps = {
  titre: string
  departement: string
  postesRestants: number
  postesTotal: number
  cropType?: CropType
  imgUrl?: string
  to: string          
}

// COMPOSANT 
function AnnonceCardPublic({
  titre,
  departement,
  postesRestants,
  postesTotal,
  cropType,
  imgUrl,
  to,
}: AnnonceCardPublicProps) {
 
  // Ref sur le H3 (le conteneur en overflow:hidden) : c'est lui qui sait si son contenu déborde, pas le span interne qui peut s'étirer librement.
  const titleRef = useRef<HTMLHeadingElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  // EFFET : DÉTECTION DE L'OVERFLOW 
  // Le useEffect mesure le span de référence, pas le H3 affiché(pour eviter un probleme de double titre apres le changement de taille de la fentre )
  useEffect(() => {
    const container = titleRef.current
    const measure = measureRef.current
    if (!container || !measure) return

    const checkOverflow = () => {
      setIsOverflowing(measure.scrollWidth > container.clientWidth + 1)
    }

    const observer = new ResizeObserver(checkOverflow)
    observer.observe(container)

    return () => observer.disconnect()
  }, [titre])

  // CALCULS DÉRIVÉS
  const fillPercent = postesTotal > 0 ? (postesRestants / postesTotal) * 100 : 0

  const isNeutral = postesRestants === 0

  const isWarning = !isNeutral && postesRestants === 1

  const postesLabel = isNeutral
    ? 'Complet'
    : `${postesRestants} poste${postesRestants > 1 ? 's' : ''} libre${postesRestants > 1 ? 's' : ''}`

  const photoBackground = imgUrl
    ? `url(${imgUrl})`
    : getGradientForCulture(cropType)


  return (
    <Link to={to} className="annonce-card-public">
      {/* Zone photo */}
      <div
        className="annonce-card-public__photo"
        style={{ backgroundImage: photoBackground }}
      />

      {/* Zone contenu */}
      <div className="annonce-card-public__body">
        <h3
          ref={titleRef}
          className={`annonce-card-public__title ${
            isOverflowing ? 'annonce-card-public__title--overflow' : ''
          }`}
        >
          <span className="annonce-card-public__title-track">
            <span className="annonce-card-public__title-text">
              {titre}
            </span>
            {/* On dédouble le texte pour un défilement en boucle continue.
                Ces copies ne sont visibles que pendant l'animation au hover. */}
            {isOverflowing && (
              <>
                <span className="annonce-card-public__title-spacer" />
                <span className="annonce-card-public__title-text" aria-hidden="true">
                  {titre}
                </span>
                <span className="annonce-card-public__title-spacer" />
              </>
            )}
          </span>
          <span ref={measureRef} className="annonce-card-public__title-measure">
            {titre}
          </span>
        </h3>

        {/* icone */}
        <div className="annonce-card-public__meta">
          <svg
            className="annonce-card-public__meta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>{departement}</span>
        </div>

        {/* Jauge de postes, texte + barre de progression */}
        <div className="annonce-card-public__progress">
          <div className="annonce-card-public__progress-text">
            <span
              className={`annonce-card-public__progress-label ${
                isNeutral
                  ? 'annonce-card-public__progress-label--neutral'
                  : isWarning
                    ? 'annonce-card-public__progress-label--warning'
                    : ''
              }`}
            >
              {postesLabel}
            </span>
            <span className="annonce-card-public__progress-total">
              sur {postesTotal}
            </span>
          </div>
          <div className="annonce-card-public__progress-bar">
            <div
              className={`annonce-card-public__progress-fill ${
                isNeutral
                  ? 'annonce-card-public__progress-fill--neutral'
                  : isWarning
                    ? 'annonce-card-public__progress-fill--warning'
                    : ''
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

      </div>
    </Link>
  )
}

export default AnnonceCardPublic