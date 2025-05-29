// src/components/Navbar.js
import { AppBar, Toolbar, Typography, Avatar, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const hasProfilePhoto = user?.profilePhoto;

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: '#fff', textDecoration: 'none' }}>
          NA Match
        </Typography>
        <Box display="flex" gap={2}>
          <Button color="inherit" component={RouterLink} to="/">
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
