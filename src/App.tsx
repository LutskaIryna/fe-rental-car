import { Toaster } from "@/components/ui/sonner";
import './App.css'
import { AppRoutes } from './routers'

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  )
}

export default App
