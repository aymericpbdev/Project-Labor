// TYPE CANDIDATURE

// Correspond au modèle Prisma : Candidature
// Lie un Saisonnier à une Annonce
// Contrainte Prisma : un saisonnier ne peut candidater qu'une fois par annonce (@@unique)

// ISO 8601 => un format universel pour écrire les dates et heures
// "2026-06-15T08:30:00Z" au lieu de  "15/06/2026" (format français) ou "06/15/2026" (format americain) 

import { StatutCandidature } from './enums'
import type { Annonce } from './annonce'
import type { Saisonnier } from './user'

interface Candidature {
  id: string
  annonceId: string
  saisonnierId: string

  // Contenu
  messageMotivation: string
  statut: StatutCandidature

  // Relations optionnelles incluses selon la réponse API
  annonce?: Annonce
  saisonnier?: Saisonnier

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

export type { Candidature }