// src/components/Navbar.js
import { AppBar, Tooltip,Toolbar, Typography, Avatar, Box, Button, IconButton } from '@mui/material';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import PersonIcon  from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const hasProfilePhoto = user?.profilePhoto;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/home" sx={{ color: '#fff', textDecoration: 'none' }}>
          NA Match
        </Typography>
        <Box display="flex" gap={2}>
          <Button color="inherit" component={RouterLink} to="/home">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile">
            Perfil
          </Button>
          <Button color="inherit" component={RouterLink} to="/matches">
            Matches
          </Button>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          {hasProfilePhoto ? (
            <Avatar alt={user.name} src={user.profilePhoto} />
          ) : (
            <Avatar sx={{ bgcolor: '#fff', color: 'black' }}>
              <PersonIcon />
            </Avatar>
          )}
          <Typography variant="body1">{user?.name || 'Usuario'}</Typography>
         <Tooltip title="cerrar sesion">
          <IconButton color='inherit' onClick={handleLogout}>
            <LogoutIcon/>
          </IconButton>
         </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
