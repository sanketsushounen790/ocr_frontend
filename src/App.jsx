import Dashboard from './component/Dashboard'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div style={{ "width": "100%" }}>
        <Dashboard />
      </div>

    </QueryClientProvider>
  )
}

export default App
