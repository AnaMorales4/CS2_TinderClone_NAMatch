import { useEffect, useState } from "react";
import { getMatchesByUserId, getUserById } from "../services/userService";
import { Box, CircularProgress, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserCardList from "../components/UsersCardsList";

const Matches = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) return <CircularProgress />;
console.log(matches)

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Tus Matches
      </Typography>

      {matches.length > 0 ? (
        <Grid container spacing={2} justifyContent="center" mt={2}>
          {matches.map((user) => (
            <Grid key={user._id} item xs={12} sm={6} md={4} lg={3}>
              {/* Card de usuario: se renderiza una sola por match */}
              <UserCardList users={[user]} />

              {/* Botón adicional debajo de cada tarjeta */}
              <Box display="flex" justifyContent="center" mt={1}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    localStorage.setItem("chatUserId", user._id);
                    navigate(`/chat/${user._id}`);
                  }}
                >
                  Ir al chat
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No tienes matches aún.</Typography>
      )}
    </Box>
  );
};

export default Matches;

//capturo el id
//llamo el endpoint con ese id para poder traer la lista de matches
//renderizo los usuarios con su información para visualizarlos en una lista
