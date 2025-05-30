import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Avatar,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import { getUserById, updateUser } from '../services/userService';
import { useAuth } from '../context/authContext';
import EditProfileForm from '../components/editProfileForm';

const Profile = () => {
  const { user, updateUser: updateContextUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const userId = user?.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUserData(data);
        setFormData(data);
      } catch {
        setError('Error al obtener la información del perfil');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
    else {
      setError('No se encontró el usuario.');
      setLoading(false);
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUser(userId, formData);
      setUserData(updated);
      updateContextUser(updated);
      setEditMode(false);
    } catch {
      setError('Error al actualizar el perfil');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <Avatar
            alt={userData.name}
            src={userData.profilePhoto?.[0]}
            sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h4">{userData.name}</Typography>
        </Box>

        {!editMode ? (
          <Box textAlign="left">
            <Typography><strong>Email:</strong> {userData.email}</Typography>
            <Typography><strong>Edad:</strong> {userData.age}</Typography>
            <Typography><strong>Género:</strong> {userData.gender}</Typography>
            <Typography><strong>Bio:</strong> {userData.bio || 'No escrita'}</Typography>
            <Typography sx={{ mt: 2 }}><strong>Intereses:</strong></Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {userData.interests?.map((interest, idx) => (
                <Chip key={idx} label={interest} />
              )) || 'Ninguno'}
            </Box>
            <Button variant="contained" sx={{ mt: 3 }} onClick={() => setEditMode(true)}>
              Editar perfil
            </Button>
          </Box>
        ) : (
          <EditProfileForm
            formData={formData}
            setFormData={setFormData}
            onCancel={() => setEditMode(false)}
            onSubmit={handleSubmit}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
