import { useEffect, useRef, useState } from 'react'

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
  onClick?: () => void
}

// COMPOSANT 
function AnnonceCardPublic({
  titre,
  departement,
  postesRestants,
  postesTotal,
  cropType,
  imgUrl,
  onClick,
}: AnnonceCardPublicProps) {
 
  const titleTextRef = useRef<HTMLSpanElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  // EFFET : DÉTECTION DE L'OVERFLOW 
 // Le useEffect mesure scrollWidth (largeur réelle du texte, y compris ce qui dépasse) vs clientWidth (largeur visible). Si le texte déborde, on ajoute la classe --overflow qui active l'animation au hover

  useEffect(() => {
    const checkOverflow = () => {
      const el = titleTextRef.current
      if (!el) return

      setIsOverflowing(el.scrollWidth > el.clientWidth + 1)
    }
    checkOverflow()

    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [titre])

  // CALCULS DÉRIVÉS

  // Pourcentage de remplissage de la jauge (postes libres / total)
  const fillPercent = postesTotal > 0 ? (postesRestants / postesTotal) * 100 : 0

  // Mode "warning", il ne reste qu'un seul poste => orange au lieu de sage
  const isWarning = postesRestants === 1

  // Singulier/pluriel sur le texte
  const postesLabel = `${postesRestants} poste${postesRestants > 1 ? 's' : ''} libre${postesRestants > 1 ? 's' : ''}`

  // Background : soit l'image fournie, soit le dégradé du cropType
  const photoBackground = imgUrl
    ? `url(${imgUrl})`
    : getGradientForCulture(cropType)


  return (
    <article
      className="annonce-card-public"
      onClick={onClick}
    >
      {/* Zone photo */}
      <div
        className="annonce-card-public__photo"
        style={{ background: photoBackground }}
      />

      {/* Zone contenu */}
      <div className="annonce-card-public__body">
        <h3
          className={`annonce-card-public__title ${
            isOverflowing ? 'annonce-card-public__title--overflow' : ''
          }`}
        >
          <span className="annonce-card-public__title-track">
            <span ref={titleTextRef} className="annonce-card-public__title-text">
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
                isWarning ? 'annonce-card-public__progress-label--warning' : ''
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
                isWarning ? 'annonce-card-public__progress-fill--warning' : ''
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

      </div>
    </article>
  )
}

export default AnnonceCardPublic