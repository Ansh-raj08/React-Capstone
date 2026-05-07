import { NavLink } from 'react-router-dom'
import { getRankBadgeClass } from '../lib/gameSystems'
import { useProductivity } from '../context/ProductivityContext'

const navigationItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/missions', label: 'Missions' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/focus-mode', label: 'Focus Mode' },
  { to: '/settings', label: 'Settings' },
]

function Sidebar() {
  const { name, level, xp, xpProgress, xpIntoLevel, xpToNextLevel, xpToNextRank, streak, rank } = useProductivity()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">XP</div>
        <div className="sidebar-brand-copy">
          <p className="sidebar-eyebrow">Productivity OS</p>
          <h1>XPulse OS</h1>
        </div>
      </div>

      <p className="sidebar-welcome">Welcome back, {name}</p>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navigationItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-link-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-head">
          <span className={`rank-badge rank-badge-sidebar ${getRankBadgeClass(rank.name)}`}>
            {rank.name}
          </span>
          <strong>Level {level}</strong>
        </div>
        <p className="sidebar-footer-copy">{rank.description}</p>
        <div className="sidebar-progress-shell" aria-hidden="true">
          <div className="sidebar-progress-fill" style={{ width: `${xpProgress}%` }} />
        </div>
        <div className="sidebar-footer-meta">
          <span>{xp} XP</span>
          <span>{xpIntoLevel}/50 to next level</span>
          <span>{streak} day streak</span>
        </div>
        <p className="sidebar-footer-note">
          {xpToNextLevel} XP remaining · {xpToNextRank > 0 ? `${xpToNextRank} to ${rank.nextRank?.name}` : 'Max rank achieved'}
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
