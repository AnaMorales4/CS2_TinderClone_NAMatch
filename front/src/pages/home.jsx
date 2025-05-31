import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";
import UserCardList from "../components/UsersCardsList";

const PHOTO_HEIGHT = 170; // zona fija para la imagen / avatar

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
    if (user?.id) fetchUsers();
    else {
      setError("No se encontró el usuario.");
      setLoading(false);
    }
  }, [user?.id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="calc(100vh - 64px)"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.name || "Usuario"}
      </Typography>

      <UserCardList users={users} />
    </Box>
  );
};

/* Helper que crea un Avatar con PersonIcon: */
const avatarFallback = (name) => (
  <Box
    height={PHOTO_HEIGHT}
    display="flex"
    alignItems="center"
    justifyContent="center"
    bgcolor="#e0e0e0"
  >
    <Avatar sx={{ width: 96, height: 96, bgcolor: "#9e9e9e" }}>
      <PersonIcon fontSize="large" />
    </Avatar>
  </Box>
);

export default Home;
