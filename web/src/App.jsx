import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import First from './pages/first/first.jsx'
import RegisterForm from './pages/cadastro/cadastro.jsx'
import LoginForm from './pages/Login/login.jsx'
import { Home } from './pages/home/home.jsx'
import { AuthProvider } from './context/auth.jsx'
import { PrivateRoute } from './routes/privateRoutes.jsx'
export const App = () => {
  return (
    <AuthProvider>

      <Router> 
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </header>
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
         
        </Routes>
      </Router>
    </AuthProvider>
  )

}

