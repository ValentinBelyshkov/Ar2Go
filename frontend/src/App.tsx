import { Login } from './pages/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Map } from './pages/Map'
import { Quest } from './pages/Quest'
import { Profile } from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/profile" Component={Profile} />
          <Route path='/login' Component={Login} />
          <Route path={'/map'} Component={Map} />
          <Route path={'/quest'} Component={Quest} />
          <Route path='*' element={<Navigate to="/map" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
