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

const UserCardList = ({ users }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} justifyContent="center" mt={4}>
      {users.map((u) => (
        <Grid key={u._id} item xs={12} sm={6} md={4} lg={3} display="flex">
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
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

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">
                {u.name}, {u.age}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
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
  );
};

export default UserCardList;
