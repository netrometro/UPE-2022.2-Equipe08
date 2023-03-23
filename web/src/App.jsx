import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import First from './pages/first/first.jsx'
import RegisterForm from './pages/cadastro/cadastro.jsx'
import LoginForm from './pages/Login/login.jsx'
import { Home } from './pages/home/home.jsx'
import { AuthProvider } from './context/auth.jsx'
import { PrivateRoute } from './routes/privateRoutes.jsx'
import Navbar from './components/navbar.jsx'
import { Archives } from './pages/archives/archives.jsx'
// import Archived from './pages/arquivados/archived.jsx'
//teste
export const App = () => {
  return (
    <AuthProvider>
      <Router> 
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<First/>}>
          </Route>
          <Route path="/login" element={<LoginForm/>}>
          </Route>
          <Route path="/Register" element={<RegisterForm/>}>
          </Route>
          <Route path="/home" element={<PrivateRoute/>}>
            <Route path='/home' element={<Home/>}></Route>
          </Route>
          <Route path="/archive" element={<PrivateRoute/>}>
            <Route path='/archive' element={<Archives/>}></Route>
          </Route>         
        </Routes>
      </Router>
    </AuthProvider>
  )

}

