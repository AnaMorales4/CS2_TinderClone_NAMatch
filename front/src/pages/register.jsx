import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/authContext';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  MenuItem
} from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const{login}=useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    profilePhoto: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      login(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      console.error('Error al registrarse:', err);
      setError(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingTop: '20px' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#673ab7' }}>
          NAMatch
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: '20px', color: '#555' }}>
          Crear cuenta
        </Typography>
      </Box>

      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Edad"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          select
          label="Género"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="male">Masculino</MenuItem>
          <MenuItem value="female">Femenino</MenuItem>
          <MenuItem value="other">Otro</MenuItem>
        </TextField>
    
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '20px' }}
        >
          Registrarse
        </Button>
      </form>

      {error && <Typography sx={{ color: 'red', marginTop: '10px' }}>{error}</Typography>}

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2">
          ¿Ya tienes cuenta?
          <Button
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none', marginLeft: '5px', color: '#673ab7' }}
          >
            Inicia sesión
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
