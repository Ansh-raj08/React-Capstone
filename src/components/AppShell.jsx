import { Outlet } from 'react-router-dom'
import { useProductivity } from '../context/ProductivityContext'
import Sidebar from './Sidebar'

function AppShell() {
  const { theme, xpBurst } = useProductivity()

  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar />
      <main className="app-main">
        <div className="app-main-inner">
          <Outlet />
        </div>
      </main>
      {xpBurst ? <div className="xp-burst">+10 XP ✨</div> : null}
    </div>
  )
}

export default AppShell
