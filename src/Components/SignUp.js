import { Button, TextField, Typography } from '@mui/material'
import { borderRadius, Container } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpUser } from '../config/firebaseMethods'

//Custom Styling
const flexCenter = {
  height:'90vh',
  width:'100%',
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
} 

const signUpDiv = {
  boxShadow:'5x 5px 10px black',
  padding:'20px',
  borderRadius:'20px',
  display:'flex',
  flexDirection: 'column',
  border:'2px solid lightgray',
  margin:'10px',
  maxWidth: '400px'
}

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(false)
  const navigate = useNavigate();

  const signUp = () => {
    signUpUser({name, email, password})
    .then((success) => {
      navigate('/login')
    })
    .catch((error) => {
       setMessage(true); 
      console.log(error)
    } )
  }

  return (
    <div style={flexCenter}>
       <Container maxWidth='sm' sx={signUpDiv}>

       {
          message? <div style={{color:'red', margin:'15px 0px', textAlign:'center'}}>Invalid Data</div> : null
        }

        <Typography variant='h3' sx={{textAlign:'center', margin:'20px 0px'}}>Sign Up</Typography>

        <TextField value={name} onChange={(e) => setName(e.target.value)} placeholder='Ali' label="Name" variant="outlined" margin='normal' />

        <TextField value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='ali@gmail.com' label="Email" variant="outlined" margin='normal' />

        <TextField value={password} onChange={(e) => setPassword(e.target.value) } label="Password" variant="outlined" type='password' margin='normal' />

        <Button onClick={signUp} variant='contained' sx={{padding:'12px', margin:'15px 0px'}}>Sign Up</Button>

        <div style={{textAlign:'center', margin:'15px 0px'}}>Already have an account. <span onClick={() => navigate('/login')} style={{color:'blue', cursor:'pointer'}}>Sign In</span></div>

       </Container>
    </div>
  )
}
