import { useEffect, useState } from 'react'

function Header({ theme, name, onToggleTheme, onSaveName }) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [draftName, setDraftName] = useState(name)

  const hour = new Date().getHours()
  let greeting = ''

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning'
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon'
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening'
  }
  else {
    greeting = 'Good night'
  }

  useEffect(() => {
    if (!isEditingName) {
      setDraftName(name)
    }
  }, [name, isEditingName])

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
    <header className="header">
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-pressed={theme === 'dark'}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <span className="theme-toggle-text">{theme === 'light' ? 'Light' : 'Dark'}</span>
        <span className="theme-toggle-track" aria-hidden="true">
          <span className="theme-toggle-thumb" />
        </span>
      </button>
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
        <h1>Gamified Task Manager</h1>
        <p>Finish tasks, gain XP, and keep your daily streak going.</p>
      </div>
    </header>
  )
}

export default Header
