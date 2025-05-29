import { AppBar, Toolbar, Avatar, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Navbar from '../components/Navbar';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const hasProfilePhoto = user?.profilePhoto;

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="calc(100vh - 64px)" // Resta altura del AppBar (64px)
        bgcolor="#f5f5f5"
        padding={2}
      >
        {hasProfilePhoto ? (
          <Avatar
            alt={user.name}
            src={user.profilePhoto}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
        ) : (
          <Avatar sx={{ width: 100, height: 100, marginBottom: 2, bgcolor: '#bdbdbd' }}>
            <PersonIcon fontSize="large" />
          </Avatar>
        )}
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user?.name || 'Usuario'}
        </Typography>
      </Box>
    </>
  );
};

export default Home;