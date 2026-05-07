import { useProductivity } from '../context/ProductivityContext'

const formatUnlockedDate = (timestamp) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(timestamp))

function Achievements() {
  const { achievements, recentAchievements, unlockedAchievementCount, productivityScore, rank } = useProductivity()

  return (
    <div className="page page-achievements">
      <section className="page-card page-intro-card">
        <p className="page-kicker">Recognition grid</p>
        <h2>Achievements</h2>
        <p>Unlockable milestone cards make the progression system feel alive and rewarding.</p>
      </section>

      <section className="metric-grid achievements-metric-grid">
        <article className="stat-card">
          <h3>Unlocked</h3>
          <p>{unlockedAchievementCount}</p>
          <span>Achievements earned</span>
        </article>
        <article className="stat-card">
          <h3>Rank</h3>
          <p>{rank.name}</p>
          <span>{rank.description}</span>
        </article>
        <article className="stat-card">
          <h3>Score</h3>
          <p>{productivityScore}</p>
          <span>Productivity score</span>
        </article>
      </section>

      <section className="page-card achievements-recent-card">
        <div className="section-head">
          <div>
            <p className="page-kicker">Recent unlocks</p>
            <h3>Latest progress</h3>
          </div>
          <span className="section-chip">{recentAchievements.length} recent</span>
        </div>

        {recentAchievements.length ? (
          <div className="recent-achievement-list">
            {recentAchievements.map((achievement) => (
              <article key={achievement.id} className="recent-achievement-row">
                <div>
                  <p>{achievement.title}</p>
                  <span>{achievement.description}</span>
                </div>
                <strong>{achievement.unlockedAt ? formatUnlockedDate(achievement.unlockedAt) : 'Now'}</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No achievements unlocked yet</p>
            <span>Finish a mission to unlock Rookie and begin the streak journey.</span>
          </div>
        )}
      </section>

      <section className="achievement-grid">
        {achievements.map((achievement) => (
          <article
            key={achievement.title}
            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          >
            <div className="achievement-card-head">
              <span className="achievement-badge">{achievement.unlocked ? 'Unlocked' : 'Locked'}</span>
              <strong>{achievement.label}</strong>
            </div>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            <span className="achievement-progress">{achievement.label}</span>
            <div className="achievement-progress-bar" aria-hidden="true">
              <div
                className="achievement-progress-fill"
                style={{ width: `${achievement.percentage}%` }}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Achievements
