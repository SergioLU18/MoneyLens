import * as React from 'react';
import { Typography, TextField } from '@mui/material';
import { Container } from './styles';
import { supabase } from '../../supabaseClient';


export const Auth: React.FC = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if(error) {
        console.log(error.message)
      }
    }

    return (
        <Container>
            <Typography variant="h4">
                Welcome back!
            </Typography>
            <TextField 
                label="Email" 
                value={email} 
                onChange={(e) => {setEmail(e.target.value)}}
                required 
                />
            <TextField label="Password" required type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={handleLogin}>
                Login
            </button>
        </Container>
    )
}