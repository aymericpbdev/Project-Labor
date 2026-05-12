import { useEffect, useRef, useState } from 'react'

import { getGradientForCulture } from '../../../utils/cultureGradient'
import { formatDateRange } from '../../../utils/formatDate'
import { JobListingStatus, PaymentType } from '../../../types'
import type {
  CropType,
  JobListingStatus as JobListingStatusType,
  PaymentType as PaymentTypeType,
} from '../../../types'

import './AnnonceCardSaison.css'

// TYPES
type AnnonceCardSaisonProps = {
  titre: string
  cropType: CropType
  ville: string
  departement: string
  dateDebut: string                 // ISO 8601
  dateFin: string                   // ISO 8601
  hebergement: boolean
  payAmount: number
  paymentType: PaymentTypeType
  postesRestants: number
  postesTotal: number
  statut: JobListingStatusType
  imgUrl?: string
  onClick?: () => void
}

const PAYMENT_LABELS: Record<PaymentTypeType, string> = {
  [PaymentType.Hourly]: '/ heure',
  [PaymentType.Weekly]: '/ semaine',
  [PaymentType.Monthly]: '/ mois',
}

function AnnonceCardSaison({
  titre,
  cropType,
  ville,
  departement,
  dateDebut,
  dateFin,
  hebergement,
  payAmount,
  paymentType,
  postesRestants,
  postesTotal,
  statut,
  imgUrl,
  onClick,
}: AnnonceCardSaisonProps) {

  const titleRef = useRef<HTMLHeadingElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

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

  const isWarning = postesRestants === 1

  const isClosed = statut === JobListingStatus.Closed

  const dateRange = formatDateRange(dateDebut, dateFin)

  const photoBackground = imgUrl
    ? `url(${imgUrl})`
    : getGradientForCulture(cropType)

  const postesLabel = `${postesRestants} poste${postesRestants > 1 ? 's' : ''} libre${postesRestants > 1 ? 's' : ''}`

  const payFormatted = payAmount.toLocaleString('fr-FR')

  const cardClasses = [
    'annonce-card-saison',
    isClosed && 'annonce-card-saison--closed',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={cardClasses} onClick={onClick}>

      {/*ZONE PHOTO */}
      <div
        className="annonce-card-saison__photo"
        style={{ background: photoBackground }}
      >
        {/* Badge statut closed uniqueent*/}
        {isClosed && (
          <div className="annonce-card-saison__status annonce-card-saison__status--closed">
            <span className="annonce-card-saison__status-dot" />
            Clôturée
          </div>
        )}
      </div>

      {/* ZONE CONTENU */}
      <div className="annonce-card-saison__body">

        {/* Titre avec marque */}
        <h3
          ref={titleRef}
          className={`annonce-card-saison__title ${
            isOverflowing ? 'annonce-card-saison__title--overflow' : ''
          }`}
        >
          <span className="annonce-card-saison__title-track">
            <span className="annonce-card-saison__title-text">
              {titre}
            </span>
            {isOverflowing && (
              <>
                <span className="annonce-card-saison__title-spacer" />
                <span className="annonce-card-saison__title-text" aria-hidden="true">
                  {titre}
                </span>
                <span className="annonce-card-saison__title-spacer" />
              </>
            )}
          </span>
          <span ref={measureRef} className="annonce-card-agri__title-measure">
            {titre}
          </span>
        </h3>

        {/* Ville + département */}
        <div className="annonce-card-saison__meta">
          <svg
            className="annonce-card-saison__meta-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>{ville}, {departement}</span>
        </div>

        {/* Période */}
        <div className="annonce-card-saison__meta">
          <svg
            className="annonce-card-saison__meta-icon"
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

        <div className="annonce-card-saison__divider" />

        {/* Rémunération + tag hébergement */}
        <div className="annonce-card-saison__bottom-row">
          <div className="annonce-card-saison__pay">
            <span className="annonce-card-saison__pay-amount">
              {payFormatted} €
            </span>
            <span className="annonce-card-saison__pay-unit">
              {PAYMENT_LABELS[paymentType]}
            </span>
          </div>

          {/* Tag hébergement */}
          {hebergement && (
            <span className="annonce-card-saison__tag">
              <svg
                className="annonce-card-saison__tag-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z" />
              </svg>
              Hébergement possible
            </span>
          )}
        </div>

        {/* Jauge de postes libres */}
        <div className="annonce-card-saison__progress">
          <div className="annonce-card-saison__progress-text">
            <span
              className={`annonce-card-saison__progress-label ${
                isWarning ? 'annonce-card-saison__progress-label--warning' : ''
              }`}
            >
              {postesLabel}
            </span>
            <span className="annonce-card-saison__progress-total">
              sur {postesTotal}
            </span>
          </div>
          <div className="annonce-card-saison__progress-bar">
            <div
              className={`annonce-card-saison__progress-fill ${
                isWarning ? 'annonce-card-saison__progress-fill--warning' : ''
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

      </div>
    </article>
  )
}

export default AnnonceCardSaison