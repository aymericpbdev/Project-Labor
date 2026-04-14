// ENUMS PARTAGÉS 
// Alignés avec le schéma Prisma (server/prisma/schema.prisma)
// On utilise des objets `as const` au lieu de `enum` TypeScript car le projet a `erasableSyntaxOnly` activé (config Vite/ESBuild)

export const Role = {
    Agriculteur: 'Agriculteur',
    Saisonnier: 'Saisonnier',
  } as const
  
  export type Role = (typeof Role)[keyof typeof Role]
  
  export const StatutAnnonce = {
    Brouillon: 'Brouillon',
    Active: 'Active',
    Cloturee: 'Cloturee',
  } as const
  
  export type StatutAnnonce = (typeof StatutAnnonce)[keyof typeof StatutAnnonce]
  
  export const StatutCandidature = {
    EnAttente: 'EnAttente',
    EnCoursEvaluation: 'EnCoursEvaluation',
    Acceptee: 'Acceptee',
    Refusee: 'Refusee',
  } as const
  
  export type StatutCandidature = (typeof StatutCandidature)[keyof typeof StatutCandidature]
  
  export const Competences = {
    Recolte: 'Recolte',
    Plantation: 'Plantation',
    Viticulture: 'Viticulture',
    Elevage: 'Elevage',
    ConduiteEngins: 'ConduiteEngins',
    Traite: 'Traite',
    Arboriculture: 'Arboriculture',
    Maraichage: 'Maraichage',
  } as const
  
  export type Competences = (typeof Competences)[keyof typeof Competences]
  
  export const TypeCulture = {
    Cereales: 'Cereales',
    Fruits: 'Fruits',
    Legumes: 'Legumes',
    Vigne: 'Vigne',
    Oliviers: 'Oliviers',
    Horticulture: 'Horticulture',
    Elevage: 'Elevage',
    Maraichage: 'Maraichage',
    GrandesCultures: 'GrandesCultures',
  } as const
  
  export type TypeCulture = (typeof TypeCulture)[keyof typeof TypeCulture]
  
  export const TypeRemuneration = {
    ParHeure: 'ParHeure',
    ParSemaine: 'ParSemaine',
    ParMois: 'ParMois',
  } as const
  
  export type TypeRemuneration = (typeof TypeRemuneration)[keyof typeof TypeRemuneration]
  
  export const TypeHoraire = {
    TempsPlein: 'TempsPlein',
    TempsPartiel: 'TempsPartiel',
    Journee: 'Journee',
    Nuit: 'Nuit',
    WeekEnd: 'WeekEnd',
    Flexible: 'Flexible',
  } as const
  
  export type TypeHoraire = (typeof TypeHoraire)[keyof typeof TypeHoraire]