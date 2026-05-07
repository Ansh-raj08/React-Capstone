import { Link } from 'react-router-dom'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import Stats from '../components/Stats'
import { useProductivity } from '../context/ProductivityContext'
import { getDueDateLabel } from '../lib/gameSystems'

const productivityQuote =
  'Small missions finished consistently will always beat perfect plans left untouched.'

const formatAchievementDate = (timestamp) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(timestamp))

function Dashboard() {
  const {
    user,
    saveName,
    xp,
    level,
    streak,
    rank,
    xpProgress,
    xpToNextRank,
    xpToNextLevel,
    xpIntoLevel,
    totalMissions,
    completedMissions,
    pendingMissions,
    completionPercentage,
    upcomingMissions,
    recentAchievements,
    categoryBreakdown,
    productivityScore,
  } = useProductivity()

  const activeCategories = categoryBreakdown.filter((category) => category.total > 0)

  return (
    <div className="page page-dashboard">
      <div className="dashboard-hero-grid">
        <Header
          name={user.name}
          onSaveName={saveName}
          title="Mission Command"
          subtitle="A premium command center for your productivity ecosystem."
        />
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
      </div>

      <Stats
        xp={xp}
        level={level}
        streak={streak}
        rank={rank}
        xpToNextLevel={xpToNextLevel}
        xpIntoLevel={xpIntoLevel}
        xpProgress={xpProgress}
      />

      <section className="dashboard-grid">
        <article className="page-card dashboard-insight-card">
          <div className="section-head">
            <div>
              <p className="page-kicker">Quick analytics</p>
              <h3>Productivity score</h3>
            </div>
            <span className="section-chip">{productivityScore}/100</span>
          </div>

          <div className="dashboard-metric-grid">
            <div className="stat-card stat-card-compact">
              <h3>Total</h3>
              <p>{totalMissions}</p>
              <span>All missions tracked</span>
            </div>
            <div className="stat-card stat-card-compact">
              <h3>Completed</h3>
              <p>{completedMissions}</p>
              <span>Finished missions</span>
            </div>
            <div className="stat-card stat-card-compact">
              <h3>Pending</h3>
              <p>{pendingMissions}</p>
              <span>Missions waiting</span>
            </div>
            <div className="stat-card stat-card-compact">
              <h3>Completion</h3>
              <p>{completionPercentage}%</p>
              <span>Overall mission rate</span>
            </div>
          </div>
        </article>

        <article className="page-card dashboard-category-card">
          <div className="section-head">
            <div>
              <p className="page-kicker">Category overview</p>
              <h3>Mission balance</h3>
            </div>
            <span className="section-chip">{activeCategories.length} active</span>
          </div>

          {activeCategories.length ? (
            <div className="dashboard-category-list">
              {activeCategories.map((category) => {
                const completionRatio = category.total === 0 ? 0 : (category.completed / category.total) * 100

                return (
                  <div key={category.name} className="dashboard-category-row">
                    <div className="dashboard-category-copy">
                      <strong>{category.name}</strong>
                      <span>
                        {category.completed}/{category.total} complete · {category.xp} XP
                      </span>
                    </div>
                    <div className="dashboard-category-track" aria-hidden="true">
                      <div className="dashboard-category-fill" style={{ width: `${completionRatio}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p>No category data yet</p>
              <span>Add missions in different categories to build a richer productivity profile.</span>
            </div>
          )}
        </article>

        <article className="page-card dashboard-upcoming-card">
          <div className="section-head">
            <div>
              <p className="page-kicker">Upcoming missions</p>
              <h3>Next up in the queue</h3>
            </div>
            <Link className="section-link" to="/missions">
              Open missions
            </Link>
          </div>

          {upcomingMissions.length ? (
            <div className="dashboard-list">
              {upcomingMissions.map((mission) => (
                <article key={mission.id} className="dashboard-list-row">
                  <div>
                    <p>{mission.title}</p>
                    <span>{mission.category}</span>
                  </div>
                  <div className="dashboard-list-meta">
                    <span>{mission.xpReward} XP</span>
                    <strong>{getDueDateLabel(mission.dueDate)}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No upcoming missions</p>
              <span>Add due dates in Missions to build a real queue of work.</span>
            </div>
          )}
        </article>

        <article className="page-card dashboard-achievements-card">
          <div className="section-head">
            <div>
              <p className="page-kicker">Recent achievements</p>
              <h3>Unlocked milestones</h3>
            </div>
            <span className="section-chip">{recentAchievements.length} unlocked</span>
          </div>

          {recentAchievements.length ? (
            <div className="dashboard-list">
              {recentAchievements.map((achievement) => (
                <article key={achievement.id} className="dashboard-list-row dashboard-achievement-row">
                  <div>
                    <p>{achievement.title}</p>
                    <span>{achievement.description}</span>
                  </div>
                  <div className="dashboard-list-meta">
                    <span>Unlocked</span>
                    <strong>{achievement.unlockedAt ? formatAchievementDate(achievement.unlockedAt) : 'Now'}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No achievements unlocked yet</p>
              <span>Complete missions and build streaks to light up the achievement wall.</span>
            </div>
          )}
        </article>
      </section>

      <section className="page-card dashboard-quote-card">
        <div className="section-head">
          <div>
            <p className="page-kicker">Productivity quote</p>
            <h3>Keep the momentum alive</h3>
          </div>
        </div>
        <p className="quote-text">&ldquo;{productivityQuote}&rdquo;</p>
      </section>
    </div>
  )
}

export default Dashboard
