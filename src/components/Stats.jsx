function Stats({
  xp,
  level,
  streak,
  rank,
  xpToNextLevel,
  xpIntoLevel,
  xpProgress,
  onResetStats,
  title = 'Your Progress',
  subtitle = 'Keep going. Every completed mission pushes you closer to the next level.',
}) {
  const safeXpProgress = typeof xpProgress === 'number' ? xpProgress : ((xp % 50) / 50) * 100
  const safeXpIntoLevel = typeof xpIntoLevel === 'number' ? xpIntoLevel : xp % 50
  const safeXpToNextLevel = xpToNextLevel || 50 - safeXpIntoLevel || 50

  return (
    <section className="stats page-card">
      <div className="stats-hero">
        <div>
          <h2>{title}</h2>
          <p className="stats-subtitle">{subtitle}</p>
        </div>
        {onResetStats ? (
          <button type="button" className="reset-button" onClick={onResetStats}>
            Reset Stats
          </button>
        ) : null}
      </div>
      <div className="stats-grid">
        <div className="stat-card stat-card-rank">
          <h3>Rank</h3>
          <p className="rank-card-value">{rank?.name || 'Rookie'}</p>
          <span>{rank?.description || 'Building momentum'}</span>
        </div>
        <div className="stat-card">
          <h3>Level</h3>
          <p>{level}</p>
          <span>Progress tier</span>
        </div>
        <div className="stat-card">
          <h3>Streak</h3>
          <p>{streak}</p>
          <span>Days in a row</span>
        </div>
        <div className="stat-card stat-card-xp">
          <h3>XP</h3>
          <p>{xp}</p>
          <span>{safeXpToNextLevel} XP to next level</span>
        </div>
      </div>
      <div className="xp-progress-card">
        <div className="xp-progress-row">
          <span>Progress to Level {level + 1}</span>
          <strong>{Math.round(safeXpProgress)}%</strong>
        </div>
        <div className="xp-progress-bar" aria-hidden="true">
          <div className="xp-progress-fill" style={{ width: `${safeXpProgress}%` }} />
        </div>
        <p className="xp-progress-note">
          {safeXpIntoLevel}/50 XP earned in this level
          {rank?.nextRank ? ` · ${rank.xpToNextRank} XP to ${rank.nextRank.name}` : ' · Max rank reached'}
        </p>
      </div>
    </section>
  )
}

export default Stats
