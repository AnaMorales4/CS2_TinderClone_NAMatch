import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/authContext";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  MenuItem,
  Paper,
} from "@mui/material";
import logo from "../images/LogoNAMatch.png"; // Asegúrate que esté en `public/` o ajusta la ruta

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    profilePhoto: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      //login(data.token);
      login(data.token, data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      console.error("Error al registrarse:", err);
      setError(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: 80, height: 80, marginBottom: 10 }}
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to right, #FD5068, #FF7854)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NAMatch
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Crea tu cuenta para empezar
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
          <TextField
            fullWidth
            label="URL de foto de perfil (opcional)"
            name="profilePhoto"
            value={formData.profilePhoto}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              bgcolor: "#FD5068",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#FF7854",
              },
            }}
          >
            Registrarse
          </Button>
        </form>

        {error && (
          <Typography sx={{ color: "red", mt: 2, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2">
            ¿Ya tienes cuenta?
            <Button
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                color: "#FD5068",
                fontWeight: "bold",
                ml: 1,
              }}
            >
              Inicia sesión
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
