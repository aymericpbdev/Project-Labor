import AnnonceCardPublic from '../../../../components/annonces/AnnonceCardPublic/AnnonceCardPublic'

import './LatestJobs.css'

// Données mockées en dur pour l'instant
// TODO : remplacer par un appel au service annonceService quand MSW sera branché
const annoncesMock = [
    { titre: 'Castrage maïs', departement: 'Landes', postesRestants: 2, cropType: 'Crop_Cereals' as const },
    { titre: 'Récolte de tomates', departement: 'Tarn-et-Garonne', postesRestants: 4, cropType: 'Crop_Vegetables' as const },
    { titre: 'Cueillette de prunes', departement: 'Lot-et-Garonne', postesRestants: 1, cropType: 'Crop_Fruits' as const },
  ]

function LatestJobs() {
  return (
    <section className="latest-jobs">
      <div className='latest-jobs__container'>
        <h2 className="latest-jobs__title">Dernières annonces</h2>
        <div className="latest-jobs__list">
          {annoncesMock.map((annonce, index) => (
           <AnnonceCardPublic
              key={index}
              titre={annonce.titre}
              departement={annonce.departement}
              postesRestants={annonce.postesRestants}
              cropType={annonce.cropType}
              onClick={() => alert('Cliqué — redirige vers connexion')}
            />
           ))}
        </div>
      </div>
      
    </section>
  )
}

export default LatestJobs