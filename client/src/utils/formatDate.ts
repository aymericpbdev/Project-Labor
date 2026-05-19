/* Utilitaires de formatage de dates pour l'affichage en français. Les dates dans le projet sont stockées au format ISO 8601 (convention back).
 Ces helpers convertissent vers des formats lisibles côté UI.
 */



/* Locale et options de formatage utilisées par défaut pour l'affichage court. Ex : "15 juin", "1 sept", "30 août"
 On utilise `Intl.DateTimeFormat` (API native du navigateur) plutôt qu'une librairie type date-fns pour rester sans dépendance externe.
 */
const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  })
  
  // Formate une date ISO 8601 en format court français. @example formatDateShort("2026-06-15T08:30:00Z") → "15 juin" 
  export function formatDateShort(isoString: string): string {
    const date = new Date(isoString)
  
    // Guard : si la string n'est pas une date valide, on renvoie vide
    if (Number.isNaN(date.getTime())) return ''
  
    // Intl ajoute un "." après le mois abrégé ("15 juin." au lieu de "15 juin")
    return SHORT_DATE_FORMATTER.format(date).replace('.', '')
  }
  
  export function formatDateRange(startIso: string, endIso: string): string {
    const start = formatDateShort(startIso)
    const end = formatDateShort(endIso)
  
    if (!start && !end) return ''
    if (!end) return start
    if (!start) return end
  
    return `${start} → ${end}`
  }