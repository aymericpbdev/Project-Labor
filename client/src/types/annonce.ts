//TYPE ANNONCE 
// Correspond au modèle Prisma : Annonce
// Publiée par une Exploitation (agriculteur)

// ISO 8601 => un format universel pour écrire les dates et heures
// "2026-06-15T08:30:00Z" au lieu de  "15/06/2026" (format français) ou "06/15/2026" (format americain) 

import {
    StatutAnnonce,
    Competences,
    TypeCulture,
    TypeRemuneration,
    TypeHoraire,
  } from './enums'
  import type { Exploitation } from './user'
  import type { Candidature } from './candidature'
  
  interface Annonce {
    id: string
    exploitationId: string
  
    // Contenu
    titre: string
    description: string
    statut: StatutAnnonce
  
    // Poste
    nombreDePostes: number
    competences: Competences[]
    typeCulture: TypeCulture
    typeHoraire: TypeHoraire
  
    // Conditions
    // TODO: à confirmer avec le back prisma utilise decimal, l'API renverra probablement un number ou un string
    remuneration: number
    typeRemuneration: TypeRemuneration
    hebergement: boolean
  
    // Période
    dateDebut: string // ISO 8601
    dateFin: string   // ISO 8601
  
    // Localisation (indépendante de l'exploitation, mais preremplie depuis celle ci)
    ville: string
    codePostal: string | null
    departement: string
  
    // Relations optionnelles incluses selon la réponse API
    exploitation?: Exploitation
    candidatures?: Candidature[]
  
    createdAt: string // ISO 8601
    updatedAt: string // ISO 8601
  }
  
  export type { Annonce }