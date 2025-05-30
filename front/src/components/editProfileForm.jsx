import {
  TextField,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

const EditProfileForm = ({ formData, setFormData, onCancel, onSubmit }) => {
  const [newInterest, setNewInterest] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="Nombre" name="name" value={formData.name || ''} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Edad" type="number" name="age" value={formData.age || ''} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Género" name="gender" value={formData.gender || ''} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Bio" name="bio" value={formData.bio || ''} onChange={handleChange} multiline rows={3} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Intereses</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              label="Nuevo interés"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              fullWidth
            />
            <Button variant="outlined" onClick={handleAddInterest}>Agregar</Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.interests?.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                onDelete={() => handleRemoveInterest(index)}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="URL de foto de perfil"
            name="profilePhoto"
            value={formData.profilePhoto?.[0] || ''}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, profilePhoto: [e.target.value] }))
            }
            InputProps={{
              endAdornment: formData.profilePhoto?.[0] ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear url"
                    onClick={() => setFormData(prev => ({ ...prev, profilePhoto: [''] }))}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button type="submit" variant="contained">Guardar cambios</Button>
          <Button sx={{ ml: 2 }} variant="outlined" onClick={onCancel}>Cancelar</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditProfileForm;
