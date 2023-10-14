import React, { useContext, useEffect, useState } from "react";
import { AppBar, Stack, Typography } from '@mui/material'
import { UserContext } from "./ContextAPI/Context";
import { useNavigate } from "react-router-dom";
import { Http } from "./Http";

export const Navbar = ()=>{

    const {login, setLogin, setUser } = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState("Current User")
    
    const navigate = useNavigate()

    const handleLogout = ()=>{
        setLogin(false)
        localStorage.removeItem("Token")
        navigate("/")
    }

    const handleLogin = ()=>{
        navigate("/")
    }

    const handleProfile = ()=>{
        navigate("/profile")
    }

    useEffect(()=>{
        Http.get("/api/user/current", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
        }).then((res)=>{
            setCurrentUser(res.data.username)
            setUser(res.data)
            console.log(res.data)
             
        }).catch((err)=>{
            navigate("/")

        })

    },[])
    

return(

    <AppBar  sx={{height:"80px", backgroundColor:"blue", color:"white", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:"10px 20px", position:"relative"}} >
        <Typography variant="h4">MernStack</Typography>
        <Stack direction={"row"} spacing={4} sx={{cursor:"pointer", display: login ? 'none' : 'flex'}}>
            <Typography onClick={handleLogin}>Login</Typography>
            <Typography>Signup</Typography>
        </Stack>

        <Stack direction={"row"} spacing={4} sx={{cursor:"pointer", display: login ? 'flex' : 'none'}}>
            <Typography onClick={handleProfile}>Profile</Typography>
            <Typography onClick={handleLogout}>Logout</Typography>
        </Stack>
        


    </AppBar>
    
)
}