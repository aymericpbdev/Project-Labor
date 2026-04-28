import { Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Role } from '../types/enums'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import './Layout.css'

function SaisonLayout() {
  const { currentUser } = useAuth()

  const displayName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`
    : ''

  return (
    <div className="layout">
      <Navbar role={Role.SeasonalWorker} userName={displayName} />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer isConnected={true} />
    </div>
  )
}

export default SaisonLayout