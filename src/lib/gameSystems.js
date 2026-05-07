const DIFFICULTY_REWARDS = {
  Easy: 10,
  Medium: 20,
  Hard: 30,
}

const PRIORITY_WEIGHTS = {
  High: 0,
  Medium: 1,
  Low: 2,
}

const CATEGORY_ORDER = ['Study', 'Coding', 'Gym', 'Health', 'Personal']
const PRIORITY_ORDER = ['High', 'Medium', 'Low']
const DIFFICULTY_ORDER = ['Easy', 'Medium', 'Hard']
const MS_PER_DAY = 24 * 60 * 60 * 1000

export const STORAGE_KEYS = {
  tasks: 'tasks',
  xp: 'xp',
  level: 'level',
  streak: 'streak',
  lastCompletedDate: 'lastCompletedDate',
  theme: 'theme',
  user: 'user',
  username: 'username',
  achievements: 'achievements',
}

export const MISSION_CATEGORIES = CATEGORY_ORDER
export const MISSION_PRIORITIES = PRIORITY_ORDER
export const MISSION_DIFFICULTIES = DIFFICULTY_ORDER

export const RANKS = [
  { name: 'Rookie', minimumXP: 0, description: 'Building momentum' },
  { name: 'Bronze', minimumXP: 100, description: 'Finding a rhythm' },
  { name: 'Silver', minimumXP: 250, description: 'Consistent output' },
  { name: 'Gold', minimumXP: 500, description: 'High performance' },
  { name: 'Elite', minimumXP: 1000, description: 'Mission control mode' },
  { name: 'Mythic', minimumXP: 2000, description: 'Operating at the top tier' },
]

export const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'rookie',
    title: 'Rookie',
    description: 'Complete your first mission.',
    metric: 'completedMissions',
    target: 1,
  },
  {
    id: 'grinder',
    title: 'Grinder',
    description: 'Reach 100 XP.',
    metric: 'xp',
    target: 100,
  },
  {
    id: 'focus-master',
    title: 'Focus Master',
    description: 'Keep a 7-day streak alive.',
    metric: 'streak',
    target: 7,
  },
  {
    id: 'elite',
    title: 'Elite',
    description: 'Complete 50 missions.',
    metric: 'completedMissions',
    target: 50,
  },
  {
    id: 'category-champion',
    title: 'Category Champion',
    description: 'Complete missions in all five categories.',
    metric: 'completedCategoryCount',
    target: MISSION_CATEGORIES.length,
  },
]

const displayDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})
const weekdayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
})

const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)

const toDateKey = (date = new Date()) => date.toISOString().split('T')[0]

const parseDateKey = (dateKey) => {
  if (!dateKey) return null

  const parsedDate = new Date(`${dateKey}T00:00:00`)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

export const getDateKey = (date = new Date()) => toDateKey(date)

export const getTomorrowDateKey = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return getDateKey(tomorrow)
}

export const getYesterdayDateKey = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return getDateKey(yesterday)
}

export const getDifficultyReward = (difficulty) => DIFFICULTY_REWARDS[difficulty] ?? 10

export const getDifficultyFromReward = (reward) => {
  if (reward >= 30) return 'Hard'
  if (reward >= 20) return 'Medium'
  return 'Easy'
}

export const formatMissionDate = (dateKey) => {
  const parsedDate = parseDateKey(dateKey)
  if (!parsedDate) return 'Flexible'

  return displayDateFormatter.format(parsedDate)
}

export const getDueDateLabel = (dateKey) => {
  if (!dateKey) return 'Flexible'

  const today = getDateKey()
  const tomorrow = getTomorrowDateKey()

  if (dateKey === today) return 'Today'
  if (dateKey === tomorrow) return 'Tomorrow'

  const parsedDate = parseDateKey(dateKey)
  if (!parsedDate) return 'Flexible'

  return formatMissionDate(dateKey)
}

export const isMissionOverdue = (mission) => Boolean(mission.dueDate) && !mission.completed && mission.dueDate < getDateKey()

export const normalizeMission = (mission, index = 0) => {
  if (!mission) return null

  const title = typeof mission.title === 'string' ? mission.title.trim() : ''
  if (!title) return null

  const existingReward = Number(mission.xpReward)
  const inferredDifficulty = DIFFICULTY_ORDER.includes(mission.difficulty)
    ? mission.difficulty
    : getDifficultyFromReward(existingReward || 10)
  const difficulty = DIFFICULTY_ORDER.includes(mission.difficulty) ? mission.difficulty : inferredDifficulty
  const priority = PRIORITY_ORDER.includes(mission.priority) ? mission.priority : 'Medium'
  const category = CATEGORY_ORDER.includes(mission.category) ? mission.category : 'Personal'
  const createdAt = Number(mission.createdAt) || Date.now() - index * 1000
  const xpReward = existingReward || getDifficultyReward(difficulty)
  const dueDate = typeof mission.dueDate === 'string' ? mission.dueDate : ''
  const completed = Boolean(mission.completed)
  const completedAt = mission.completedAt ? Number(mission.completedAt) : completed ? createdAt : null
  const xpAwarded = Boolean(mission.xpAwarded ?? completed)

  return {
    id: mission.id ?? createdAt + index,
    title,
    completed,
    difficulty,
    priority,
    category,
    dueDate,
    xpReward,
    createdAt,
    completedAt,
    xpAwarded,
  }
}

export const createMissionFromInput = (input) => {
  const missionInput = typeof input === 'string' ? { title: input } : input

  return normalizeMission(
    {
      ...missionInput,
      completed: false,
      completedAt: null,
      xpAwarded: false,
      difficulty: missionInput?.difficulty || 'Easy',
      priority: missionInput?.priority || 'Medium',
      category: missionInput?.category || 'Personal',
      dueDate: missionInput?.dueDate || '',
      xpReward: getDifficultyReward(missionInput?.difficulty || 'Easy'),
      createdAt: Date.now(),
    },
  )
}

export const hydrateMissions = (savedMissions) => {
  if (!Array.isArray(savedMissions)) return []

  return savedMissions.map((mission, index) => normalizeMission(mission, index)).filter(Boolean)
}

export const getRankProgress = (xp) => {
  let currentRank = RANKS[0]

  for (const rank of RANKS) {
    if (xp >= rank.minimumXP) {
      currentRank = rank
    }
  }

  const currentRankIndex = RANKS.findIndex((rank) => rank.name === currentRank.name)
  const nextRank = RANKS[currentRankIndex + 1] || null
  const rankSpan = nextRank ? nextRank.minimumXP - currentRank.minimumXP : 1
  const xpIntoRank = xp - currentRank.minimumXP
  const rankProgress = nextRank ? clamp((xpIntoRank / rankSpan) * 100, 0, 100) : 100
  const xpToNextRank = nextRank ? Math.max(nextRank.minimumXP - xp, 0) : 0

  return {
    currentRank,
    nextRank,
    rankProgress,
    xpToNextRank,
    currentRankIndex,
  }
}

export const getMissionAnalytics = (missions) => {
  const totalMissions = missions.length
  const completedMissions = missions.filter((mission) => mission.completed).length
  const pendingMissions = totalMissions - completedMissions
  const completionPercentage = totalMissions === 0 ? 0 : Math.round((completedMissions / totalMissions) * 100)

  const completedMissionList = missions.filter((mission) => mission.completed)
  const completedCategories = new Set(completedMissionList.map((mission) => mission.category))
  const completedCategoryCount = completedCategories.size

  const categoryBreakdown = CATEGORY_ORDER.map((category) => {
    const categoryMissions = missions.filter((mission) => mission.category === category)
    const categoryCompleted = categoryMissions.filter((mission) => mission.completed)
    return {
      name: category,
      total: categoryMissions.length,
      completed: categoryCompleted.length,
      xp: categoryCompleted.reduce((sum, mission) => sum + mission.xpReward, 0),
    }
  })

  const priorityBreakdown = PRIORITY_ORDER.map((priority) => ({
    name: priority,
    total: missions.filter((mission) => mission.priority === priority).length,
  }))

  const xpByCategory = categoryBreakdown.map((item) => ({
    name: item.name,
    xp: item.xp,
  }))

  const sortedByDueDate = missions
    .slice()
    .sort((leftMission, rightMission) => {
      const leftCompleted = Number(leftMission.completed)
      const rightCompleted = Number(rightMission.completed)
      if (leftCompleted !== rightCompleted) return leftCompleted - rightCompleted

      const leftDueDate = leftMission.dueDate || '9999-12-31'
      const rightDueDate = rightMission.dueDate || '9999-12-31'
      if (leftDueDate !== rightDueDate) return leftDueDate.localeCompare(rightDueDate)

      const priorityDelta = PRIORITY_WEIGHTS[leftMission.priority] - PRIORITY_WEIGHTS[rightMission.priority]
      if (priorityDelta !== 0) return priorityDelta

      return rightMission.createdAt - leftMission.createdAt
    })

  const upcomingMissions = sortedByDueDate.filter((mission) => !mission.completed).slice(0, 4)

  const recentMissions = missions
    .slice()
    .sort((leftMission, rightMission) => {
      const leftActivity = leftMission.completedAt || leftMission.createdAt
      const rightActivity = rightMission.completedAt || rightMission.createdAt
      return rightActivity - leftActivity
    })
    .slice(0, 4)

  const weeklyProductivity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - index))
    const dateKey = getDateKey(date)
    const completedOnDate = completedMissionList.filter((mission) => getDateKey(new Date(mission.completedAt || mission.createdAt)) === dateKey)

    return {
      dateKey,
      label: weekdayFormatter.format(date),
      completed: completedOnDate.length,
      xp: completedOnDate.reduce((sum, mission) => sum + mission.xpReward, 0),
    }
  })

  const productivityScore = clamp(
    Math.round(
      completionPercentage * 0.45 +
        Math.min((xpByCategory.filter((item) => item.xp > 0).length || 0) * 5, 20) +
        Math.min(completedCategoryCount * 4, 20) +
        Math.min(missions.length * 1.5, 10) +
        Math.min((missions.filter((mission) => !mission.completed && mission.dueDate && mission.dueDate < getDateKey()).length || 0) * -2, 0) +
        Math.min(weeklyProductivity.reduce((sum, day) => sum + day.completed, 0) * 1.5, 20),
    ),
    0,
    100,
  )

  return {
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
  }
}

export const getAchievementProgress = (definition, metrics) => {
  const currentValue =
    definition.metric === 'xp'
      ? metrics.xp
      : definition.metric === 'streak'
        ? metrics.streak
        : definition.metric === 'completedCategoryCount'
          ? metrics.completedCategoryCount
          : metrics.completedMissions

  const targetValue = definition.target
  const percentage = clamp((currentValue / targetValue) * 100, 0, 100)

  let label = `${Math.min(currentValue, targetValue)}/${targetValue}`
  if (definition.metric === 'xp') {
    label = `${Math.min(currentValue, targetValue)}/${targetValue} XP`
  } else if (definition.metric === 'streak') {
    label = `${Math.min(currentValue, targetValue)}/${targetValue} days`
  } else if (definition.metric === 'completedCategoryCount') {
    label = `${Math.min(currentValue, targetValue)}/${targetValue} categories`
  } else {
    label = `${Math.min(currentValue, targetValue)}/${targetValue} missions`
  }

  return {
    currentValue,
    targetValue,
    percentage,
    label,
    unlocked: currentValue >= targetValue,
  }
}

export const getAchievementMetrics = (missions, xp, streak) => {
  const completedMissionList = missions.filter((mission) => mission.completed)
  const completedCategoryCount = new Set(completedMissionList.map((mission) => mission.category)).size

  return {
    missions,
    xp,
    streak,
    completedMissions: completedMissionList.length,
    completedCategoryCount,
  }
}

export const getRankBadgeClass = (rankName) => `rank-${rankName.toLowerCase()}`
