import React, { useContext } from "react";
import { UserContext } from "./ContextAPI/Context";
import { Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Box = styled("div")(({theme})=>({
    width:"80vw",

    display:"flex",
    flexDirection:"column",
    margin:"80px auto",
    justifyContent:"center",
    alignItems:"center"
}))

export const Profile = () =>{

    const {user} = useContext(UserContext)
    const navigate = useNavigate()


    const handleBack = ()=>{
        navigate("/main")
    }


    


    
    return(
        <>

        <Box>
            <Typography>{`Username : ${user.username}`}</Typography>
            <Typography>{`Email : ${user.email}`}</Typography>
            <Typography>{`UserId : ${user.id}`}</Typography>
            <Button onClick={handleBack}>Back</Button>



        </Box>
        
        
        
        
        
        
        </>
    )
}