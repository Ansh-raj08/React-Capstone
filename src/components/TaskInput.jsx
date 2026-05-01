import { useState } from 'react'

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    // Only add a task when there is real text.
    if (!title.trim()) return

    onAddTask(title)
    setTitle('')
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task title..."
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskInput
