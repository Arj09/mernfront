import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Typography, styled , Box, Alert, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Http } from "./Http";
import { UserContext } from "./ContextAPI/Context";


const Form = styled('form')(({theme})=>({
    display:"flex",
    width:"80vw",
    flexDirection:'column',
    margin:"10px auto", 
    justifyContent:"center",
    alignItems:"center",
    gap:"20px 0",
    border:"0.2px solid blue",
    boxShadow:"20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
    paddingTop:"50px",
    paddingBottom:"50px"

}))


const ContainerBox = styled('div')(({theme})=>({
    width:"80%",
    display:"grid",
    margin:"20px auto",
   
    gridTemplateRows:"1fr",
    gridTemplateColumns:"1fr 1fr 1fr 1fr",
    alignItems:"center",
    textAlign:"center",
    gap:"30px",
    padding:"20px",
    backgroundColor:"white",
    justifyContent:"space-between",
    padding:"10px",
    [theme.breakpoints.down('md')]:{
        gridTemplateColumns:"1fr 1fr",

    },
    [theme.breakpoints.down('sm')]:{
        gridTemplateColumns:"1fr",

    }
   
    

}))


const CardBox = styled('div')(({theme})=>({
    border:"0.2px solid blue"
    




}))


const ButtonTwo = styled('div')(({theme})=>({
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around"
    
    




}))
export const Main = ()=>{
    
    const [data, setData] = useState([])
    const [contact, setContact] = useState({})
    const [change , setChange] = useState(0)
    const [show, setShow] = useState(true)
    const [id, setID] = useState(0);
    const [index, setIndex] = useState(0)

    const {setLogin} = useContext(UserContext)

   



    const handleData = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setContact(contact=>({...contact, [name]: value}))
    }

    const handleSumbitData = (e)=>{
        e.preventDefault()
        Http.post("/api/contact",{
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            setChange(change=>change+1)
            console.log(res.data)
            
        }).catch((err)=>{
            console.log(err)
        })
        setContact({name:"", email:"", phone:""})
        
        
        
        
        
    }

    const handleGotoEdit = (id, index)=>{
        setID(id)
        setIndex(index)
        setShow(false)

    }




    const handleEdit = ()=>{
        Http.put(`api/contact/${id}`,{
            name: contact.name ? contact.name : data[index].name,
            email: contact.email ? contact.email : data[index].email,
            phone: contact.phone ? contact.phone : data[index].phone
        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            setChange(change=>change+1)
            setShow(true)
            console.log(res.data)
            
            
        }).catch((err)=>{
            console.log(err)
        })
        setContact({name:"", email:"", phone:""})

    }

    const handleDelete = (id)=>{
        Http.delete(`api/contact/${id}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            setChange(change=>change+1)
            console.log(res.data)
            
        }).catch((err)=>{
            console.log(err)
        })

    }

    useEffect(()=>{
        Http.get('api/contact',{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
            }

        }).then((res)=>{
            console.log(res.data)
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [change])
    

    if(localStorage.getItem("Token")){
        setLogin(true)
        
    }

return(
    <>
    <Navbar/>

    {
        show ? (
            <>
            <Typography variant="h4" sx={{textAlign:"center", pt:"50px", pb:"30px"}}> Add contact</Typography>
            <Form onSubmit={handleSumbitData}>
                <input type='text' placeholder="Enetr name"  style={{width:"80%", padding:"10px"}} name="name" value={contact.name}  onChange={handleData}  required/>
                <input type="email" placeholder="Enter email"  style={{width:"80%", padding:"10px"}} name="email" value={contact.email}  onChange={handleData} required/>
                <input type="number" placeholder="Enter number"  style={{width:"80%", padding:"10px"}} name="phone" value={contact.phone}  onChange={handleData}required />
                <button style={{width:"82%", padding:"10px 20px", color:"white", backgroundColor:"blue", border:"0.2px solid blue", }}>Add Contact</button>
            </Form>

            <ContainerBox>
                {
                    data && data.map((data, index)=>{
                        return(
                            <CardBox key={index}>
                                <Box sx={{padding:" 20px"}}>
                                    <Typography > {data.name}</Typography>
                                    <Typography > {data.email}</Typography>
                                    <Typography   sx={{paddingBottom:"10px"}}>{data.phone} </Typography>
                                    <ButtonTwo>
                                        <Typography   sx={{textAlign:"center", color:'white', cursor:"pointer", padding:"5px 20px", backgroundColor:"blue" }} onClick={()=>handleGotoEdit(data._id, index)}>Edit</Typography>
                                        <Typography   sx={{textAlign:"center", color:'white', cursor:"pointer", padding:"5px 20px", backgroundColor:"blue" }} onClick={()=>handleDelete(data._id)}>Delete</Typography>
                                    </ButtonTwo>
                                </Box>

                            </CardBox>

                        )
                    })
                }
            </ContainerBox>




            
            </>
        ):(

            <>
            <Typography variant="h4" sx={{textAlign:"center", pt:"50px", pb:"30px"}}> Update contact</Typography>
            <Typography variant="h4" sx={{textAlign:"center", pt:"50px", pb:"30px"}}> Choose one field or all</Typography>
            <Form onSubmit={handleEdit}>
                <input type='text' placeholder="Enetr name"  style={{width:"80%", padding:"10px"}} name="name" value={contact.name}  onChange={handleData}  />
                <input type="email" placeholder="Enter email"  style={{width:"80%", padding:"10px"}} name="email" value={contact.email}  onChange={handleData} />
                <input type="number" placeholder="Enter number"  style={{width:"80%", padding:"10px"}} name="phone" value={contact.phone}  onChange={handleData} />
                <button style={{width:"82%", padding:"10px 20px", color:"white", backgroundColor:"blue", border:"0.2px solid blue", }}>Update Contact</button>
            </Form>
            
            </>
        )
    }
    
    
    

    

    
            


    </>
)
}