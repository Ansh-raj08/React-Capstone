import { useState } from 'react'
import TaskItem from './TaskItem'

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  const [showAll, setShowAll] = useState(false)

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet 🚀</p>
        <span>Add one and start earning XP!</span>
      </div>
    )
  }

  const visibleTasks = showAll ? tasks : tasks.slice(0, 5)
  const hasMoreTasks = tasks.length > 5

  return (
    <div className="task-list-wrap">
      <ul className="task-list">
        {visibleTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
        ))}
      </ul>

      {hasMoreTasks ? (
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
