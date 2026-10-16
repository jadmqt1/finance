import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AccueilPage } from '../features/accueil/AccueilPage'
import { AppShell } from '../layout/AppShell'

const queryClient = new QueryClient()

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <QueryClientProvider client={queryClient}>
        {/* HashRouter: the app runs inside the Power Apps host, which owns the URL path */}
        <HashRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<AccueilPage />} />
              <Route path="*" element={<p>Page en construction.</p>} />
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </FluentProvider>
  )
}
