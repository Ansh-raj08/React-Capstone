import { useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import { useProductivity } from '../context/ProductivityContext'

function Settings() {
  const { user, theme, toggleTheme, saveName, resetStats, rank, xp, xpProgress, xpToNextRank, productivityScore, streak, level, completedMissions } = useProductivity()
  const [draftName, setDraftName] = useState(user.name)

  useEffect(() => {
    setDraftName(user.name)
  }, [user.name])

  const handleSaveName = (event) => {
    event.preventDefault()
    saveName(draftName)
  }

  return (
    <div className="page page-settings">
      <section className="page-card page-intro-card">
        <p className="page-kicker">Personalization</p>
        <h2>Settings</h2>
        <p>Control the visual theme, update your username, and reset progress when you want a clean slate.</p>
      </section>

      <ProfileCard
        user={user}
        rank={rank}
        xp={xp}
        xpProgress={xpProgress}
        xpToNextRank={xpToNextRank}
        productivityScore={productivityScore}
        streak={streak}
        level={level}
        completedMissions={completedMissions}
      />

      <section className="page-card settings-card">
        <div className="section-head">
          <div>
            <p className="page-kicker">Appearance</p>
            <h3>Theme</h3>
          </div>
        </div>
        <div className="settings-row">
          <div>
            <p className="settings-label">Theme mode</p>
            <span className="settings-copy">Switch between the light and dark shell.</span>
          </div>
          <button
            type="button"
            className="theme-toggle settings-theme-toggle"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span className="theme-toggle-text">{theme === 'light' ? 'Light' : 'Dark'}</span>
            <span className="theme-toggle-track" aria-hidden="true">
              <span className="theme-toggle-thumb" />
            </span>
          </button>
        </div>
      </section>

      <section className="page-card settings-card">
        <div className="section-head">
          <div>
            <p className="page-kicker">Profile</p>
            <h3>Username</h3>
          </div>
        </div>
        <form className="settings-form" onSubmit={handleSaveName}>
          <input
            type="text"
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            placeholder="Your display name"
            aria-label="Username"
          />
          <button type="submit" className="primary-button">
            Save name
          </button>
        </form>
      </section>

      <section className="page-card settings-card danger-card">
        <div className="section-head">
          <div>
            <p className="page-kicker">Maintenance</p>
            <h3>Reset progress</h3>
          </div>
        </div>
        <p className="settings-copy">
          This clears XP, level, streak, mission completion, and achievement state without removing your mission list.
        </p>
        <button type="button" className="reset-button" onClick={resetStats}>
          Reset Stats
        </button>
      </section>
    </div>
  )
}

export default Settings
