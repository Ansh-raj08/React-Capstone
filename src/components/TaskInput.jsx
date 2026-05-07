import { useState } from 'react'
import {
  MISSION_CATEGORIES,
  MISSION_DIFFICULTIES,
  MISSION_PRIORITIES,
  getDifficultyReward,
  getTomorrowDateKey,
} from '../lib/gameSystems'

const createDraftMission = () => ({
  title: '',
  difficulty: 'Easy',
  priority: 'Medium',
  category: 'Personal',
  dueDate: getTomorrowDateKey(),
})

function TaskInput({
  onAddMission,
  onAddTask,
  buttonLabel = 'Add Mission',
}) {
  const [draftMission, setDraftMission] = useState(createDraftMission)
  const handleAddMission = onAddMission || onAddTask

  const updateDraftMission = (field, value) => {
    setDraftMission((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Only add a mission when there is real text.
    const trimmedTitle = draftMission.title.trim()
    if (!trimmedTitle) return

    if (handleAddMission) {
      handleAddMission({
        ...draftMission,
        title: trimmedTitle,
        xpReward: getDifficultyReward(draftMission.difficulty),
      })
    }
    setDraftMission(createDraftMission())
  }

  return (
    <form className="task-input mission-form" onSubmit={handleSubmit}>
      <div className="mission-form-main">
        <label className="mission-field mission-field-title">
          <span>Mission title</span>
          <input
            type="text"
            value={draftMission.title}
            onChange={(event) => updateDraftMission('title', event.target.value)}
            placeholder="Enter a mission title..."
          />
        </label>

        <div className="mission-form-grid">
          <label className="mission-field">
            <span>Category</span>
            <select
              value={draftMission.category}
              onChange={(event) => updateDraftMission('category', event.target.value)}
            >
              {MISSION_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="mission-field">
            <span>Difficulty</span>
            <select
              value={draftMission.difficulty}
              onChange={(event) => updateDraftMission('difficulty', event.target.value)}
            >
              {MISSION_DIFFICULTIES.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>

          <label className="mission-field">
            <span>Priority</span>
            <select
              value={draftMission.priority}
              onChange={(event) => updateDraftMission('priority', event.target.value)}
            >
              {MISSION_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <label className="mission-field">
            <span>Due date</span>
            <input
              type="date"
              value={draftMission.dueDate}
              onChange={(event) => updateDraftMission('dueDate', event.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="mission-form-actions">
        <p className="mission-form-note">
          Rewards: Easy 10 XP, Medium 20 XP, Hard 30 XP.
        </p>
        <button type="submit">{buttonLabel}</button>
      </div>
    </form>
  )
}

export default TaskInput
