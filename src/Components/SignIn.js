import { Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInUser } from '../config/firebaseMethods'
import PasswordMUI from './PasswordMUI'

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

export default function SignIn() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(false)

  const signIn = () => {
    signInUser({email, password})
    .then((success) => {
      navigate('/dashboard',{
          state: success
      })
    })
    .catch((error) => {
      setMessage(true)
    })
  }

  return (
    <div style={flexCenter}>
       <Container maxWidth='sm' sx={signUpDiv}>

       {
          message? <div style={{color:'red', margin:'15px 0px', textAlign:'center'}}>Invalid Email Address or Password</div> : null
        }

        <Typography variant='h3' sx={{textAlign:'center', margin:'20px 0px'}}>Sign In</Typography>
      
        <TextField value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='ali@gmail.com' label="Email" variant="outlined" margin='normal' />

        <TextField value={password} onChange={(e) => setPassword(e.target.value) } label="Password" variant="outlined" type='password' margin='normal' />

        <Button onClick={signIn} variant='contained' sx={{padding:'12px', margin:'15px 0px'}}>Login</Button>

        <div style={{textAlign:'center', margin:'15px 0px'}}>Don't have an account. <span onClick={() => navigate('/')} style={{color:'blue', cursor:'pointer'}}>Sign Up</span></div>

       </Container>
    </div>
  )
}

