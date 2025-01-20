import { AuthProvider } from './contexts/AuthContext'
import Router from './Routers/Router'
import { Toaster } from 'react-hot-toast'
// import WithAuth from './utils/WithAuth'

function App() {

  return (
    <>
      <AuthProvider>
        {/* <WithAuth> */}
          <Toaster reverseOrder={true} position="top-right" />
          <Router />
        {/* </WithAuth> */}
      </AuthProvider>
    </>
  )
}

export default App
