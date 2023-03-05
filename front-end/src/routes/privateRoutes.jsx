import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth"


export const PrivateRoute = () =>{
    const {signed} = useContext(AuthContext);

    return signed ? <Outlet/> : <Navigate to="/login"/>
}