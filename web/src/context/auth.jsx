import { api } from "../services/api";
import { createContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [username, setUsername] = useState(null);

    useEffect(() =>{

        const loadingStoreData = async () => {
            const storageUser = localStorage.getItem("@Auth:user")
            const storageToken = localStorage.getItem("@Auth:token")
        
            if(storageUser & storageToken){
                setUsername(storageUser);
            }
        };
        loadingStoreData();
    }, []);
    


    const signIn = async ({username, password}) => {
       
        const response = await api.post("/login", {
            username,
            password,
        });

        if (response.data.error){
            alert (response.data.error);
        } else {
            setUsername(response.data);
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${response.data.token}`;
            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));

        }



    }

    const signOut = () => {
        localStorage.clear();
        setUsername(null)
        return <Navigate to="/"/>
    }

    return(
        <AuthContext.Provider 
            value={{
                username,
                signed: !!username,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}