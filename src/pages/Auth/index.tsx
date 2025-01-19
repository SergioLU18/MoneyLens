import * as React from 'react';
import { Typography, TextField } from '@mui/material';
import { Container, ControllerTypography, Row } from './styles';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';


export const Auth: React.FC = () => {

    const [authMode, setAuthMode] = React.useState<'login' | 'signup'>('login')
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const navigate = useNavigate();

    const resetData = () => {
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }

    const handleToggleAuthMode = (mode: 'login' | 'signup') => {
      if(authMode === mode) return;
      resetData()
      setAuthMode(mode)
    }

    const handleSubmit = async () => {
      if(authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        })
        if(error) {
          console.log(error.message)
        }
        else {
          navigate('/dashboard')
        }
      }
      else {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            emailRedirectTo: 'login'
          }
        })
        if(error) {
          console.log(error)
        }
        else {
          resetData()
        }
      }
    }

    React.useEffect(() => {
      const fetchUser = async () => {
        const { error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          navigate('/dashboard')
        }
      };

      fetchUser();
    }, [])

    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
          handleSubmit()
      }
    };


  React.useEffect(() => {
      window.addEventListener('keydown', handleEnterPress);
  
      return () => {
          window.removeEventListener('keydown', handleEnterPress);
      };
    }, [email, password, confirmPassword]);

    return (
        <Container>
            <Row>
              <ControllerTypography onClick={() => handleToggleAuthMode('login')}>
                Login
              </ControllerTypography>
              <ControllerTypography onClick={() => handleToggleAuthMode('signup')}>
                Signup
              </ControllerTypography>
            </Row>
            <Typography variant="h4">
                Welcome back!
            </Typography>
            <TextField 
                label="Email" 
                value={email} 
                onChange={(e) => {setEmail(e.target.value)}}
                required 
                />
            <TextField 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}}
                required 
                />
            {authMode === 'signup' && <TextField 
                label="Confirm password" 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => {setConfirmPassword(e.target.value)}}
                required 
                />}
            <button onClick={handleSubmit}>
                {authMode === 'login' ? "Login" : "Signup"}
            </button>
        </Container>
    )
}