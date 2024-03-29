import { Login } from './pages/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_OAUTH } from './constants'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Map } from './pages/Map'
import { Quest } from './pages/Quest'

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH.clientId}>
      <BrowserRouter>
        <Routes>
            <Route path={'/login'} Component={Login} />
            <Route path={'/map'} Component={Map} />
            <Route path={'/quest'} Component={Quest} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
