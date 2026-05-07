import { useState } from 'react'

function Header({ name, onSaveName, title = 'XPulse OS', subtitle = 'Modern gamified productivity dashboard.' }) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [draftName, setDraftName] = useState(name)

  const hour = new Date().getHours()
  const greeting =
    hour >= 5 && hour < 12
      ? 'Good morning'
      : hour >= 12 && hour < 17
        ? 'Good afternoon'
        : hour >= 17 && hour < 21
          ? 'Good evening'
          : 'Good night'

  const startEditingName = () => {
    setDraftName(name)
    setIsEditingName(true)
  }

  const finishEditingName = () => {
    onSaveName(draftName)
    setIsEditingName(false)
  }

  const handleNameKeyDown = (event) => {
    if (event.key === 'Enter') {
      finishEditingName()
    }
  }

  return (
    <header className="header page-card">
      <div className="header-copy">
        <p className="header-greeting">
          <span>{greeting}, </span>
          {isEditingName ? (
            <input
              className="header-name-input"
              type="text"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              onBlur={finishEditingName}
              onKeyDown={handleNameKeyDown}
              autoFocus
              aria-label="Edit your name"
            />
          ) : (
            <button
              type="button"
              className="header-name-button"
              onClick={startEditingName}
            >
              {name}
            </button>
          )}
          <span aria-hidden="true">👋</span>
        </p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  )
}

export default Header
