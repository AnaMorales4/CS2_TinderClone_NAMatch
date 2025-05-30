import {
  Box,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

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
      {user?.profilePhoto?.length ? (
        <Avatar
          src={user.profilePhoto[0]}
          alt={user.name}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
      ) : (
        <Avatar sx={{ width: 120, height: 120, bgcolor: "#bdbdbd", mb: 2 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
      )}
      <Typography variant="h5" gutterBottom>
        {user?.name}, {user?.age}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Género: {user?.gender}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Bio: {user?.bio}
      </Typography>
      <Box mt={2}>
        {user?.interests?.map((interest, index) => (
          <Chip key={index} label={interest} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
    </Box>
  );
};

export default UserProfile;
