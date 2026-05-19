import { CropType } from '../types'

type CropTypeOrNull = CropType | string | null | undefined

// DÉGRADÉS PAR TYPE DE CULTURE 
/* Chaque type de culture a un dégradé qui évoque visuellement sa nature, ces dégradés remplacent les vraies photos le tant qu'on en choisissent, et qu'on tranche sur leurs utilisation ou nn */
const CULTURE_GRADIENTS: Record<CropType, string> = {
  // Pommes, poires : tons rouges/dorés
  [CropType.Fruits]:
    'linear-gradient(135deg, #c8b56e 0%, #a8444c 70%, #6b2e34 100%)',

  // Vigne : pourpres profonds
  [CropType.Vineyard]:
    'linear-gradient(135deg, #8b5a8c 0%, #5a3a6f 70%, #2e1f3b 100%)',

  // Légumes : verts sage qui rappellent la charte
  [CropType.Vegetables]:
    'linear-gradient(135deg, #b9c79e 0%, #7A9E50 60%, #4a6b2c 100%)',

  // Maraîchage : variation plus claire du sage
  [CropType.MarketGardening]:
    'linear-gradient(135deg, #c5d4a8 0%, #8aae5c 60%, #5a7a3a 100%)',

  // Oliviers : verts olive
  [CropType.OliveTrees]:
    'linear-gradient(135deg, #b8c178 0%, #889e4a 70%, #525e2a 100%)',

  // Céréales : dorés/jaunes
  [CropType.Cereals]:
    'linear-gradient(135deg, #f0d790 0%, #d4a73a 60%, #8a6a18 100%)',

  // Grandes cultures : variation plus terre/ocre
  [CropType.FieldCrops]:
    'linear-gradient(135deg, #e0c890 0%, #b89548 60%, #6e5418 100%)',

  // Horticulture : roses/floraux
  [CropType.Horticulture]:
    'linear-gradient(135deg, #f0c0d0 0%, #d488a0 60%, #8a4a60 100%)',

  // Élevage : tons terre/brun
  [CropType.Livestock]:
    'linear-gradient(135deg, #c2b08e 0%, #8a6a48 60%, #4e3c28 100%)',
}

// DÉGRADÉ DE SECOURS 
/* Utilisé quand le cropType est inconnu, null, ou non fourni, reprend les tons sage de la charte pour rester cohérent avec l'identité */
const FALLBACK_GRADIENT =
  'linear-gradient(135deg, #b9c79e 0%, #7A9E50 60%, #4a6b2c 100%)'

// FONCTION PRINCIPALE 
export function getGradientForCulture(cropType: CropTypeOrNull): string {
  if (!cropType) return FALLBACK_GRADIENT

  const gradient = CULTURE_GRADIENTS[cropType as CropType]
  return gradient ?? FALLBACK_GRADIENT
}