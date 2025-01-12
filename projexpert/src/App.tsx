import { AuthProvider } from './AuthContext'
import Router from './Router'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <>
      <AuthProvider>
        <Toaster reverseOrder={true} position="top-right" />
        <Router />
      </AuthProvider>
    </>
  )
}

export default App
