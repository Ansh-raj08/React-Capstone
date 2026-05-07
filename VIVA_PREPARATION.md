# Project Viva Preparation

## 1. Project Overview
- **What the project does:** This is a gamified task manager. A user can add tasks, complete them, delete them, and track progress with XP, level, and streak.
- **Tech stack used:** React, Vite, JavaScript, and simple CSS.
- **Basic working flow of the project:** `App.jsx` stores the main state. It passes data and functions to child components like `Header`, `Stats`, `TaskInput`, and `TaskList`. When the user adds, completes, or deletes a task, the UI updates. The app also saves data in `localStorage`, so refresh does not remove progress.

---

## 2. Core Concepts Used (From Project Only)

### Topic: React Components

Q1: What is it?  
A: A component is a small reusable part of the UI. It can show content and handle its own logic.

Q2: How is it used in this project?  
A: The app is split into `App`, `Header`, `Stats`, `TaskInput`, `TaskList`, and `TaskItem`. Each one handles one part of the screen.

Q3: Why was this used?  
A: It keeps the code simple, clean, and easy to explain.

Q4: Alternative approach?  
A: One big file with all UI and logic. That would be harder to read and maintain.

### Topic: useState

Q1: What is it?  
A: `useState` is a React Hook used to store values that can change.

Q2: How is it used in this project?  
A: It stores tasks, XP, level, streak, theme, username, and small UI states like slice animation and history view.

Q3: Why was this used?  
A: Because the app is interactive and many values change when the user clicks or types.

Q4: Alternative approach?  
A: Class component state or a global store. That would be more complex for this small app.

### Topic: useEffect

Q1: What is it?  
A: `useEffect` runs side effects after render.

Q2: How is it used in this project?  
A: It saves data to `localStorage` and also clears the temporary XP burst message after a short time.

Q3: Why was this used?  
A: Because saving data and running timers should happen outside normal render logic.

Q4: Alternative approach?  
A: Doing those actions inside event handlers only. That would not cover all state changes.

### Topic: Props

Q1: What is it?  
A: Props are values passed from a parent component to a child component.

Q2: How is it used in this project?  
A: `App.jsx` sends values like `xp`, `level`, `streak`, `theme`, and callback functions to child components.

Q3: Why was this used?  
A: It is a simple way to share data across components.

Q4: Alternative approach?  
A: Context API or global state. That is useful for larger projects.

### Topic: Event Handling

Q1: What is it?  
A: Event handling means responding to user actions like click, change, or submit.

Q2: How is it used in this project?  
A: The app handles task add form submit, checkbox change, theme toggle click, name edit, reset button, and history toggle.

Q3: Why was this used?  
A: Because the app must react when the user interacts with it.

Q4: Alternative approach?  
A: Custom event systems. That is not needed for a beginner-level app.

### Topic: Conditional Rendering

Q1: What is it?  
A: It means showing different UI based on a condition.

Q2: How is it used in this project?  
A: It shows the empty state when there are no tasks, shows the history button only when tasks are more than 5, and switches between name text and name input.

Q3: Why was this used?  
A: It keeps the UI clean and avoids unnecessary elements.

Q4: Alternative approach?  
A: Showing every element all the time. That would make the page crowded.

### Topic: localStorage

Q1: What is it?  
A: `localStorage` is browser storage that keeps data after refresh.

Q2: How is it used in this project?  
A: It stores tasks, XP, level, streak, last completed date, theme, and username.

Q3: Why was this used?  
A: So the user does not lose progress when the page reloads.

Q4: Alternative approach?  
A: A database or backend server. That is more advanced and not needed here.

### Topic: Date Logic

Q1: What is it?  
A: It is logic based on current date and time.

Q2: How is it used in this project?  
A: It is used for the greeting message and the daily streak system.

Q3: Why was this used?  
A: Because the app needs to know the current hour and day in a simple way.

Q4: Alternative approach?  
A: A date library like Day.js. That would add another dependency.

### Topic: CSS Pseudo-elements and Animations

Q1: What is it?  
A: Pseudo-elements like `::before` and `::after` add extra visual layers without extra HTML.

Q2: How is it used in this project?  
A: They are used for glow effects, grid depth, and the red slice line when a task is completed.

Q3: Why was this used?  
A: It gives a premium look without changing the React logic.

Q4: Alternative approach?  
A: Using images or animation libraries. That would be heavier.

### Topic: Array Methods

Q1: What is it?  
A: Array methods like `map` and `filter` help update lists in a simple way.

Q2: How is it used in this project?  
A: `map` updates one task inside the list, and `filter` deletes a task by removing its item from the array.

Q3: Why was this used?  
A: It keeps list updates clean and readable.

Q4: Alternative approach?  
A: Manually changing the array by index. That is less clean.

---

## 3. Code-Based Questions (From Project Only)

### Q1: Why is `App.jsx` the main file?
A: `App.jsx` keeps the main state and main logic. It also passes data and functions to child components. This makes the app easy to control from one place.

### Q2: Why is task data stored in an array?
A: Each task is one object in an array. This makes it easy to add, delete, and update tasks. Arrays are a good choice for list UI.

### Q3: Why does each task have `completed` and `xpAwarded`?
A: `completed` shows whether the task is done. `xpAwarded` makes sure XP is given only once. This protects the gamification logic.

### Q4: Why is `toggleTask` written in `App.jsx`?
A: The main task state is already in `App.jsx`. The parent component should handle the update. Child components only trigger the action.

### Q5: Why does `TaskInput` use local state for the input text?
A: The input text is temporary UI data. It does not need to be shared with other components. Local state is enough here.

### Q6: Why does `TaskList` have `showAll` state?
A: It controls whether only 5 tasks or all tasks are shown. This keeps the list clean and easy to read.

### Q7: Why does `TaskItem` have `isSlicing` state?
A: It shows the slice animation before marking a task complete. This is a small temporary UI state for better feedback.

### Q8: Why does the app use `localStorage` inside `useEffect`?
A: Saving is a side effect. It should happen after state changes, not during render. `useEffect` is the correct place.

### Q9: Why is the username editable in the header?
A: It gives a personal feel to the app. The user can change their name anytime, and the new name is saved in `localStorage`.

### Q10: Why is the reset button inside `Stats`?
A: The reset action is related to XP, level, and streak. So it fits naturally in the stats area.

---

## 4. Feature-Based Questions (From Project Only)

### Q1: How does adding a task work?
A: The user types a title and submits the form. `TaskInput` sends the title to `App`, and `App` adds a new task object to the array.

### Q2: How does task completion work?
A: When the checkbox is clicked, the task changes from incomplete to complete. If it is the first completion, XP increases by 10 and the streak is updated.

### Q3: How does the XP system work?
A: Every new task completion gives 10 XP. The app also calculates level from XP. The XP progress bar shows progress toward the next level.

### Q4: How does the streak system work?
A: The app checks the current date and the last completed date. If tasks are completed on the next day, the streak increases. If a day is missed, the streak resets.

### Q5: How does the app remember data after refresh?
A: It saves data in `localStorage`. On page load, it reads the saved values back. This restores tasks and progress.

### Q6: How does the theme switch work?
A: The user clicks the toggle button in the header. The theme state changes between light and dark. CSS variables handle the visual changes.

### Q7: How does the name editing work?
A: Clicking the name turns it into an input field. The user can type a new name and press Enter or blur to save. The name is stored in `localStorage`.

### Q8: How does the task history view work?
A: By default, only 5 tasks are shown. If there are more, the user can toggle the rest with a button. This keeps the UI cleaner.

### Q9: How does the slice animation work?
A: When a task is checked, a short red slash appears first. After about 300 ms, the task becomes completed. This gives a game-like feedback effect.

### Q10: How does the reset stats feature work?
A: It asks for confirmation first. If the user agrees, XP, level, streak, and task completion state reset. This prevents accidental data loss.

---

## 5. Advanced / Cross Questions (From Project Only)

### Q1: What happens if `localStorage` data is missing?
A: The app uses default values like empty task list or `User`. So it still works normally.

### Q2: What happens if a task is completed twice?
A: XP is not added again because of `xpAwarded`. This stops duplicate rewards.

### Q3: What happens if a day is missed in the streak?
A: The streak resets to 0 or 1 based on the new completion. The app checks the last completed date.

### Q4: How can performance be improved?
A: For a bigger app, components could be split further. Some parts could also be memoized. For this small app, the current setup is enough.

### Q5: How would you scale this project?
A: I would add routing, a backend, and a database. I would also use Context API or a state library when the app becomes larger.

### Q6: What are the limits of this approach?
A: It works very well for a small project. But it can become harder to manage when the app grows a lot.

### Q7: What if the user enters a blank name?
A: The app falls back to `User`. This keeps the greeting clean and avoids empty display text.

### Q8: What if the slice animation timer fails?
A: The task can still be completed normally. The animation is only visual, so core logic remains safe.

---

## 6. Debugging & Edge Cases (From Project Only)

### Common bug 1: XP is added more than once
**Why it happens:** Completion logic may not check the current task state.

**Simple fix:** Use `xpAwarded` so XP is given only one time.

### Common bug 2: Streak does not reset correctly
**Why it happens:** Date comparison may be wrong or incomplete.

**Simple fix:** Compare today and yesterday carefully using date strings.

### Common bug 3: Reset button seems not to work
**Why it happens:** State resets but `localStorage` may still have old values.

**Simple fix:** Reset both React state and `localStorage`.

### Common bug 4: Greeting shows wrong time
**Why it happens:** The hour ranges may be incorrect.

**Simple fix:** Use the correct ranges: morning, afternoon, evening, and night.

### Common bug 5: Slice animation does not show
**Why it happens:** The task may become completed before the animation starts.

**Simple fix:** Set a temporary slicing state first, then complete the task after a short delay.

### Common bug 6: Task history button appears for 5 or fewer tasks
**Why it happens:** The show-more condition may be wrong.

**Simple fix:** Show the button only when `tasks.length > 5`.

### Common bug 7: Empty state looks broken
**Why it happens:** The empty message may not have enough spacing or card styling.

**Simple fix:** Keep a clear empty state message and style it like a light card.

---

## 7. Teacher Provided Questions (SEPARATE SECTION - DO NOT MIX)

### Practical Sample Questions:

### Q1: How do you pass data between components/modules?
A: In React, data is passed using props. In this project, `App` passes values and functions to `Header`, `Stats`, and `TaskList`.  
**Example:** `<Stats xp={xp} level={level} streak={streak} onResetStats={resetStats} />`

### Q2: How is state management done with `useState`?
A: `useState` stores values that can change, like input text or task list. When state changes, React re-renders the UI.  
**Example:** `const [title, setTitle] = useState('')`

### Q3: What is a side effect and how is `useEffect` used?
A: A side effect is something like saving data, starting a timer, or calling an API. In this project, `useEffect` saves data to `localStorage`.  
**Example:** `useEffect(() => { localStorage.setItem('xp', xp) }, [xp])`

### Q4: How would API fetching and rendering work?
A: First you fetch data, then store it in state, and then render the UI from that state. This project does not fetch an API, but the pattern is the same.  
**Example:** `fetch('/api/tasks').then(res => res.json()).then(setTasks)`

### Q5: How would routing/navigation work?
A: Routing is used when an app has multiple pages. This project is a single page app, so routing is not needed here. If needed, React Router can be used.  
**Example:** `<Route path="/tasks" element={<TaskPage />} />`

### Q6: What is a global state solution like Context API?
A: Context API shares data without passing props through many levels. It is useful when many components need the same data. This project is small, so props are enough.  
**Example:** `const ThemeContext = createContext()`

### Viva Topics:

### Topic: Project Explanation
**Q: Explain your project in simple words.**  
A: It is a task manager with gamification. Users can manage tasks and earn XP, level, streak, and small visual feedback. It also saves progress in the browser.

### Topic: Synchronous vs Asynchronous
**Q: What is the difference?**  
A: Synchronous code runs step by step. Asynchronous code runs later without blocking the app. In this project, timers in `useEffect` are asynchronous.

### Topic: Event Loop
**Q: What is the event loop?**  
A: It is the browser process that handles tasks, timers, and events. It helps JavaScript run non-blocking code.

### Topic: Promises
**Q: What is a Promise?**  
A: A Promise is an object for future results. It is used in async work like API calls.

### Topic: async/await
**Q: What is async/await?**  
A: It is a clean way to write asynchronous code. It is usually used with Promises and API calls.

### Topic: Rendering Concept
**Q: What is the React rendering idea?**  
A: React updates the UI when state changes. It changes only the needed parts of the page, so the UI feels fast.

### Topic: Application Type
**Q: What type of app is this?**  
A: It is a Single Page Application, or SPA. The page does not fully reload during normal use.

### Topic: State vs Normal Variables
**Q: What is the difference?**  
A: Normal variables do not update the screen by themselves. State variables do. That is why we use state for interactive values.

### Topic: Dependency Handling
**Q: Why is the dependency array important in `useEffect`?**  
A: It tells React when the effect should run again. This helps save data only when needed.

### Topic: Data Passing Problems
**Q: What is props drilling?**  
A: Props drilling means passing data through many component levels. It can become hard in large apps, but this app is small.

### Topic: Global State Solutions
**Q: What is Context API used for?**  
A: Context API gives shared state to many components without repeated prop passing. It is useful for bigger apps.

---

## 8. Rapid Fire Round
- **What is React?** A library for building user interfaces.
- **What is Vite?** A fast development tool for frontend apps.
- **What is a component?** A reusable UI block.
- **What is `useState`?** A Hook to store changing values.
- **What is `useEffect`?** A Hook for side effects.
- **What are props?** Values passed from parent to child.
- **What is `localStorage`?** Browser storage that keeps data after refresh.
- **What is SPA?** Single Page Application.
- **What is conditional rendering?** Showing UI only when needed.
- **What is event handling?** Reacting to user actions.
- **Why use `xpAwarded`?** To stop XP from being added twice.
- **Why use `filter` in delete?** To remove one task from the array.
- **Why use `map` in update?** To update one task without changing the others.
- **Why use CSS variables?** To support light and dark mode easily.
- **Why use `setTimeout` in slice?** To delay completion until the animation finishes.
- **Why use `showAll` in TaskList?** To hide or show extra tasks.
- **Why use `User` as fallback name?** To avoid empty greeting text.
- **What does `Stats` show?** XP, level, streak, and progress.
- **What does `TaskInput` do?** It adds a new task.
- **What does `TaskItem` do?** It shows one task with complete and delete actions.
