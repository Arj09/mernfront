import React, { useContext, useState } from "react";
import { Box, InputBase, Typography, styled} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Context";
import { Http } from "../Http";


const Form = styled('form')(({theme})=>({
    display:"flex",
    width:"30vw",
    flexDirection:'column',
    margin:"10px auto", 
    justifyContent:"center",
    alignItems:"center",
    gap:"20px 0",
    border:"0.2px solid blue",
    boxShadow:"20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
    paddingTop:"50px",
    paddingBottom:"50px",
    [theme.breakpoints.down('md')]:{
        width:"50vw",



    },
    [theme.breakpoints.down('sm')]:{
        width:"80vw",

    }
    

}))
export const Login = ()=>{
    const [show, setShow] = useState(true)
    const [logindata, setLoginData] = useState({})
    const [signupdata, setSignupData] = useState({})
    const navigate = useNavigate()
    const {setLogin} = useContext(UserContext)



    const handleLogin = (e)=>{

        const name = e.target.name
        const value = e.target.value
        setLoginData(logindata=>({...logindata, [name]:value}))

    }

    const handlesignup = (e) =>{
        const name = e.target.name
        const value = e.target.value
        setSignupData(signupdata=>({...signupdata, [name]:value }))

    }



    const handlelogin = ()=>{
        show ? setShow(false) : setShow(true)
    }

    const handleUserlogin = (e)=>{
        e.preventDefault();

        const { email, password} = logindata
        Http.post('api/user/login',{
            email,
            password


        }).then((res)=>{
            localStorage.setItem("Token", res.data.accessToken)
            console.log(res.data)
            setLogin(true)
            navigate('/main')
        }).catch((err)=>{
            console.log(logindata)
        })

        
    }
    

    const handleUserSignup = (e)=>{
        e.preventDefault();

        const { username,email, password} = signupdata
        Http.post('api/user/register',{
            username,
            email,
            password


        }).then((res)=>{
            
            setShow(true)
        }).catch((err)=>{
            console.log(err)
        })

        setSignupData({username:"", email:"", phone:""})

    }



    

    


    
return(
    <Box>
        <Typography variant="h3" sx={{textAlign:"center", pt:"100px", pb:"40px"}}>TecoNico</Typography>
        {
            show ? (
                <Form onSubmit={handleUserlogin}>
                    <input type="email" placeholder="Enter email"  style={{width:"80%", padding:"10px"}}  name="email" value={logindata.email} onChange={handleLogin}  required/>
                    <input type="text" placeholder="Enter password"  style={{width:"80%", padding:"10px"}} name="password" value={logindata.password} onChange={handleLogin} required/>
                    <button style={{width:"84%", padding:"10px 20px", color:"white", backgroundColor:"blue", border:"0.2px solid blue", }}>Login</button>
                    <Typography sx={{textAlign:"center", cursor:'pointer'}}  onClick = {handlelogin}>New User signup</Typography>

                </Form>
            ):(
                <Form onSubmit={handleUserSignup}>
                
                    <input type="text" placeholder="Enter name"  style={{width:"80%",pt:"50px" ,padding:"10px "}}  name="username" value={signupdata.username} onChange={handlesignup} required />
                    <input type="email" placeholder="Enter email"  style={{width:"80%", padding:"10px"}}  name="email" value={signupdata.email} onChange={handlesignup} required />
                    <input type="text" placeholder="Enter password"  style={{width:"80%", padding:"10px"}}  name="password" value={signupdata.password} onChange={handlesignup} required />
                    <button style={{width:"84%", padding:"10px 20px", color:"white", backgroundColor:"blue", border:"0.2px solid blue", }}>Signup</button>
                    <Typography sx={{textAlign:"center", cursor:'pointer'}}  onClick = {handlelogin}> Already User login </Typography>

                </Form>

                
            )

        }
    </Box>
)
}