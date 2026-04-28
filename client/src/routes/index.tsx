import { createBrowserRouter } from 'react-router-dom'

// Layouts
import PublicLayout from '../layout/PublicLayout'
import AgriLayout from '../layout/AgriLayout'
import SaisonLayout from '../layout/SaisonLayout'

// Pages publiques
import LandingPage from '../pages/public/landingPage'
import Connexion from '../pages/public/connexion'

// Pages de test
import TestPage from '../pages/test/TestPage'
import NotFoundPage from '../pages/test/NotFoundPage'
import HomePage from '../pages/test/HomePage'

const router = createBrowserRouter([
  // Routes publiques (non connecté)
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/connexion', element: <Connexion /> },
    ],
  },

  // Routes agriculteur
  {
    element: <AgriLayout />,
    children: [
      { path: '/agri', element: <p>Espace agriculteur</p> },
    ],
  },

  // Routes saisonnier
  {
    element: <SaisonLayout />,
    children: [
      { path: '/saison', element: <p>Espace saisonnier</p> },
    ],
  },

  // Routes de test / fallback
  { path: '/homepage', element: <HomePage /> },
  { path: '/_test-auth', element: <TestPage /> },
  { path: '*', element: <NotFoundPage /> },
])


export default router