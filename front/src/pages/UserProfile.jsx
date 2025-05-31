import {
  Box,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getUserById,
  giveLike,
  removeLike,
  hasLiked,
} from '../services/userService';
import HeartFloatingEffect from '../components/HeartFloatingEffect';

const UserProfile = () => {
  const { id: targetId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await getUserById(targetId);
        setUser(profile);

        const likeState = await hasLiked(targetId, currentUser.id);
        setLiked(likeState);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [targetId, currentUser.id]);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fdfdfd"
      px={2}
    >
       {liked && <HeartFloatingEffect />}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          borderRadius: 4,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* Avatar o Imagen */}
        {user?.profilePhoto?.length ? (
          <Avatar
            src={user.profilePhoto[0]}
            alt={user.name}
            sx={{
              width: 140,
              height: 140,
              mx: 'auto',
              mb: 2,
              boxShadow: 3,
            }}
          />
        ) : (
          <Avatar
            sx={{
              width: 140,
              height: 140,
              bgcolor: '#ffcdd2',
              color: '#fff',
              mb: 2,
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
        )}

        {/* Datos del usuario */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {user.name}, {user.age}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Género: {user.gender || 'No especificado'}
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          {user.bio || 'Sin biografía'}
        </Typography>

        {/* Intereses */}
        <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
          {user.interests?.map((interest, i) => (
            <Chip
              key={i}
              label={interest}
              sx={{
                bgcolor: '#fde6e8',
                color: '#FD5068',
                fontWeight: 500,
              }}
            />
          ))}
        </Box>

        {/* Botón de Like/Dislike */}
        <Button
          variant="contained"
          startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={handleToggleLike}
          sx={{
            mt: 4,
            bgcolor: liked ? '#FD5068' : '#e0e0e0',
            color: liked ? '#fff' : '#000',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: liked ? '#FF7854' : '#d5d5d5',
            },
          }}
        >
          {liked ? 'Dislike' : 'Like'}
        </Button>
        
      </Paper>
    </Box>
  );
};

export default UserProfile;
