import { useEffect, useState } from 'react'
import { getDueDateLabel, getRankBadgeClass, isMissionOverdue } from '../lib/gameSystems'

const toClassSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function TaskItem({
  mission,
  task,
  onToggleMission,
  onToggleTask,
  onDeleteMission,
  onDeleteTask,
}) {
  const [isSlicing, setIsSlicing] = useState(false)
  const currentMission = mission || task
  const handleToggleMission = onToggleMission || onToggleTask
  const handleDeleteMission = onDeleteMission || onDeleteTask
  const categorySlug = toClassSlug(currentMission.category || 'Personal')
  const prioritySlug = toClassSlug(currentMission.priority || 'Medium')
  const difficultySlug = toClassSlug(currentMission.difficulty || 'Easy')
  const overdue = isMissionOverdue(currentMission)
  const dueDateLabel = getDueDateLabel(currentMission.dueDate)

  useEffect(() => {
    if (!isSlicing) return

    const timeoutId = window.setTimeout(() => {
      if (handleToggleMission) {
        handleToggleMission(currentMission.id)
      }
      setIsSlicing(false)
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [currentMission.id, handleToggleMission, isSlicing])

  const handleTaskChange = () => {
    if (isSlicing) return

    // Only slice when the mission is moving into the completed state.
    if (!currentMission.completed) {
      setIsSlicing(true)
      return
    }

    if (handleToggleMission) {
      handleToggleMission(currentMission.id)
    }
  }

  return (
    <li
      className={`task-item mission-card priority-${prioritySlug} category-${categorySlug} difficulty-${difficultySlug} ${currentMission.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''} ${isSlicing ? 'slice' : ''}`}
    >
      <div className="mission-card-main">
        <div className="mission-card-top">
          <label className="task-left mission-title-row">
            <input
              className="task-checkbox"
              type="checkbox"
              checked={currentMission.completed}
              onChange={handleTaskChange}
              disabled={isSlicing}
              aria-label={`Mark ${currentMission.title} as ${currentMission.completed ? 'incomplete' : 'complete'}`}
            />
            <div className="mission-title-copy">
              <span className={`task-title ${currentMission.completed ? 'completed' : ''}`}>
                {currentMission.title}
              </span>
              <span className="mission-subtitle">
                {currentMission.completed ? 'Mission complete' : overdue ? 'Overdue mission' : 'Pending mission'}
              </span>
            </div>
          </label>

          <div className="mission-card-actions">
            <span className="mission-xp-badge">{currentMission.xpReward} XP</span>
            <button
              type="button"
              className="delete-button"
              onClick={() => handleDeleteMission && handleDeleteMission(currentMission.id)}
              aria-label={`Delete ${currentMission.title}`}
            >
              ×
            </button>
          </div>
        </div>

        <div className="mission-chip-row">
          <span className={`mission-chip mission-category-chip category-${categorySlug}`}>
            {currentMission.category}
          </span>
          <span className={`mission-chip mission-priority-chip priority-${prioritySlug}`}>
            {currentMission.priority}
          </span>
          <span className={`mission-chip mission-difficulty-chip difficulty-${difficultySlug}`}>
            {currentMission.difficulty}
          </span>
          <span className={`mission-chip mission-due-chip ${overdue ? 'overdue' : ''}`}>
            {dueDateLabel}
          </span>
        </div>
      </div>
    </li>
  )
}

export default TaskItem
