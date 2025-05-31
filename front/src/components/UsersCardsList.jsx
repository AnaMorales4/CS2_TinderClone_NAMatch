import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const PHOTO_HEIGHT = 170;

// Avatar por defecto en caso de fallo
const avatarFallback = (name) => (
  <Box
    height={PHOTO_HEIGHT}
    display="flex"
    alignItems="center"
    justifyContent="center"
    bgcolor="#ffe5e9"
  >
    <Avatar
      sx={{
        width: 90,
        height: 90,
        bgcolor: "#FD5068",
        color: "#fff",
        boxShadow: 2,
      }}
    >
      <PersonIcon fontSize="large" />
    </Avatar>
  </Box>
);

const UserCardList = ({ users }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} justifyContent="center" mt={2}>
      {users.map((u) => (
        <Grid key={u._id} item xs={12} sm={6} md={4} lg={3} display="flex">
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              boxShadow: 3,
              borderRadius: 3,
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            {u.profilePhoto?.length ? (
              <CardMedia
                component="img"
                height={PHOTO_HEIGHT}
                image={u.profilePhoto[0]}
                alt={u.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                  e.target.style.display = "none";
                  e.target.parentElement.appendChild(avatarFallback(u.name));
                }}
              />
            ) : (
              avatarFallback(u.name)
            )}

            <CardContent sx={{ flexGrow: 1, px: 2, py: 2 }}>
              <Typography variant="h6" fontWeight="bold" color="#333">
                {u.name}, {u.age}
              </Typography>

              <Typography variant="body2" color="#777" mb={1}>
                {u.gender
                  ? u.gender.charAt(0).toUpperCase() + u.gender.slice(1)
                  : "Género no especificado"}
              </Typography>

              <Box mb={1}>
                {u.interests?.map((interest, i) => (
                  <Chip
                    key={i}
                    label={interest}
                    size="small"
                    sx={{
                      mr: 0.5,
                      mb: 0.5,
                      bgcolor: "#fde6e8",
                      color: "#FD5068",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              <Typography variant="body2" color="#555" mb={2}>
                {u.bio || "Sin biografía"}
              </Typography>

              {u.buttons ? (
                <Box mt={2}>{u.buttons}</Box>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    mt: "auto",
                    bgcolor: "#FD5068",
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#FF7854",
                    },
                  }}
                  onClick={() => navigate(`/profile/${u._id}`)}
                >
                  Ver perfil
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserCardList;
