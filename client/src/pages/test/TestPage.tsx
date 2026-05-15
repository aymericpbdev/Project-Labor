import { useState } from 'react'

import Button from '../../components/ui/Button/Button'
import Badge from '../../components/ui/Badge/Badge'
import Tag from '../../components/ui/Tag/Tag'
import type { Skill } from '../../types'
import { Skill as SkillEnum } from '../../types'
import AlertBanner from '../../components/ui/AlertBanner/AlertBanner'
import LinkText from '../../components/ui/LinkText/LinkText'
import { LaborInput } from '../../components/ui/Input/input'
import  LaborTextarea  from '../../components/ui/Textarea/textarea'
import LaborMultiSelect from '../../components/ui/Select/select'
import LaborCheckbox from '../../components/ui/Checkbox/checkbox'
import AnnonceCardPublic from '../../components/annonces/AnnonceCardPublic/AnnonceCardPublic'
import AnnonceCardAgri from '../../components/annonces/AnnonceCardAgri/AnnonceCardAgri'
import AnnonceCardSaison from '../../components/annonces/AnnonceCardSaison/AnnonceCardSaison'



function TestPage() {

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([
    SkillEnum.MarketGardening,
    SkillEnum.Planting,
  ])

  const [textareaValue, setTextareaValue] = useState('')

  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const [checkedValues, setCheckedValues] = useState<string[]>([])
const [checkedValuesLabor, setCheckedValuesLabor] = useState<string[]>([])

  // Toggle une skill dans la liste
  function handleToggle(skill: Skill) {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const allSkills = Object.values(SkillEnum)

  const skillOptions = [
    { value: 'Skill_Harvesting', label: 'Vendange' },
    { value: 'Skill_Planting', label: 'Plantation' },
    { value: 'Skill_Viticulture', label: 'Viticulture' },
    { value: 'Skill_Livestock', label: 'Élevage' },
    { value: 'Skill_MachineOperation', label: "Conduite d'engins" },
    { value: 'Skill_Milking', label: 'Traite' },
    { value: 'Skill_Arboriculture', label: 'Arboriculture' },
    { value: 'Skill_MarketGardening', label: 'Maraîchage' },
]

const annoncesMock = [
  { titre: 'Castrage maïs', departement: 'Landes', postesRestants: 2, cropType: 'Crop_Cereals' as const },
  { titre: 'Récolte de tomates', departement: 'Tarn-et-Garonne', postesRestants: 0, cropType: 'Crop_Vegetables' as const },
  { titre: 'Cueillette de prunes', departement: 'Lot-et-Garonne', postesRestants: 1, cropType: 'Crop_Fruits' as const },
  { titre: 'Betails', departement: 'Gers', postesRestants: 3, cropType: 'Crop_Livestock' as const },
  { titre: 'Taille de vigne', departement: 'Hérault', postesRestants: 5, cropType: 'Crop_Vineyard' as const },
]

    return (
      <div>
        <h1>Accueil — Labor</h1>
        <Button variant='outline' size='l'> agriiiiiii</Button>
        <Button variant='secondary' size='s'>saisooooo</Button>
        <Button variant='danger' size='l'>warnig</Button>
        <Button variant='primary' size='m'>Connexion</Button>

        <h2 style={{ marginTop: '2rem' }}>Vue publique (AnnonceCardPublic)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginTop: '0.75rem',
          }}
        >
          {annoncesMock.slice(0, 4).map((annonce) => (
            <AnnonceCardPublic
              key={annonce.titre}
              titre={annonce.titre}
              departement={annonce.departement}
              postesRestants={annonce.postesRestants}
              postesTotal={5}
              cropType={annonce.cropType}
              to="#"
            />
          ))}
        </div>

        <h2 style={{ marginTop: '2rem' }}>Vue agriculteur (AnnonceCardAgri)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginTop: '0.75rem',
          }}
        >
          <AnnonceCardAgri
            titre="Cueilleur de pommes"
            cropType="Crop_Fruits"
            dateDebut="2026-06-15T08:30:00Z"
            dateFin="2026-08-30T08:30:00Z"
            postesTotal={4}
            postesPourvus={2}
            statut="Active"
            candidaturesTotal={8}
            candidaturesEnAttente={3}
            to="#"
          />

          <AnnonceCardAgri
            titre="Aide vendanges Bordelais saison 2026"
            cropType="Crop_Vineyard"
            dateDebut="2026-09-01T08:30:00Z"
            dateFin="2026-10-15T08:30:00Z"
            postesTotal={6}
            postesPourvus={5}
            statut="Active"
            candidaturesTotal={12}
            to="#"
          />

          <AnnonceCardAgri
            titre="Maraîchage été"
            cropType="Crop_MarketGardening"
            dateDebut="2026-06-10T08:30:00Z"
            dateFin="2026-09-30T08:30:00Z"
            postesTotal={5}
            postesPourvus={0}
            statut="Draft"
            candidaturesTotal={0}
            to="#"
          />

          <AnnonceCardAgri
            titre="Récolte oliviers Provence"
            cropType="Crop_OliveTrees"
            dateDebut="2025-10-01T08:30:00Z"
            dateFin="2025-11-20T08:30:00Z"
            postesTotal={8}
            postesPourvus={8}
            statut="Closed"
            candidaturesTotal={23}
            to="#"
          />
        </div>

        <h2 style={{ marginTop: '2rem' }}>Vue saisonnier (AnnonceCardSaison)</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginTop: '0.75rem',
          }}
        >
          <AnnonceCardSaison
            titre="Cueilleur de pommes"
            cropType="Crop_Fruits"
            ville="Montauban"
            departement="Tarn-et-Garonne"
            dateDebut="2026-06-15T08:30:00Z"
            dateFin="2026-08-30T08:30:00Z"
            hebergement={true}
            payAmount={12}
            paymentType="Hourly"
            postesRestants={2}
            postesTotal={4}
            statut="Active"
            to="#"
          />
        
          <AnnonceCardSaison
            titre="Aide vendanges Bordelais saison 2026"
            cropType="Crop_Vineyard"
            ville="Saint-Émilion"
            departement="Gironde"
            dateDebut="2026-09-01T08:30:00Z"
            dateFin="2026-10-15T08:30:00Z"
            hebergement={false}
            payAmount={450}
            paymentType="Weekly"
            postesRestants={3}
            postesTotal={6}
            statut="Active"
            to="#"
          />
        
          <AnnonceCardSaison
            titre="Récolte oliviers Provence"
            cropType="Crop_OliveTrees"
            ville="Aix-en-Provence"
            departement="Bouches-du-Rhône"
            dateDebut="2026-10-01T08:30:00Z"
            dateFin="2026-11-20T08:30:00Z"
            hebergement={true}
            payAmount={1800}
            paymentType="Monthly"
            postesRestants={1}
            postesTotal={8}
            statut="Active"
            to="#"
          />
        
          <AnnonceCardSaison
            titre="Cueillette fraises bio"
            cropType="Crop_Fruits"
            ville="Sarlat"
            departement="Dordogne"
            dateDebut="2025-05-01T08:30:00Z"
            dateFin="2025-07-15T08:30:00Z"
            hebergement={false}
            payAmount={12}
            paymentType="Hourly"
            postesRestants={0}
            postesTotal={10}
            statut="Closed"
            to="#"
          />
        </div>




      <Badge variant='Pending' size='l'  ></Badge>
      <Badge variant='Accepted' size='m'  ></Badge>
      <Badge variant='Rejected' size='s'  ></Badge>
      <Badge variant='Active' size='l'  ></Badge>
      <Badge variant='Draft' size='m'  ></Badge>
      <Badge variant='Closed' size='s'  ></Badge>


      <h2>Mes compétences</h2>

        {/* Sélection profil saisonnier */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
          {allSkills.map(skill => (
            <Tag
              key={skill}
              value={skill}
              selected={selectedSkills.includes(skill)}
              onClick={handleToggle}
            />
          ))}
        </div>
        
        <h2 style={{ marginTop: '2rem' }}>Détail annonce (display-only)</h2>
        
        {/* Affichage détail annonce */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
          <Tag value={SkillEnum.Harvesting} displayOnly />
          <Tag value={SkillEnum.Viticulture} displayOnly />
          <Tag value={SkillEnum.MachineOperation} displayOnly />
        </div>

   
        <AlertBanner variant="warning" title="Profil incomplet">
          Champs manquants : localisation, téléphone
        </AlertBanner>
      


        <AlertBanner variant="error" title="Erreur de connexion">
          Identifiants incorrects. Vérifiez votre email et mot de passe.
        </AlertBanner>
      

      <AlertBanner variant="success">
        Vos modifications ont été enregistrées.
      </AlertBanner>


    
      <h1>LinkText</h1>
      <div style={{display: 'flex', justifyContent: 'center', flex: 'wrap', gap: '40px', marginBottom: '60px'  }}>
        
        <LinkText to="/annonces">← Retour aux annonces</LinkText>
        <p>
          Pas encore de compte ? <LinkText to="/inscription">S'inscrire</LinkText>
        </p>
        <LinkText to="/mot-de-passe-oublie">Mot de passe oublié ?</LinkText>
        <LinkText to="https://example.com" external>Conditions générales</LinkText>
      </div>

      <div style={{ marginLeft: '50px' }}>
      <h1>Input</h1>
      <LaborInput id='nom' label='Nom' type='text'/>
      <LaborInput id="email" label="Email" type="email" placeholder="jean@email.com"/>
      </div>

      <div style={{ marginLeft: '50px' }}>
      <h1>Textarea</h1>
      <LaborTextarea
        id="description"
        label="Description"
        placeholder="Décris ta mission…"
        value={textareaValue}
        onChange={setTextareaValue}
        minLength={10}
        maxLength={300}
      />
      <LaborTextarea
        id="textarea-error"
        label="Avec erreur"
        placeholder="Champ en erreur…"
        value=""
        onChange={() => {}}
        error="Ce champ est requis."
      />
      <LaborTextarea
        id="textarea-disabled"
        label="Désactivé"
        value="Champ désactivé"
        onChange={() => {}}
        disabled
      />
      </div>

      <div style={{ marginLeft: '50px' }}>
    <h1>MultiSelect</h1>
    <LaborMultiSelect
        label="Compétences"
        options={skillOptions}
        value={selectedValues}
        onChange={setSelectedValues}
        placeholder="Choisir des compétences..."
    />
    <LaborMultiSelect
        label="Avec erreur"
        options={skillOptions}
        value={[]}
        onChange={() => {}}
        error="Ce champ est requis."
    />
    <LaborMultiSelect
        label="Désactivé"
        options={skillOptions}
        value={['Skill_Harvesting']}
        onChange={() => {}}
        disabled
    />
</div>

<div style={{ marginLeft: '50px' }}>
    <h1>Checkbox</h1>

    <h2>Variante Classic</h2>
    <LaborCheckbox
        label="Compétences"
        options={skillOptions}
        value={checkedValues}
        onChange={setCheckedValues}
        variant="classic"
    />

    <h2>Variante LABOR</h2>
    <LaborCheckbox
        label="Compétences"
        options={skillOptions}
        value={checkedValuesLabor}
        onChange={setCheckedValuesLabor}
        variant="labor"
    />

    <h2>Avec erreur</h2>
    <LaborCheckbox
        label="Compétences"
        options={skillOptions}
        value={[]}
        onChange={() => {}}
        error="Veuillez sélectionner au moins une compétence."
    />

    <h2>Désactivé</h2>
    <LaborCheckbox
        label="Compétences"
        options={skillOptions}
        value={['Skill_Harvesting']}
        onChange={() => {}}
        disabled
    />
</div>

      
      

      </div>
    
    )
  }
  
  export default TestPage