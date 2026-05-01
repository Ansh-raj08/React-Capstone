function Stats({ xp, level, streak, onResetStats }) {
  const progress = ((xp % 50) / 50) * 100
  const xpIntoLevel = xp % 50
  const xpToNextLevel = 50 - xpIntoLevel || 50

  return (
    <section className="stats">
      <div className="stats-hero">
        <div>
          <h2>Your Progress</h2>
          <p className="stats-subtitle">
            Keep going. Every completed task pushes you closer to the next level.
          </p>
        </div>
        <button type="button" className="reset-button" onClick={onResetStats}>
          Reset Stats
        </button>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Level</h3>
          <p>{level}</p>
          <span>Current rank</span>
        </div>
        <div className="stat-card">
          <h3>Streak</h3>
          <p>{streak}</p>
          <span>Days in a row</span>
        </div>
        <div className="stat-card stat-card-xp">
          <h3>XP</h3>
          <p>{xp}</p>
          <span>{xpToNextLevel} XP to next level</span>
        </div>
      </div>
      <div className="xp-progress-card">
        <div className="xp-progress-row">
          <span>Progress to Level {level + 1}</span>
          <strong>{Math.round(progress)}%</strong>
        </div>
        <div className="xp-progress-bar" aria-hidden="true">
          <div className="xp-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="xp-progress-note">{xpIntoLevel}/50 XP earned in this level</p>
      </div>
    </section>
  )
}

export default Stats
