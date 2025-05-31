import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper
} from '@mui/material';
import { useAuth } from '../context/authContext';
import logo from '../images/LogoNAMatch.png'; // Asegúrate de que esta ruta sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      login(data.token, data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Credenciales inválidas');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 80, height: 80, marginBottom: 10 }}
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(to right, #FD5068, #FF7854)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            NAMatch
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Inicia sesión para continuar
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Correo electrónico"
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
            sx={{
              mt: 2,
              bgcolor: '#FD5068',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#FF7854',
              },
            }}
            type="submit"
          >
            Entrar
          </Button>
        </form>

        {error && (
          <Typography sx={{ color: 'red', mt: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2">
            ¿No tienes cuenta?
            <Button
              onClick={() => navigate('/register')}
              sx={{
                textTransform: 'none',
                color: '#FD5068',
                fontWeight: 'bold',
                ml: 1,
              }}
            >
              Regístrate
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
