import '../Login/login.css'
import logo from '../assets/pinned-notes.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../services/api.jsx';

function RegisterForm (){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSaveUser = async (e) => {
        e.preventDefault();
        const data = {
            username, 
            password,
        };

        const user = await api.get('/user', data)
        if(!user){
            const response = await api.post("/register", data);
            console.log(response.data);
            alert ("Cadastrado com sucesso!")
        } else{
            alert("Usuário já existe")
        }
    }

    return(
        <section className='area-login'>
        <div className='login'>
            <div>
                <img src={logo} alt='logo'></img>
                <h1>Register</h1>
            </div>
            <form onSubmit={handleSaveUser}>
                <input type='text' placeholder='username' autoFocus value={username} onChange={e => setUsername(e.target.value)}></input>
                <input type='password' placeholder='password' autoFocus value={password} onChange={e => setPassword(e.target.value)}></input>
                <button type='submit'>Submit</button>
            </form>
            <p>Já possui uma conta? <Link to="/login">Login</Link></p> 
        </div>
    </section>
    )
}

export default RegisterForm;
