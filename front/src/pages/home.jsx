import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  CircularProgress,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";

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

      <Grid container spacing={2} justifyContent="center" mt={4}>
        {users.map((u) => (
          <Grid key={u._id} item xs={12} sm={6} md={4} lg={3} display="flex">
            {" "}
            {/* hace que todas las tarjetas midan lo mismo */}
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              {/* --- Zona de imagen / avatar ------------- */}
              {u.profilePhoto?.length ? (
                <CardMedia
                  component="img"
                  height={PHOTO_HEIGHT}
                  image={u.profilePhoto[0]}
                  alt={u.name}
                  onError={(e) => {
                    // Si la imagen falla, quitamos src y dejamos que se renderice el avatar
                    e.target.onerror = null;
                    e.target.src = "";
                    e.target.style.display = "none";
                    e.target.parentElement.appendChild(avatarFallback(u.name));
                  }}
                />
              ) : (
                avatarFallback(u.name)
              )}

              {/* --- Contenido -------------------------- */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  {u.name}, {u.age}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {u.gender.charAt(0).toUpperCase() + u.gender.slice(1)}
                </Typography>

                <Box mb={1}>
                  {u.interests?.map((interest, i) => (
                    <Chip
                      key={i}
                      label={interest}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {u.bio}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/profile/${u._id}`)}
                >
                  Ver perfil
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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
