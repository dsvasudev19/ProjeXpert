import { AuthProvider } from './contexts/AuthContext'
import Router from './Routers/Router'
import { Toaster } from 'react-hot-toast'
import WithAuth from './utils/WithAuth'
import { SocketProvider } from './contexts/SocketContext'
// import WithAuth from './utils/WithAuth'
function App() {

  return (
    <>
      <AuthProvider>
        <WithAuth>
          <SocketProvider>
          <Toaster reverseOrder={true} position="top-right" />
          <Router />
          </SocketProvider>
        </WithAuth>
      </AuthProvider>
    </>
  )
}

export default App
