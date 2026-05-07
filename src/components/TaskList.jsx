import { useState } from 'react'
import TaskItem from './TaskItem'

function TaskList({
  missions,
  tasks,
  onToggleMission,
  onToggleTask,
  onDeleteMission,
  onDeleteTask,
}) {
  const [showAll, setShowAll] = useState(false)
  const missionList = missions || tasks || []
  const handleToggleMission = onToggleMission || onToggleTask
  const handleDeleteMission = onDeleteMission || onDeleteTask
  const missionBoard = missionList.slice().sort((leftMission, rightMission) => {
    if (leftMission.completed !== rightMission.completed) {
      return Number(leftMission.completed) - Number(rightMission.completed)
    }

    const leftDueDate = leftMission.dueDate || '9999-12-31'
    const rightDueDate = rightMission.dueDate || '9999-12-31'
    if (leftDueDate !== rightDueDate) {
      return leftDueDate.localeCompare(rightDueDate)
    }

    return rightMission.createdAt - leftMission.createdAt
  })

  if (missionBoard.length === 0) {
    return (
      <div className="empty-state">
        <p>No missions queued yet 🚀</p>
        <span>Add a mission above to start building XP, rank, and momentum.</span>
      </div>
    )
  }

  const visibleMissions = showAll ? missionBoard : missionBoard.slice(0, 6)
  const hasMoreMissions = missionBoard.length > 6

  return (
    <div className="task-list-wrap">
      <div className="task-list-header">
        <p>Mission board</p>
        <span>{missionBoard.length} missions</span>
      </div>
      <ul className="task-list">
        {visibleMissions.map((mission) => (
          <TaskItem
            key={mission.id}
            mission={mission}
            onToggleMission={handleToggleMission}
            onDeleteMission={handleDeleteMission}
          />
        ))}
      </ul>

      {hasMoreMissions ? (
        <button
          type="button"
          className="task-history-button"
          onClick={() => setShowAll((currentValue) => !currentValue)}
        >
          {showAll ? 'Show Less' : 'View History'}
        </button>
      ) : null}
    </div>
  )
}

export default TaskList
