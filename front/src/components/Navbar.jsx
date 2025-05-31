import {
  AppBar,
  Tooltip,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const hasProfilePhoto = user?.profilePhoto;

  return (
    <AppBar
      position="fixed" //static -> fixed
      sx={{
        background: "linear-gradient(to right, #FD5068, #FF7854)",
        boxShadow: 3,
        zIndex: (theme) => theme.zIndex.drawer + 1, // 👈 asegura que esté por encima de todo
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/home"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          NAMatch
        </Typography>

        {/*La parte de la navegación*/}
        <Box display="flex" gap={2}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/home"
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/profile"
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Perfil
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/matches"
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Matches
          </Button>
        </Box>

        {/* Usuario y Logout */}
        <Box display="flex" alignItems="center" gap={1}>
          {hasProfilePhoto ? (
            <Avatar
              alt={user.name}
              src={user.profilePhoto}
              sx={{ width: 36, height: 36, boxShadow: 1 }}
            />
          ) : (
            <Avatar
              sx={{ bgcolor: "#fff", color: "#FD5068", width: 36, height: 36 }}
            >
              <PersonIcon />
            </Avatar>
          )}
          <Typography variant="body1" sx={{ color: "#fff", fontWeight: 500 }}>
            {user?.name || "Usuario"}
          </Typography>
          <Tooltip title="Cerrar sesión">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
