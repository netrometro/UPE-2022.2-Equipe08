import logo from '../assets/pinned-notes.png'
import './login.css'
import {Link} from "react-router-dom"
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Navigate } from 'react-router-dom'

function LoginForm (){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {signIn, signed} = useContext(AuthContext)

    const handleSignIn = async (e) => {
        e.preventDefault();
        const data = {
            username,
            password,
        };
        await signIn(data);
    };

     if (signed) {
        return <Navigate to="/home"/>    
     } else{

         return(
             <section className='area-login'>
             <div className='login'>
                 <div>
                     <img src={logo} alt='logo'></img>
                     <h1>Login</h1>
                 </div>
                 <form onSubmit={handleSignIn}>
                     <input type='text' placeholder='username' autoFocus value={username} onChange={e => setUsername(e.target.value)}></input>
                     <input type='password' placeholder='password' autoFocus value={password} onChange={e => setPassword(e.target.value)}></input>
                     <button type='submit'>Submit</button>
                 </form>
                  <p>Ainda não tem uma conta? <Link to="/register">Cadastre-se</Link></p> 
             </div>
         </section>
         )
     }

}

export default LoginForm;