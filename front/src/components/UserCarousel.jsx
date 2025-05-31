import { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const PHOTO_HEIGHT = 170;

const avatarFallback = (name) => (
  <Box
    height={PHOTO_HEIGHT}
    display="flex"
    alignItems="center"
    justifyContent="center"
    bgcolor="#ffe5e9"
  >
    <Avatar
      sx={{
        width: 90,
        height: 90,
        bgcolor: "#FD5068",
        color: "#fff",
        boxShadow: 2,
      }}
    >
      <PersonIcon fontSize="large" />
    </Avatar>
  </Box>
);

const UserCarousel = ({ users }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 4,
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const navigate = useNavigate();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Box sx={{ position: "relative", width: "100%", px: 2 }}>
      {/* Contenedor del carrusel */}
      <Box ref={emblaRef} sx={{ overflow: "hidden" }}>
        <Box
          display="flex"
          sx={{
            ".embla__slide": {
              minWidth: "25%", // 100 / 4 = 25%
              padding: 1,
              boxSizing: "border-box",
            },
          }}
        >
          {users.map((u) => (
            <Box key={u._id} className="embla__slide">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {u.profilePhoto?.length ? (
                  <CardMedia
                    component="img"
                    height={PHOTO_HEIGHT}
                    image={u.profilePhoto[0]}
                    alt={u.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                      e.target.style.display = "none";
                      e.target.parentElement.appendChild(avatarFallback(u.name));
                    }}
                  />
                ) : (
                  avatarFallback(u.name)
                )}

                <CardContent sx={{ flexGrow: 1, px: 2, py: 2 }}>
                  <Typography variant="h6" fontWeight="bold" color="#333">
                    {u.name}, {u.age}
                  </Typography>

                  <Typography variant="body2" color="#777" mb={1}>
                    {u.gender
                      ? u.gender.charAt(0).toUpperCase() + u.gender.slice(1)
                      : "Género no especificado"}
                  </Typography>

                  <Box mb={1}>
                    {u.interests?.map((interest, i) => (
                      <Chip
                        key={i}
                        label={interest}
                        size="small"
                        sx={{
                          mr: 0.5,
                          mb: 0.5,
                          bgcolor: "#fde6e8",
                          color: "#FD5068",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>

                  <Typography variant="body2" color="#555" mb={2}>
                    {u.bio || "Sin biografía"}
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mt: "auto",
                      bgcolor: "#FD5068",
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "#FF7854",
                      },
                    }}
                    onClick={() => navigate(`/profile/${u._id}`)}
                  >
                    Ver perfil
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Botones de navegación */}
      <IconButton
        onClick={scrollPrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          bgcolor: "white",
          boxShadow: 2,
          "&:hover": { bgcolor: "#eee" },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={scrollNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          bgcolor: "white",
          boxShadow: 2,
          "&:hover": { bgcolor: "#eee" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default UserCarousel;
