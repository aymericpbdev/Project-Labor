// TYPES USER
// Correspond aux modeles Prisma : User + Saisonnier

// Le mot de passe n'est jamais renvoyé par l'API, il est exclu volontairement

// ISO 8601 => un format universel pour écrire les dates et heures
// "2026-06-15T08:30:00Z" au lieu de  "15/06/2026" (format français) ou "06/15/2026" (format americain) 

import { Role, Competences } from './enums'

// USER DE BASE 
// Champs communs à tous les utilisateurs (agriculteur et saisonnier)
interface User {
  id: string
  email: string
  role: Role
  prenom: string
  nom: string
  telephone: string | null

  // Relations optionnelles — incluses selon la réponse API
  exploitation?: Exploitation
  saisonnier?: Saisonnier

  createdAt: string // ISO 8601
  updatedAt: string // ISO 8601
}

// EXPLOITATION (profil agriculteur)
// Relation 1-à-1 avec User, porte les annonces
interface Exploitation {
  id: string
  userId: string
  nomExploitation: string
  siret: string
  ville: string | null
  codePostal: string | null
  departement: string | null
  telephonePro: string | null
}

// SAISONNIER (profil saisonnier)
// Relation 1-à-1 avec User, porte les candidatures
interface Saisonnier {
  id: string
  userId: string
  ville: string | null
  codePostal: string | null
  departement: string | null
  competences: Competences[]
  disponibiliteDebut: string | null // ISO 8601
  disponibiliteFin: string | null   // ISO 8601
}

export type { User, Exploitation, Saisonnier }