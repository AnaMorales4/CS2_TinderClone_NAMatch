import {
  TextField,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

const EditProfileForm = ({ formData, setFormData, onCancel, onSubmit }) => {
  const [newInterest, setNewInterest] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setFormData((prev) => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Edad"
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Género"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            multiline
            rows={3}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Intereses
          </Typography>

          <Box display="flex" gap={1} mb={2}>
            <TextField
              label="Nuevo interés"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Button
              onClick={handleAddInterest}
              variant="contained"
              sx={{
                bgcolor: "#FD5068",
                textTransform: "none",
                "&:hover": { bgcolor: "#FF7854" },
              }}
            >
              Agregar
            </Button>
          </Box>

          <Box display="flex" flexWrap="wrap" gap={1}>
            {formData.interests?.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                onDelete={() => handleRemoveInterest(index)}
                sx={{
                  bgcolor: "#fde6e8",
                  color: "#FD5068",
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="URL de foto de perfil"
            name="profilePhoto"
            value={formData.profilePhoto?.[0] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                profilePhoto: [e.target.value],
              }))
            }
            variant="outlined"
            InputProps={{
              endAdornment: formData.profilePhoto?.[0] ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        profilePhoto: [""],
                      }))
                    }
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Grid>

        <Grid item xs={12} textAlign="center" mt={3}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#FD5068",
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              "&:hover": {
                bgcolor: "#FF7854",
              },
            }}
          >
            Guardar cambios
          </Button>
          <Button
            sx={{
              ml: 2,
              textTransform: "none",
              color: "#FD5068",
              borderColor: "#FD5068",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#fde6e8",
                borderColor: "#FF7854",
              },
            }}
            variant="outlined"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditProfileForm;
