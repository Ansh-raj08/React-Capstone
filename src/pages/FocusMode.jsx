import { useProductivity } from '../context/ProductivityContext'
import { getDueDateLabel, getRankBadgeClass } from '../lib/gameSystems'

const focusQuote = 'Deep work starts when one mission gets your full attention.'

function FocusMode() {
  const { activeMission, rank, productivityScore } = useProductivity()

  return (
    <div className="page page-focus">
      <section className="page-card focus-stage">
        <p className="page-kicker">Focus mode</p>
        <div className="focus-stage-top">
          <div className="focus-timer">25:00</div>
          <div className="focus-pill-row">
            <span className={`rank-badge ${getRankBadgeClass(rank.name)}`}>{rank.name}</span>
            <span className="section-chip">Score {productivityScore}</span>
          </div>
        </div>
        <p className="focus-label">Current mission</p>
        <h2 className="focus-mission-title">
          {activeMission ? activeMission.title : 'No active mission selected'}
        </h2>
        {activeMission ? (
          <div className="focus-meta-grid">
            <span className={`mission-chip mission-category-chip category-${activeMission.category.toLowerCase()}`}>
              {activeMission.category}
            </span>
            <span className={`mission-chip mission-priority-chip priority-${activeMission.priority.toLowerCase()}`}>
              {activeMission.priority}
            </span>
            <span className={`mission-chip mission-difficulty-chip difficulty-${activeMission.difficulty.toLowerCase()}`}>
              {activeMission.difficulty}
            </span>
            <span className="mission-chip mission-due-chip">
              {getDueDateLabel(activeMission.dueDate)}
            </span>
            <span className="mission-chip mission-xp-chip">{activeMission.xpReward} XP</span>
          </div>
        ) : (
          <p className="focus-supporting-copy">
            Add a mission in Missions to start a focused work block.
          </p>
        )}
        <p className="quote-text focus-quote">&ldquo;{focusQuote}&rdquo;</p>
      </section>
    </div>
  )
}

export default FocusMode
