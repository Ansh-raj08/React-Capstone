/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  ACHIEVEMENT_DEFINITIONS,
  STORAGE_KEYS,
  createMissionFromInput,
  getAchievementMetrics,
  getAchievementProgress,
  getDateKey,
  getYesterdayDateKey,
  getMissionAnalytics,
  getRankProgress,
  hydrateMissions,
} from '../lib/gameSystems'

const ProductivityContext = createContext(null)

const getSavedNumber = (key) => {
  const value = Number(localStorage.getItem(key) || 0)
  return Number.isNaN(value) ? 0 : value
}

const getSavedUser = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || 'null')
    if (savedUser && typeof savedUser.name === 'string') {
      return { name: savedUser.name.trim() || 'User' }
    }
  } catch {
    // Fall back to the legacy username key below.
  }

  return {
    name: localStorage.getItem(STORAGE_KEYS.username) || 'User',
  }
}

const getSavedAchievements = () => {
  try {
    const savedAchievements = JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements) || '{}')
    return savedAchievements && typeof savedAchievements === 'object' ? savedAchievements : {}
  } catch {
    return {}
  }
}

const buildUnlockedAchievementMap = (currentUnlocks, metrics) => {
  let hasChanges = false
  const nextUnlocks = { ...currentUnlocks }

  for (const definition of ACHIEVEMENT_DEFINITIONS) {
    const progress = getAchievementProgress(definition, metrics)

    if (progress.unlocked && !nextUnlocks[definition.id]) {
      nextUnlocks[definition.id] = {
        unlocked: true,
        unlockedAt: Date.now(),
      }
      hasChanges = true
    }
  }

  return {
    nextUnlocks,
    hasChanges,
  }
}

const getInitialAchievementUnlocks = () => {
  const savedUnlocks = getSavedAchievements()
  const savedMetrics = getAchievementMetrics(
    getSavedMissions(),
    getSavedNumber(STORAGE_KEYS.xp),
    getInitialStreak(),
  )

  return buildUnlockedAchievementMap(savedUnlocks, savedMetrics).nextUnlocks
}

const getSavedMissions = () => {
  try {
    const savedMissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || '[]')
    return hydrateMissions(savedMissions)
  } catch {
    return []
  }
}

const getInitialStreak = () => {
  const savedStreak = getSavedNumber(STORAGE_KEYS.streak)
  const savedLastCompletedDate = localStorage.getItem(STORAGE_KEYS.lastCompletedDate) || ''

  if (!savedLastCompletedDate) return savedStreak

  const today = getDateKey()
  const yesterday = getYesterdayDateKey()
  const missedDay = savedLastCompletedDate !== today && savedLastCompletedDate !== yesterday

  return missedDay ? 0 : savedStreak
}

export function ProductivityProvider({ children }) {
  const [missions, setMissions] = useState(getSavedMissions)
  const [xp, setXP] = useState(() => getSavedNumber(STORAGE_KEYS.xp))
  const [level, setLevel] = useState(() => Math.floor(getSavedNumber(STORAGE_KEYS.xp) / 50))
  const [lastCompletedDate, setLastCompletedDate] = useState(
    () => localStorage.getItem(STORAGE_KEYS.lastCompletedDate) || '',
  )
  const [streak, setStreak] = useState(getInitialStreak)
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) || 'light')
  const [user, setUser] = useState(getSavedUser)
  const [achievementUnlocks, setAchievementUnlocks] = useState(getInitialAchievementUnlocks)
  const [xpBurst, setXPBurst] = useState(null)

  const rankProgress = useMemo(() => getRankProgress(xp), [xp])
  const missionAnalytics = useMemo(() => getMissionAnalytics(missions), [missions])
  const achievementMetrics = useMemo(
    () => getAchievementMetrics(missions, xp, streak),
    [missions, xp, streak],
  )

  const achievements = useMemo(
    () =>
      ACHIEVEMENT_DEFINITIONS.map((definition) => {
        const progress = getAchievementProgress(definition, achievementMetrics)
        const unlockRecord = achievementUnlocks[definition.id]

        return {
          ...definition,
          ...progress,
          unlocked: Boolean(unlockRecord),
          unlockedAt: unlockRecord?.unlockedAt || null,
        }
      }),
    [achievementUnlocks, achievementMetrics],
  )

  const recentAchievements = useMemo(
    () =>
      achievements
        .filter((achievement) => achievement.unlocked)
        .sort((leftAchievement, rightAchievement) => (rightAchievement.unlockedAt || 0) - (leftAchievement.unlockedAt || 0))
        .slice(0, 4),
    [achievements],
  )

  const unlockedAchievementCount = useMemo(
    () => achievements.filter((achievement) => achievement.unlocked).length,
    [achievements],
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(missions))
    localStorage.setItem(STORAGE_KEYS.xp, String(xp))
    localStorage.setItem(STORAGE_KEYS.level, String(level))
    localStorage.setItem(STORAGE_KEYS.streak, String(streak))
    localStorage.setItem(STORAGE_KEYS.lastCompletedDate, lastCompletedDate)
    localStorage.setItem(STORAGE_KEYS.theme, theme)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEYS.username, user.name)
    localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(achievementUnlocks))
    document.body.dataset.theme = theme
  }, [missions, xp, level, streak, lastCompletedDate, theme, user, achievementUnlocks])

  useEffect(() => {
    if (!xpBurst) return

    const timeoutId = window.setTimeout(() => {
      setXPBurst(null)
    }, 1200)

    return () => window.clearTimeout(timeoutId)
  }, [xpBurst])

  const syncAchievementUnlocks = (nextMissions, nextXP, nextStreak) => {
    const nextMetrics = getAchievementMetrics(nextMissions, nextXP, nextStreak)

    setAchievementUnlocks((currentUnlocks) => {
      const { nextUnlocks, hasChanges } = buildUnlockedAchievementMap(currentUnlocks, nextMetrics)
      return hasChanges ? nextUnlocks : currentUnlocks
    })
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  const saveName = (nextName) => {
    const trimmedName = nextName.trim()
    setUser({ name: trimmedName || 'User' })
  }

  const resetStats = () => {
    const shouldReset = window.confirm(
      'Reset XP, level, streak, missions, and achievements?',
    )

    if (!shouldReset) return

    const resetMissions = missions.map((mission) => ({
      ...mission,
      completed: false,
      completedAt: null,
      xpAwarded: false,
    }))

    localStorage.setItem(STORAGE_KEYS.xp, '0')
    localStorage.setItem(STORAGE_KEYS.level, '0')
    localStorage.setItem(STORAGE_KEYS.streak, '0')
    localStorage.setItem(STORAGE_KEYS.lastCompletedDate, '')
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(resetMissions))
    localStorage.setItem(STORAGE_KEYS.achievements, '{}')

    setXP(0)
    setLevel(0)
    setStreak(0)
    setLastCompletedDate('')
    setXPBurst(null)
    setMissions(resetMissions)
    setAchievementUnlocks({})
  }

  const addMission = (missionInput) => {
    const newMission = createMissionFromInput(missionInput)
    if (!newMission) return

    const nextMissions = [...missions, newMission]
    setMissions(nextMissions)
    syncAchievementUnlocks(nextMissions, xp, streak)
  }

  const deleteMission = (missionId) => {
    const nextMissions = missions.filter((mission) => mission.id !== missionId)
    setMissions(nextMissions)
    syncAchievementUnlocks(nextMissions, xp, streak)
  }

  const toggleMission = (missionId) => {
    const selectedMission = missions.find((mission) => mission.id === missionId)
    if (!selectedMission) return

    const nextCompletedState = !selectedMission.completed
    const shouldAwardXP = nextCompletedState && !selectedMission.xpAwarded
    const nextMissions = missions.map((mission) =>
      mission.id === missionId
        ? {
            ...mission,
            completed: nextCompletedState,
            completedAt: nextCompletedState ? Date.now() : mission.completedAt,
            xpAwarded: shouldAwardXP ? true : mission.xpAwarded,
          }
        : mission,
    )

    let nextStreakValue = streak
    let nextLastCompletedDateValue = lastCompletedDate

    setMissions(nextMissions)

    if (shouldAwardXP) {
      const nextXPValue = xp + selectedMission.xpReward
      const nextLevelValue = Math.floor(nextXPValue / 50)

      const today = getDateKey()
      if (lastCompletedDate !== today) {
        const yesterday = getYesterdayDateKey()
        nextStreakValue = lastCompletedDate === yesterday ? streak + 1 : 1
        nextLastCompletedDateValue = today
      }

      setXP(nextXPValue)
      setLevel(nextLevelValue)
      setStreak(nextStreakValue)
      setLastCompletedDate(nextLastCompletedDateValue)
      setXPBurst({ id: Date.now() })
      syncAchievementUnlocks(nextMissions, nextXPValue, nextStreakValue)
    }
  }

  const currentRank = rankProgress.currentRank
  const nextRank = rankProgress.nextRank
  const rankProgressValue = rankProgress.rankProgress
  const xpToNextRank = rankProgress.xpToNextRank
  const rankIndex = rankProgress.currentRankIndex
  const xpIntoLevel = xp % 50
  const xpToNextLevel = 50 - xpIntoLevel || 50
  const xpProgress = ((xp % 50) / 50) * 100
  const rank = {
    ...currentRank,
    nextRank,
    progress: rankProgressValue,
    xpToNextRank,
    index: rankIndex,
  }

  const {
    totalMissions,
    completedMissions,
    pendingMissions,
    completionPercentage,
    completedCategoryCount,
    categoryBreakdown,
    priorityBreakdown,
    xpByCategory,
    weeklyProductivity,
    upcomingMissions,
    recentMissions,
    productivityScore,
  } = missionAnalytics

  const activeMission = upcomingMissions[0] || recentMissions[0] || null
  const name = user.name || 'User'

  return (
    <ProductivityContext.Provider
      value={{
        missions,
        xp,
        level,
        streak,
        lastCompletedDate,
        theme,
        user,
        name,
        achievements,
        recentAchievements,
        unlockedAchievementCount,
        rank,
        currentRank,
        nextRank,
        rankProgress: rankProgressValue,
        xpToNextRank,
        rankIndex,
        xpIntoLevel,
        xpToNextLevel,
        xpProgress,
        totalMissions,
        completedMissions,
        pendingMissions,
        completionPercentage,
        completedCategoryCount,
        categoryBreakdown,
        priorityBreakdown,
        xpByCategory,
        weeklyProductivity,
        upcomingMissions,
        recentMissions,
        productivityScore,
        activeMission,
        xpBurst,
        addMission,
        deleteMission,
        toggleMission,
        toggleTheme,
        saveName,
        resetStats,
      }}
    >
      {children}
    </ProductivityContext.Provider>
  )
}

export function useProductivity() {
  const context = useContext(ProductivityContext)

  if (!context) {
    throw new Error('useProductivity must be used within a ProductivityProvider')
  }

  return context
}
