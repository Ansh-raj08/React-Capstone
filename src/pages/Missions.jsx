import TaskInput from '../components/TaskInput'
import TaskList from '../components/TaskList'
import { useProductivity } from '../context/ProductivityContext'

function Missions() {
  const {
    missions,
    addMission,
    toggleMission,
    deleteMission,
    totalMissions,
    completedMissions,
    pendingMissions,
    xp,
    productivityScore,
    categoryBreakdown,
    priorityBreakdown,
    upcomingMissions,
  } = useProductivity()

  const activeCategories = categoryBreakdown.filter((category) => category.total > 0)

  return (
    <div className="page page-missions">
      <section className="page-card page-intro-card">
        <p className="page-kicker">Mission control</p>
        <h2>Missions</h2>
        <p>Plan your work, complete missions for XP, and keep the history visible when you need context.</p>
      </section>

      <section className="metric-grid missions-metric-grid">
        <article className="stat-card">
          <h3>Total Missions</h3>
          <p>{totalMissions}</p>
          <span>All missions on record</span>
        </article>
        <article className="stat-card">
          <h3>Completed</h3>
          <p>{completedMissions}</p>
          <span>Tasks that earned XP</span>
        </article>
        <article className="stat-card">
          <h3>Pending</h3>
          <p>{pendingMissions}</p>
          <span>Missions waiting for action</span>
        </article>
        <article className="stat-card">
          <h3>XP</h3>
          <p>{xp}</p>
          <span>Total experience collected</span>
        </article>
        <article className="stat-card">
          <h3>Score</h3>
          <p>{productivityScore}</p>
          <span>Current productivity score</span>
        </article>
      </section>

      <section className="page-card missions-insight-card">
        <div className="section-head">
          <div>
            <p className="page-kicker">Mission overview</p>
            <h3>Balance and urgency</h3>
          </div>
          <span className="section-chip">{upcomingMissions.length} upcoming</span>
        </div>

        <div className="missions-insight-grid">
          <div className="missions-insight-panel">
            <p className="missions-insight-label">Category split</p>
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
              <span className="missions-insight-empty">No category data yet.</span>
            )}
          </div>

          <div className="missions-insight-panel">
            <p className="missions-insight-label">Priority balance</p>
            <div className="missions-priority-list">
              {priorityBreakdown.map((priority) => (
                <div key={priority.name} className={`missions-priority-row priority-${priority.name.toLowerCase()}`}>
                  <strong>{priority.name}</strong>
                  <span>{priority.total} missions</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TaskInput onAddMission={addMission} />
        <TaskList missions={missions} onToggleMission={toggleMission} onDeleteMission={deleteMission} />
      </section>
    </div>
  )
}

export default Missions
