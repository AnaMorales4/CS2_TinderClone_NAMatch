import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/system';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      console.log('Login exitoso:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Credenciales inválidas');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingTop: '20px' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#673ab7' }}>
          NAMatch
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: '20px', color: '#555' }}>
          Iniciar sesión
        </Typography>
      </Box>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Correo"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '20px' }}
        >
          Entrar
        </Button>
      </form>

      {error && <Typography sx={{ color: 'red', marginTop: '10px' }}>{error}</Typography>}
    </Container>
  );
};

export default Login;
