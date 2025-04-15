import { Toaster } from "@/components/ui/sonner";
import { AppRoutes } from './routers'

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
