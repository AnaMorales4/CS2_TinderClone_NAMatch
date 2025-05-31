import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getMatchesByUserId } from "../services/userService";
import UserCardList from "../components/UsersCardsList";

const Matches = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ─────────────────────────  Cargar matches  ───────────────────────── */
  useEffect(() => {
    const loadMatches = async () => {
      try {
        const userData = await getMatchesByUserId(currentUser.id);
        setMatches(userData.matches || []);
      } finally {
        setLoading(false);
      }
    };
    loadMatches();
  }, [currentUser.id]);

  /* ─────────────────────────  Loading  ───────────────────────── */
  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  /* ─────────────────────────  UI principal  ───────────────────────── */
  return (
    <Box mt={6} p={4} bgcolor="#fefefe" minHeight="calc(100vh - 64px)">
      <Typography variant="h4" fontWeight="bold" mb={6} textAlign="center">
        Tus Matches
      </Typography>

      {matches.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {matches.map((user) => (
            <Grid key={user._id} item xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                {/* Tarjeta de usuario con botones personalizados */}
                <UserCardList
                  users={[
                    {
                      ...user,
                      buttons: (
                        <Box display="flex" justifyContent="center" gap={1}>
                          {/* Botón perfil */}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate(`/profile/${user._id}`)}
                            sx={{
                              borderColor: "#FD5068",
                              color: "#FD5068",
                              textTransform: "none",
                              borderRadius: 2,
                              "&:hover": {
                                bgcolor: "#fde6e8",
                                borderColor: "#FF7854",
                              },
                            }}
                          >
                            Ver perfil
                          </Button>

                          {/* Botón chat */}
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              bgcolor: "#FD5068",
                              textTransform: "none",
                              borderRadius: 2,
                              "&:hover": {
                                bgcolor: "#FF7854",
                              },
                            }}
                            onClick={() => {
                              localStorage.setItem("chatUserId", user._id);
                              navigate(`/chat/${user._id}`);
                            }}
                          >
                            Ir al chat
                          </Button>
                        </Box>
                      ),
                    },
                  ]}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography textAlign="center" mt={4}>
          No tienes matches aún.
        </Typography>
      )}
    </Box>
  );
};

export default Matches;
