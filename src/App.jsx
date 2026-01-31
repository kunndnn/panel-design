import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppShell } from './components/layout'
import { Dashboard, TablePage, Profile, Login, Signup } from './pages'

function AppRoutes() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    )
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/users" element={<TablePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

function SettingsPlaceholder() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-[hsl(var(--muted-foreground))]">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.2)]">
        <p className="text-[hsl(var(--muted-foreground))] font-medium">
          Settings page content goes here
        </p>
      </div>
    </div>
  )
}

export default App
