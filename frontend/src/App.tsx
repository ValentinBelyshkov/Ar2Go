import { Login } from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Map } from './pages/Map'
import { Quest } from './pages/Quest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path={'/login'} Component={Login} />
          <Route path={'/map'} Component={Map} />
          <Route path={'/quest'} Component={Quest} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
