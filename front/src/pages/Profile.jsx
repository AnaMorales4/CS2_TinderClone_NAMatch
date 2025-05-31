import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Avatar,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { getUserById, updateUser } from "../services/userService";
import { useAuth } from "../context/authContext";
import EditProfileForm from "../components/editProfileForm";

const Profile = () => {
  const { user, updateUser: updateContextUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const userId = user?.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUserData(data);
        setFormData(data);
      } catch {
        setError("Error al obtener la información del perfil");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
    else {
      setError("No se encontró el usuario.");
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
      setError("Error al actualizar el perfil");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Paper
        elevation={4}
        sx={{
          mt: '64px',
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box textAlign="center" mb={4}>
          <Avatar
            alt={userData.name}
            src={userData.profilePhoto?.[0]}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              boxShadow: "0 0 10px rgba(253, 80, 104, 0.6)",
            }}
          />
          <Typography variant="h4" fontWeight="bold" color="#333">
            {userData.name}
          </Typography>
          <Typography variant="body2" color="#777">
            {userData.email}
          </Typography>
        </Box>

        {!editMode ? (
          <Box textAlign="left" px={2}>
            <Typography color="#555" mb={1}>
              <strong>Edad:</strong> {userData.age}
            </Typography>
            <Typography color="#555" mb={1}>
              <strong>Género:</strong>{" "}
              {userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}
            </Typography>
            <Typography color="#555" mb={1}>
              <strong>Bio:</strong> {userData.bio || "No escrita"}
            </Typography>

            <Typography mt={2} mb={1} color="#555" fontWeight="bold">
              Intereses:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {userData.interests?.length > 0 ? (
                userData.interests.map((interest, idx) => (
                  <Chip
                    key={idx}
                    label={interest}
                    sx={{
                      backgroundColor: "#fde6e8",
                      color: "#FD5068",
                      fontWeight: 500,
                    }}
                  />
                ))
              ) : (
                <Typography variant="body2">Ninguno</Typography>
              )}
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                bgcolor: "#FD5068",
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#FF7854",
                },
              }}
              onClick={() => setEditMode(true)}
            >
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
