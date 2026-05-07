import { getRankBadgeClass } from '../lib/gameSystems'

function ProfileCard({ user, rank, xp, xpProgress, xpToNextRank, productivityScore, streak, level, completedMissions }) {
  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return (
    <section className="profile-card page-card">
      <div className="profile-card-top">
        <div className="profile-avatar" aria-hidden="true">
          {initials || 'U'}
        </div>
        <div className="profile-card-copy">
          <p className="page-kicker">Profile</p>
          <h3>{user.name}</h3>
          <span className={`rank-badge ${getRankBadgeClass(rank.name)}`}>{rank.name}</span>
        </div>
      </div>

      <div className="profile-card-grid">
        <article>
          <span>Level</span>
          <strong>{level}</strong>
        </article>
        <article>
          <span>Streak</span>
          <strong>{streak} day{streak === 1 ? '' : 's'}</strong>
        </article>
        <article>
          <span>Completed</span>
          <strong>{completedMissions}</strong>
        </article>
        <article>
          <span>Productivity</span>
          <strong>{productivityScore}/100</strong>
        </article>
      </div>

      <div className="profile-xp-panel">
        <div className="xp-progress-row">
          <span>{xp} total XP</span>
          <strong>{xpToNextRank > 0 ? `${xpToNextRank} to ${rank.nextRank?.name ?? 'next rank'}` : 'Max rank'}</strong>
        </div>
        <div className="xp-progress-bar" aria-hidden="true">
          <div className="xp-progress-fill" style={{ width: `${xpProgress}%` }} />
        </div>
      </div>
    </section>
  )
}

export default ProfileCard
