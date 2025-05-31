import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { getAllUsers } from "../services/userService";
import UserCarousel from "../components/UserCarousel";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  /* ─────────────────────────  Cargar usuarios  ───────────────────────── */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.filter((u) => u._id !== user.id));
      } catch {
        setError("Error al obtener la información del perfil");
      } finally {
        setLoading(false);
      }
    };
    user?.id ? fetchUsers() : (setError("No se encontró el usuario."), setLoading(false));
  }, [user?.id]);

  /* ─────────────────────────  Estados de carga / error  ───────────────────────── */
  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );

  /* ─────────────────────────  UI principal  ───────────────────────── */
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      px={2}
      py={4}
    >
      {/* Tarjeta de bienvenida */}
      <Paper
        elevation={3}
        sx={{
          mt: '64px',
          background: "linear-gradient(to right, #FD5068, #FF7854)",
          color: "#fff",
          px: 4,
          py: 3,
          borderRadius: 3,
          textAlign: "center",
          mb: 4,
        }}
      >
        <Avatar
          src={user?.profilePhoto?.[0]}
          alt={user?.name}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            mx: "auto",
            boxShadow: 3,
            bgcolor: "#fff",
            color: "#FD5068",
          }}
        >
          {!user?.profilePhoto?.length && <PersonIcon fontSize="large" />}
        </Avatar>
        <Typography variant="h5" fontWeight="bold">
          ¡Hola, {user?.name || "Usuario"}!
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Estas son personas cerca de ti, ¿a quién le darás like?
        </Typography>
      </Paper>

      <UserCarousel users={users} />
    </Box>
  );
};

export default Home;
