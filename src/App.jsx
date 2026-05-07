import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import AppShell from './components/AppShell'
import { ProductivityProvider } from './context/ProductivityContext'
import Achievements from './pages/Achievements'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import FocusMode from './pages/FocusMode'
import Missions from './pages/Missions'
import Settings from './pages/Settings'
import './styles.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppShell />}>
      <Route index element={<Dashboard />} />
      <Route path="missions" element={<Missions />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="achievements" element={<Achievements />} />
      <Route path="focus-mode" element={<FocusMode />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
  {
    future: {
      v7_startTransition: true,
    },
  },
)

function App() {
  return (
    <ProductivityProvider>
      <RouterProvider router={router} />
    </ProductivityProvider>
  )
}

export default App
