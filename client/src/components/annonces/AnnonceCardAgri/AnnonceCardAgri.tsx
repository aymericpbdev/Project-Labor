import { useEffect, useRef, useState } from 'react'

import { getGradientForCulture } from '../../../utils/cultureGradient'
import { formatDateRange } from '../../../utils/formatDate'
import { JobListingStatus } from '../../../types'
import type { CropType, JobListingStatus as JobListingStatusType } from '../../../types'

import './AnnonceCardAgri.css'

type AnnonceCardAgriProps = {
  titre: string
  cropType: CropType
  dateDebut: string                 // ISO 8601
  dateFin: string                   // ISO 8601
  postesTotal: number
  postesPourvus: number
  statut: JobListingStatusType
  candidaturesTotal: number
  candidaturesEnAttente?: number
  imgUrl?: string
  onClick?: () => void
}

const STATUS_LABELS: Record<JobListingStatusType, string> = {
  [JobListingStatus.Draft]: 'Brouillon',
  [JobListingStatus.Active]: 'Publiée',
  [JobListingStatus.Closed]: 'Clôturée',
}

function AnnonceCardAgri({
  titre,
  cropType,
  dateDebut,
  dateFin,
  postesTotal,
  postesPourvus,
  statut,
  candidaturesTotal,
  candidaturesEnAttente = 0,
  imgUrl,
  onClick,
}: AnnonceCardAgriProps) {
  // Ref sur le H3 (le conteneur en overflow:hidden) : c'est lui qui sait si son contenu déborde, pas le span interne qui peut s'étirer librement.
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
  
    const checkOverflow = () => {
      setIsOverflowing(el.scrollWidth > el.clientWidth + 1)
    }
    const observer = new ResizeObserver(checkOverflow)
    observer.observe(el)
  
    return () => observer.disconnect()
  }, [titre])

  // CALCULS DÉRIVÉS

  // Pourcentage de remplissage de la jauge (postes pourvus, pas restants)
  const fillPercent = postesTotal > 0 ? (postesPourvus / postesTotal) * 100 : 0

  const isDraft = statut === JobListingStatus.Draft
  const isClosed = statut === JobListingStatus.Closed
  const isActive = statut === JobListingStatus.Active

  // Notif pill : visible uniquement si Active ET en attente > 0 (sur Draft pas de candidatures, sur Closed on masque)
  const showNotifPill = isActive && candidaturesEnAttente > 0

  // Format dates en français
  const dateRange = formatDateRange(dateDebut, dateFin)

  const photoBackground = imgUrl
    ? `url(${imgUrl})`
    : getGradientForCulture(cropType)

  const postesLabel = `${postesPourvus} poste${postesPourvus > 1 ? 's' : ''} pourvu${postesPourvus > 1 ? 's' : ''}`
  const totalCandLabel = `${candidaturesTotal} candidature${candidaturesTotal > 1 ? 's' : ''} reçue${candidaturesTotal > 1 ? 's' : ''}`

  const cardClasses = [
    'annonce-card-agri',
    isDraft && 'annonce-card-agri--draft',
    isClosed && 'annonce-card-agri--closed',
  ]
    .filter(Boolean)
    .join(' ')

  // RENDU

  return (
    <article className={cardClasses} onClick={onClick}>

      {/* ZONE PHOTO*/}
      <div
        className="annonce-card-agri__photo"
        style={{ background: photoBackground }}
      >
        {/* Badge statut */}
        <div className={`annonce-card-agri__status annonce-card-agri__status--${statut.toLowerCase()}`}>
          <span className="annonce-card-agri__status-dot" />
          {STATUS_LABELS[statut]}
        </div>

        {/* Notif pill */}
        {showNotifPill && (
          <div className="annonce-card-agri__notif">
            <svg
              className="annonce-card-agri__notif-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span className="annonce-card-agri__notif-count">
              {candidaturesEnAttente}
            </span>
            <span>en attente</span>
          </div>
        )}
      </div>

      {/*ZONE CONTENU */}
      <div className="annonce-card-agri__body">

        {/* Titre */}
        <h3
          ref={titleRef}
          className={`annonce-card-agri__title ${
            isOverflowing ? 'annonce-card-agri__title--overflow' : ''
          }`}
        >
          <span className="annonce-card-agri__title-track">
            <span className="annonce-card-agri__title-text">
              {titre}
            </span>
            {isOverflowing && (
              <>
                <span className="annonce-card-agri__title-spacer" />
                <span className="annonce-card-agri__title-text" aria-hidden="true">
                  {titre}
                </span>
                <span className="annonce-card-agri__title-spacer" />
              </>
            )}
          </span>
        </h3>

        {/* Période */}
        <div className="annonce-card-agri__meta">
          <svg
            className="annonce-card-agri__meta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 3v4M16 3v4" />
          </svg>
          <span>{dateRange}</span>
        </div>

        <div className="annonce-card-agri__divider" />

        {/* Jauge postes pourvus */}
        <div className="annonce-card-agri__progress">
          <div className="annonce-card-agri__progress-text">
            <span className="annonce-card-agri__progress-label">
              {postesLabel}
            </span>
            <span className="annonce-card-agri__progress-total">
              sur {postesTotal}
            </span>
          </div>
          <div className="annonce-card-agri__progress-bar">
            <div
              className="annonce-card-agri__progress-fill"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        {/* Ligne candidatures (total) */}
        <div className="annonce-card-agri__candidatures">
          <svg
            className="annonce-card-agri__candidatures-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="9" cy="8" r="3.5" />
            <path d="M3 21c0-3.5 2.7-6 6-6s6 2.5 6 6" />
            <circle cx="17" cy="9" r="2.5" />
            <path d="M15 21c0-2.8 2-5 4-5s2 1 2 2" />
          </svg>
          {isDraft ? (
            <span className="annonce-card-agri__candidatures-empty">
              Non publiée
            </span>
          ) : (
            <span>{totalCandLabel}</span>
          )}
        </div>

      </div>
    </article>
  )
}


export default AnnonceCardAgri