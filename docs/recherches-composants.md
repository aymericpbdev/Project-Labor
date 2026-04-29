# Recherche de composants — LABOR

> **Objectif** : Identifier les bibliothèques de composants pour l'UI de LABOR — boutons, navigation, formulaires, cards, statuts, messages d'erreur.

---

## Sommaire

1. [Comparatif des bibliothèques](#comparatif-des-bibliothèques)
2. [Bibliothèques complémentaires](#bibliothèques-complémentaires)
3. [Aperçus visuels](#aperçus-visuels-des-composants)
4. [Composants par cas d'usage](#composants-par-cas-dusage)
   - [Navigation](#navigation)
   - [Authentification](#authentification--user--role)
   - [Profil agriculteur](#profil-agriculteur--farmer--farm)
   - [Profil saisonnier](#profil-saisonnier--seasonalworker)
   - [Annonce](#annonce--joblisting)
   - [Statuts](#statuts--joblistingstatus--applicationstatus)
   - [Candidature](#candidature--application)
   - [Messages d'erreur & alertes](#messages-derreur--alertes)
5. [Recommandations](#recommandations)

---

## Comparatif des bibliothèques

| Bibliothèque | Licence | Type | Style | Lien | GitHub |
|---|---|---|---|---|---|
| **Chakra UI** ✅ | MIT | Composants React modulaires et accessibles | Neutre, entièrement thémable | [chakra-ui.com](https://www.chakra-ui.com/docs/components/) | [chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui) |
| **Ant Design** | MIT | Composants React orientés applis métier | Structuré, professionnel | [ant.design](https://ant.design/components/overview/) | [ant-design/ant-design](https://github.com/ant-design/ant-design) |
| **Material UI** | MIT | Composants React Material Design | Géométrique, 5 variantes par composant | [mui.com](https://mui.com/material-ui/all-components/) | [mui/material-ui](https://github.com/mui/material-ui) |
| **shadcn/ui** | MIT | Composants copiables, basés sur Radix + Tailwind | Headless, theming Tailwind natif | [ui.shadcn.com](https://ui.shadcn.com/docs/components) | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) |
| **Radix UI** | MIT | Primitives headless accessibles | Aucun style par défaut, ARIA complet | [radix-ui.com](https://www.radix-ui.com/primitives/docs/overview/introduction) | [radix-ui/primitives](https://github.com/radix-ui/primitives) |
| **React Aria (Adobe)** | Apache 2.0 | Composants accessibles orientés mobile | Headless, gestion native des formats FR | [react-spectrum.adobe.com](https://react-spectrum.adobe.com/react-aria/index.html) | [adobe/react-spectrum](https://github.com/adobe/react-spectrum) |

---

## Bibliothèques complémentaires

### shaden/ui

shaden/ui ne s'installe pas comme une dépendance : les composants sont copiés directement dans le code et adaptés librement. Le style est défini uniquement via Tailwind CSS, ce qui donne un contrôle total sur les couleurs LABOR (Fern, Golden Orange…). Particulièrement fort sur les composants `Combobox` (idéal pour le champ `skills[]` du saisonnier), `Select` (pour `cropType`, `workSchedule`, `paymentType`), et `Date Picker`.

### Radix UI

Radix UI est la base sur laquelle shaden/ui est construit. Il peut être utilisé seul pour construire des composants sur-mesure avec le style LABOR. Zéro style par défaut, accessibilité ARIA complète. Très utile pour les composants complexes comme `Select`, `Dialog`, `Tabs` (navigation entre Farmer/SeasonalWorker), `Toggle Group` (sélection du `WorkSchedule` ou du `Role`).

### React Aria Components (Adobe)

Conçu par Adobe pour des applis terrain avec des utilisateurs très variés, ce qui colle aux valeurs **Simplicité** et **Proximité** de LABOR. Le `DateRangePicker` est particulièrement soigné (meilleur que celui d'Ant Design sur mobile) et gère nativement les formats de dates français. Utile pour `availabilityStart`/`availabilityEnd` côté saisonnier et `startDate`/`endDate` côté annonce.

| Bibliothèque | Licence | Pourquoi pour LABOR |
|---|---|---|
| **shadcn/ui** | MIT | Theming Tailwind natif, Combobox skills, Select enums |
| **Radix UI** | MIT | Primitives headless pour composants sur-mesure |
| **React Aria** | Apache 2.0 | DateRangePicker mobile FR, accessibilité maximale |

---

## Aperçus visuels des composants

> Chaque capture montre les trois variantes côte à côte : **Chakra UI** (teal), **Ant Design** (bleu), **Material UI** (bleu foncé / underline).

---

### Input texte

Champ de saisie libre. Chakra affiche une bordure arrondie teal au focus. Ant Design adopte un contour bleu fin. MUI utilise un label flottant animé au-dessus de la ligne de soulignement.

![Input texte — Chakra UI, Ant Design, MUI](composants-ui/input-texte.png)

---

### Input password

Variante du champ texte avec masquage du mot de passe et icône œil pour basculer la visibilité. Les trois libs le proposent nativement.

![Authentification — Input Password](composants-ui/authentification-input-password.png)

---

### Authentification — Input Email

Champ email utilisé à l'inscription et à la connexion. Même rendu visuel que l'input texte, avec validation du format email côté navigateur.

![Authentification — Input Email](composants-ui/authentification-input-email.png)

---

### Select

Menu déroulant pour les champs à choix unique (`cropType`, `paymentType`…). Chakra et Ant Design affichent une boîte avec flèche. MUI utilise la ligne de soulignement caractéristique du Material Design.

![Select — Chakra UI, Ant Design, MUI](composants-ui/select.png)

---

### Annonce — Select Multiple (workSchedule)

Select permettant de cocher plusieurs options simultanément. Utilisé pour `workSchedule` (FullTime, Night, Weekend…). Ant Design et MUI proposent une variante `multiple` native très complète.

![Select Multiple — workSchedule](composants-ui/annonce-select-multiple-workschedule.png)

---

### Switch — Logement inclus

Bouton bascule On/Off pour le champ `housingProvided`. Chakra et Ant Design affichent un switch horizontal coloré. MUI propose un style plus petit avec un cercle proéminent.

![Switch — Chakra UI, Ant Design, MUI](composants-ui/switch.png)

---

### Radio group — Choix du rôle

Sélection exclusive entre `Farmer` et `SeasonalWorker` à l'inscription. Chaque lib propose un style de bouton radio distinct, tous accessibles au clavier et compatibles ARIA.

![Radio group — Chakra UI, Ant Design, MUI](composants-ui/radio-group.png)

---

### Checkbox groupe — Compétences (skills[])

Sélection multiple des compétences du saisonnier (`Harvesting`, `Viticulture`, `Driving`…). Chaque case peut être cochée/décochée indépendamment.

![Checkbox groupe — Chakra UI, Ant Design, MUI](composants-ui/checkbox-groupe.png)

---

### Profil Saisonnier — Checkbox skills[] (détail)

Vue dédiée au profil saisonnier avec disposition en grille des compétences disponibles.

![Profil Saisonnier — Checkbox skills[]](composants-ui/profil-saisonnier-checkbox-skills.png)

---

### Statuts — Badge / Tag / Chip

Pastilles colorées indiquant le statut d'une annonce (`Draft`, `Active`, `Closed`) ou d'une candidature (`Pending`, `UnderReview`, `Accepted`, `Rejected`). Code couleur : vert = actif/accepté, orange = en attente, rouge = refusé, gris = fermé/brouillon, bleu = en cours.

![Statuts — Chakra UI, Ant Design, MUI](composants-ui/statuts--badge---tag---chip.png)

---

### Alertes

Bandeaux informatifs contextuels en trois niveaux : **erreur** (rouge, validation / erreur API), **succès** (vert, confirmation d'action), **info** (bleu, message contextuel). Présents dans les trois libs.

![Alertes — Chakra UI, Ant Design, MUI](composants-ui/alertes.png)

---

### Modal — Confirmation de candidature

Fenêtre de dialogue modale pour confirmer ou retirer une candidature. Contient un titre, un message de confirmation, et deux boutons (Annuler / Confirmer). Chakra utilise `Dialog`, Ant Design `Modal`, MUI `Dialog`.

![Modal — Chakra UI, Ant Design, MUI](composants-ui/modal--confirmation-de-candidature.png)

---

### Toast / Notification éphémère

Notification courte qui apparaît en bas ou en haut de l'écran pendant quelques secondes. Utilisée pour les retours d'action (candidature envoyée, profil mis à jour…). Chakra : `useToast`. Ant Design : `message`. MUI : `Snackbar`.

![Toast — Chakra UI, Ant Design, MUI](composants-ui/toast---notification-éphémère.png)

---

### DatePicker Range — startDate / endDate

Sélecteur de période avec date de début et date de fin dans un seul composant. Utilisé pour les dates de mission côté annonce, et les disponibilités côté saisonnier. Ant Design propose le `RangePicker` le plus complet. MUI Date Pickers X est puissant mais nécessite une licence pro pour certaines fonctionnalités avancées.

![DatePicker range — Ant Design, MUI](composants-ui/datepicker-range--startdate---enddate.png)

---

### Profil Saisonnier — DatePicker Range (availabilityStart / End)

Vue dédiée au contexte saisonnier : sélection de la plage de disponibilité. Mêmes composants que ci-dessus, contexte différent.

![DatePicker — availabilityStart / availabilityEnd](composants-ui/profil-saisonnier-datepicker-range-availabilitystart-end.png)

---

### Input nombre — numberOfPositions

Champ numérique avec boutons +/− pour saisir le nombre de postes disponibles. Chakra : `NumberInput`. Ant Design : `InputNumber`. MUI : `TextField` avec `type="number"`.

![Input nombre — Chakra UI, Ant Design, MUI](composants-ui/input-nombre--numberofpositions.png)

---

### Input montant — payAmount + paymentType

Champ de saisie du salaire combiné à un select pour la périodicité (`Hourly`, `Weekly`, `Monthly`). Rendu en groupe inline : montant à gauche, type de paiement à droite.

![Input montant — Chakra UI, Ant Design, MUI](composants-ui/input-montant--payamount-+-paymenttype.png)

---

### Profil Agriculteur — Input texte (farmName, siret…)

Champs texte spécifiques au profil agriculteur : nom de l'exploitation, SIRET, téléphone professionnel, ville, code postal, département.

![Profil Agriculteur — Input texte](composants-ui/profil-agriculteur-input-texte-farmname-siret.png)

---

### Profil Agriculteur — Card exploitation (Farm)

Card affichant le résumé d'une exploitation agricole : nom, localisation, type de culture, et lien vers les annonces associées.

![Card exploitation — Farm](composants-ui/profil-agriculteur-card-exploitation-farm.png)

---

### Card — Annonce / Candidature

Card de résumé pour une `JobListing` dans les résultats de recherche. Contient : titre du poste, exploitation, localisation, dates, salaire, statut et bouton d'action. Même structure pour une `Application` dans la liste des candidatures.

![Card — Chakra UI, Ant Design, MUI](composants-ui/card--annonce---candidature.png)

---

### Annonce — Card JobListing (détail)

Vue dédiée avec toutes les informations de l'annonce : skills requis, logement inclus, nombre de postes, type de contrat.

![Annonce — Card JobListing](composants-ui/annonce-card-joblisting.png)

---

### Candidature — Card Application

Card récapitulative d'une candidature avec statut coloré, nom de l'annonce, exploitation, et date de candidature.

![Card Application](composants-ui/candidature-card-application.png)

---

### Bottom navigation — Mobile

Barre de navigation en bas d'écran pour mobile avec 3 à 4 onglets (Home / Offres / Profil). MUI propose le composant `BottomNavigation` le plus natif. Chakra utilise `Tabs`. Ant Design utilise `Menu`.

![Bottom navigation — Chakra UI, Ant Design, MUI](composants-ui/bottom-navigation--mobile.png)

---

### Top bar — En-tête de page

Barre supérieure avec bouton retour, titre de la page courante, et action optionnelle à droite. MUI : `AppBar`. Ant Design : `PageHeader` (déprécié v5, remplacé par layout custom).

![Top bar](composants-ui/top-bar.png)

---

### Breadcrumb

Fil d'Ariane pour la navigation hiérarchique : `Accueil > Offres > Détail annonce`. Les trois libs le proposent nativement avec un séparateur configurable.

![Breadcrumb — Chakra UI, Ant Design, MUI](composants-ui/breadcrumb.png)

---

## Composants par cas d'usage

### Navigation

| Composant | Usage dans LABOR | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| Bottom Navigation | Navbar mobile — Home / Offres / Profil | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/tabs) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/menu/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-bottom-navigation/) |
| Top Bar | En-tête avec retour et titre de page | — | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/page-header/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-app-bar/) |
| Breadcrumb | Accueil > Offres > Détail annonce | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/breadcrumb) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/breadcrumb/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-breadcrumbs/) |

---

### Authentification — `User` / `Role`

| Composant | Usage dans LABOR | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| Input email | Champ `email` à l'inscription / connexion | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/input) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Input password | Champ `passwordHash` à la connexion | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/input) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Radio group | Choix du rôle `Farmer` / `SeasonalWorker` | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/radio) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/radio/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-radio-button/) |

---

### Profil agriculteur — `Farmer` / `Farm`

| Composant | Usage dans LABOR | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| Input texte | `farmName`, `siret`, `proPhoneNumber` | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/input) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Input texte | `city`, `postalCode`, `departement` | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/input) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Card exploitation | Affichage d'une `Farm` avec ses annonces | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/card) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/card/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-card/) |

---

### Profil saisonnier — `SeasonalWorker`

| Composant | Usage dans LABOR | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| Input texte | `city`, `postalCode`, `departement` | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/input) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Checkbox groupe | Sélection des `skills[]` (Harvesting, Viticulture…) | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/checkbox) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/checkbox/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-checkbox/) |
| DatePicker range | `availabilityStart` / `availabilityEnd` | — (lib externe) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/date-picker/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/x/react-date-pickers/date-range-picker/) |

---

### Annonce — `JobListing`

| Composant | Usage dans LABOR | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| Input texte | `jobTitle`, `description` | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/textarea) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Select | `cropType` — Cereals, Fruits, Vineyard… | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/select) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/select/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-select/) |
| Select multiple | `workSchedule` — FullTime, Night, Weekend… | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/select) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/select/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-select/) |
| Checkbox groupe | `skills[]` requis pour le poste | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/checkbox) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/checkbox/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-checkbox/) |
| Input nombre | `numberOfPositions` | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/number-input) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input-number/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Input montant | `payAmount` + `paymentType` (Hourly / Weekly / Monthly) | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/input) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/input/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-text-field/) |
| Switch | `housingProvided` — logement inclus | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/switch) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/switch/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-switch/) |
| DatePicker range | `startDate` / `endDate` de la mission | — (lib externe) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/date-picker/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/x/react-date-pickers/date-range-picker/) |
| Card annonce | Résumé d'une `JobListing` dans les résultats | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/card) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/card/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-card/) |

---

### Statuts — `JobListingStatus` / `ApplicationStatus`

| Statut | Composant recommandé | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| `Draft` | Badge / Tag neutre | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/badge) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/tag/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-chip/) |
| `Active` | Badge / Tag vert | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/badge) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/tag/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-chip/) |
| `Closed` | Badge / Tag gris | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/badge) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/tag/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-chip/) |
| `Pending` | Badge / Tag orange | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/badge) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/tag/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-chip/) |
| `UnderReview` | Badge / Tag bleu | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/badge) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/tag/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-chip/) |
| `Accepted` | Badge / Tag vert | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/badge) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/tag/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-chip/) |
| `Rejected` | Badge / Tag rouge | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/badge) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/tag/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-chip/) |

---

### Candidature — `Application`

| Composant | Usage dans LABOR | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| Card candidature | Récapitulatif d'une `Application` dans la liste | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/card) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/card/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-card/) |
| Modal confirmation | Confirmation ou retrait de candidature | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/dialog) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/modal/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-dialog/) |

---

### Messages d'erreur & alertes

| Composant | Usage dans LABOR | Chakra | Ant Design | MUI |
|---|---|---|---|---|
| Alerte erreur | Erreur de validation / API | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/alert) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/alert/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-alert/) |
| Alerte succès | Confirmation d'action réussie | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/alert) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/alert/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-alert/) |
| Alerte info | Message informatif contextuel | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/alert) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/alert/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-alert/) |
| Toast | Notifications éphémères | [![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=flat&logo=chakraui&logoColor=white)](https://www.chakra-ui.com/docs/components/toaster) | [![Ant Design](https://img.shields.io/badge/Ant%20Design-1677FF?style=flat&logo=antdesign&logoColor=white)](https://ant.design/components/message/) | [![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/material-ui/react-snackbar/) |

---

## Recommandations

### Recommandation 1 — Chakra UI ✅

Chakra UI dispose d'un fichier de configuration unique où l'on peut définir une seule fois toutes les règles visuelles de LABOR — les couleurs, les polices, les coins arrondis. Une fois ce fichier rempli, tous les composants de l'app les appliquent automatiquement sans répétition dans le code. L'accessibilité est intégrée par défaut, ce qui est important pour une app terrain destinée à des publics variés (maraîchers, étudiants, saisonniers, etc).

### Recommandation 2 — Ant Design (DatePicker uniquement)

Ant Design est retenu uniquement pour un composant : le sélecteur de dates. C'est central dans LABOR puisque les deux côtés de la plateforme en ont besoin — l'agriculteur indique quand il a besoin de main d'œuvre, et le saisonnier indique sa disponibilité. Ant Design propose un `RangePicker` qui permet de sélectionner une période avec un début et une fin en un seul composant.