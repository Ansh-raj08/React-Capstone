import { useEffect, useState } from 'react'
import Header from './components/Header'
import Stats from './components/Stats'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './App.css'

const STORAGE_KEYS = {
  tasks: 'tasks',
  xp: 'xp',
  level: 'level',
  streak: 'streak',
  lastCompletedDate: 'lastCompletedDate',
  theme: 'theme',
  name: 'username',
}

const getDateString = (date = new Date()) => date.toISOString().split('T')[0]

const getYesterdayString = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return getDateString(yesterday)
}

const getSavedNumber = (key) => {
  const value = Number(localStorage.getItem(key) || 0)
  return Number.isNaN(value) ? 0 : value
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || '[]')
    return Array.isArray(savedTasks) ? savedTasks : []
  })
  const [xp, setXP] = useState(() => getSavedNumber(STORAGE_KEYS.xp))
  const [level, setLevel] = useState(() => {
    const savedXP = getSavedNumber(STORAGE_KEYS.xp)
    return Math.floor(savedXP / 50)
  })
  const [lastCompletedDate, setLastCompletedDate] = useState(
    () => localStorage.getItem(STORAGE_KEYS.lastCompletedDate) || '',
  )
  const [streak, setStreak] = useState(() => {
    const savedStreak = getSavedNumber(STORAGE_KEYS.streak)
    const savedLastCompletedDate =
      localStorage.getItem(STORAGE_KEYS.lastCompletedDate) || ''

    if (!savedLastCompletedDate) return savedStreak

    const today = getDateString()
    const yesterday = getYesterdayString()
    const missedDay =
      savedLastCompletedDate !== today && savedLastCompletedDate !== yesterday

    return missedDay ? 0 : savedStreak
  })
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEYS.theme) || 'light',
  )
  const [name, setName] = useState(
    () => localStorage.getItem(STORAGE_KEYS.name) || 'User',
  )
  const [xpBurst, setXPBurst] = useState(null)

  useEffect(() => {
    // Save every important value so the app survives refresh.
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks))
    localStorage.setItem(STORAGE_KEYS.xp, String(xp))
    localStorage.setItem(STORAGE_KEYS.level, String(level))
    localStorage.setItem(STORAGE_KEYS.streak, String(streak))
    localStorage.setItem(STORAGE_KEYS.lastCompletedDate, lastCompletedDate)
    localStorage.setItem(STORAGE_KEYS.theme, theme)
    localStorage.setItem(STORAGE_KEYS.name, name)
    document.body.dataset.theme = theme
  }, [tasks, xp, level, streak, lastCompletedDate, theme, name])

  useEffect(() => {
    if (!xpBurst) return

    const timeoutId = window.setTimeout(() => {
      setXPBurst(null)
    }, 1200)

    return () => window.clearTimeout(timeoutId)
  }, [xpBurst])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  const saveName = (nextName) => {
    const trimmedName = nextName.trim()
    setName(trimmedName || 'User')
  }

  const resetStats = () => {
    const shouldReset = window.confirm(
      'Reset XP, level, streak, and task progress?',
    )

    if (!shouldReset) return

    // Reset the stored values first so refreshes stay in sync with the UI.
    localStorage.setItem(STORAGE_KEYS.xp, '0')
    localStorage.setItem(STORAGE_KEYS.level, '0')
    localStorage.setItem(STORAGE_KEYS.streak, '0')
    localStorage.setItem(STORAGE_KEYS.lastCompletedDate, '')
    localStorage.setItem(
      STORAGE_KEYS.tasks,
      JSON.stringify(
        tasks.map((task) => ({
          ...task,
          completed: false,
          xpAwarded: false,
        })),
      ),
    )

    setXP(0)
    setLevel(0)
    setStreak(0)
    setLastCompletedDate('')
    setXPBurst(null)
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        completed: false,
        xpAwarded: false,
      })),
    )
  }

  const addTask = (title) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
      xpAwarded: false,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const updateStreakForToday = () => {
    const today = getDateString()

    // If streak was already counted today, do nothing.
    if (lastCompletedDate === today) return

    const yesterday = getYesterdayString()
    if (lastCompletedDate === yesterday) {
      setStreak((prevStreak) => prevStreak + 1)
    } else {
      setStreak(1)
    }

    setLastCompletedDate(today)
  }

  const toggleTask = (taskId) => {
    const selectedTask = tasks.find((task) => task.id === taskId)
    if (!selectedTask) return
    const shouldAwardXP = !selectedTask.completed && !selectedTask.xpAwarded

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              xpAwarded: shouldAwardXP ? true : task.xpAwarded,
            }
          : task,
      ),
    )

    // Give XP only once per task.
    if (shouldAwardXP) {
      setXP((prevXP) => {
        const nextXP = prevXP + 10
        setLevel(Math.floor(nextXP / 50))
        return nextXP
      })
      setXPBurst({ id: Date.now() })
      updateStreakForToday()
    }
  }

  return (
    <div className={`app theme-${theme}`}>
      <Header theme={theme} name={name} onToggleTheme={toggleTheme} onSaveName={saveName} />
      <Stats xp={xp} level={level} streak={streak} onResetStats={resetStats} />
      {xpBurst ? <div className="xp-burst">+10 XP ✨</div> : null}
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
    </div>
  )
}

export default App
