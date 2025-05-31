import {
  Box, Typography, Avatar, Chip, CircularProgress,
  Button, IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getUserById, giveLike, removeLike, hasLiked,
} from '../services/userService';

const UserProfile = () => {
  const { id: targetId } = useParams();                // usuario que estoy viendo
  const currentUser     = JSON.parse(localStorage.getItem('user')); // yo

  const [user, setUser]         = useState(null);
  const [liked, setLiked]       = useState(false);
  const [loading, setLoading]   = useState(true);

  /* Carga usuario + estado de like */
  useEffect(() => {
    const load = async () => {
      const profile = await getUserById(targetId);
      setUser(profile);

      const likeState = await hasLiked(targetId, currentUser.id);
      setLiked(likeState);

      setLoading(false);
    };
    load();
  }, [targetId, currentUser.id]);

  /* --- Handler toggle like --- */
  const handleToggleLike = async () => {
    try {
      if (liked) {
        await removeLike(targetId, currentUser.id);
        setLiked(false);
      } else {
        await giveLike(targetId, currentUser.id);
        setLiked(true);
      }
    } catch (err) {
      console.error('Error al cambiar like:', err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
      bgcolor="#f5f5f5"
      minHeight="100vh"
    >
      {/* Avatar / Foto */}
      {user?.profilePhoto?.length ? (
        <Avatar src={user.profilePhoto[0]} sx={{ width: 120, height: 120, mb: 2 }} />
      ) : (
        <Avatar sx={{ width: 120, height: 120, bgcolor: '#bdbdbd', mb: 2 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
      )}

      {/* Datos básicos */}
      <Typography variant="h5" gutterBottom>
        {user.name}, {user.age}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Género: {user.gender}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Bio: {user.bio}
      </Typography>

      {/* Intereses */}
      <Box mt={2}>
        {user.interests?.map((interest, i) => (
          <Chip key={i} label={interest} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>

      {/* --- Botón Like / Dislike dinámico --- */}
      <Box mt={3}>
        <Button
          variant="contained"
          color={liked ? 'error' : 'primary'}
          startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={handleToggleLike}
        >
          {liked ? 'Dislike' : 'Like'}
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
