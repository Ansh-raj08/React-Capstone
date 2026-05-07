import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useProductivity } from '../context/ProductivityContext'

const CHART_COLORS = ['#6d8cff', '#44d7b6', '#f97316', '#a855f7', '#38bdf8']

function Analytics() {
  const {
    totalMissions,
    completedMissions,
    pendingMissions,
    xp,
    completionPercentage,
    productivityScore,
    categoryBreakdown,
    xpByCategory,
    weeklyProductivity,
    currentRank,
    unlockedAchievementCount,
  } = useProductivity()

  const pieData = categoryBreakdown.filter((category) => category.total > 0).map((category) => ({
    name: category.name,
    value: category.total,
  }))

  const barData = xpByCategory.filter((category) => category.xp > 0)

  return (
    <div className="page page-analytics">
      <section className="page-card page-intro-card">
        <p className="page-kicker">Performance review</p>
        <h2>Analytics</h2>
        <p>Data-rich mission charts and score cards help you understand your current momentum.</p>
      </section>

      <section className="metric-grid analytics-metric-grid">
        <article className="stat-card">
          <h3>Total Missions</h3>
          <p>{totalMissions}</p>
          <span>All missions created</span>
        </article>
        <article className="stat-card">
          <h3>Completed</h3>
          <p>{completedMissions}</p>
          <span>Earned XP and streak progress</span>
        </article>
        <article className="stat-card">
          <h3>Pending</h3>
          <p>{pendingMissions}</p>
          <span>Waiting to be finished</span>
        </article>
        <article className="stat-card">
          <h3>Total XP</h3>
          <p>{xp}</p>
          <span>All mission rewards combined</span>
        </article>
        <article className="stat-card">
          <h3>Productivity</h3>
          <p>{productivityScore}</p>
          <span>Score out of 100</span>
        </article>
        <article className="stat-card">
          <h3>Achievements</h3>
          <p>{unlockedAchievementCount}</p>
          <span>Unlocked milestone count</span>
        </article>
      </section>

      <section className="analytics-chart-grid">
        <article className="page-card analytics-chart-card">
          <div className="section-head">
            <div>
              <p className="page-kicker">Mission categories</p>
              <h3>Category distribution</h3>
            </div>
            <span className="section-chip">{currentRank.name}</span>
          </div>

          <div className="analytics-chart-shell">
            {pieData.length ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={64} outerRadius={108} paddingAngle={3}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state">
                <p>No chart data yet</p>
                <span>Create missions in different categories to populate the chart.</span>
              </div>
            )}
          </div>
        </article>

        <article className="page-card analytics-chart-card">
          <div className="section-head">
            <div>
              <p className="page-kicker">XP performance</p>
              <h3>XP by category</h3>
            </div>
            <strong>{xp} XP</strong>
          </div>

          <div className="analytics-chart-shell">
            {barData.length ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="xp" radius={[12, 12, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state">
                <p>No XP yet</p>
                <span>Complete missions to power the XP-by-category chart.</span>
              </div>
            )}
          </div>
        </article>

        <article className="page-card analytics-chart-card analytics-chart-card-wide">
          <div className="section-head">
            <div>
              <p className="page-kicker">Weekly productivity</p>
              <h3>Mission completions over time</h3>
            </div>
            <span className="section-chip">{completionPercentage}% complete</span>
          </div>

          <div className="analytics-chart-shell">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={weeklyProductivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#6d8cff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="page-card analytics-breakdown-card">
        <div className="section-head">
          <div>
            <p className="page-kicker">Mission breakdown</p>
            <h3>Current balance</h3>
          </div>
          <span className="section-chip">{productivityScore}/100 score</span>
        </div>

        <div className="analytics-breakdown-grid">
          {categoryBreakdown.map((category) => (
            <article key={category.name} className="analytics-breakdown-row">
              <div>
                <p>{category.name}</p>
                <span>
                  {category.completed}/{category.total} complete · {category.xp} XP
                </span>
              </div>
              <div className="xp-progress-bar analytics-progress-bar" aria-hidden="true">
                <div
                  className="xp-progress-fill"
                  style={{
                    width: `${category.total === 0 ? 0 : (category.completed / category.total) * 100}%`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Analytics
