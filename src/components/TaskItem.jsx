import { useEffect, useState } from 'react'

function TaskItem({ task, onToggleTask, onDeleteTask }) {
  const [isSlicing, setIsSlicing] = useState(false)

  useEffect(() => {
    if (!isSlicing) return

    const timeoutId = window.setTimeout(() => {
      onToggleTask(task.id)
      setIsSlicing(false)
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [isSlicing, onToggleTask, task.id])

  const handleTaskChange = () => {
    if (isSlicing) return

    // Only slice when the task is moving into the completed state.
    if (!task.completed) {
      setIsSlicing(true)
      return
    }

    onToggleTask(task.id)
  }

  return (
    <li
      className={`task-item ${task.completed ? 'completed' : ''} ${isSlicing ? 'slice' : ''}`}
    >
      <label className="task-left">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={handleTaskChange}
          disabled={isSlicing}
          aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <span className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </span>
      </label>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        ×
      </button>
    </li>
  )
}

export default TaskItem
