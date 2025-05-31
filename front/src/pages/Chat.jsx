import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getAllUsers } from "../services/userService";

const socket = io("http://localhost:5000");

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id: receiverId } = useParams();

  const senderId = user.id;
  const [input, setInput] = useState("");
  const [person, setPerson] = useState({});
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  /* ─────────── Cargar info del receptor + unirse al room ─────────── */
  useEffect(() => {
    const init = async () => {
      const data = await getAllUsers();
      setPerson(data.find((u) => u._id === receiverId));

      socket.emit("join", senderId);
      socket.emit("load history", { senderId, receiverId });
    };
    init();
  }, [receiverId, senderId]);

  /* ─────────── Listeners de socket ─────────── */
  useEffect(() => {
    socket.on("history", (history) => {
      setMessages(history);
      scrollToBottom();
    });

    socket.on("chat message", (msg) => {
      if (msg.senderId._id === senderId || msg.receiverId._id === senderId) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("history");
      socket.off("chat message");
    };
  }, [senderId]);

  /* ─────────── Enviar mensaje ─────────── */
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit("chat message", { senderId, receiverId, text: input });
    setInput("");
  };

  /* ─────────── Scroll autom. ─────────── */
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  /* ────────────────────────── UI ────────────────────────── */
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* HEADER */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #FD5068, #FF7854)",
          boxShadow: 2,
          mt: '64px'
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ color: "#fff" }}>
            <ArrowBackIcon />
          </IconButton>

          <Avatar
            src={
              !person.profilePhoto || person.profilePhoto.length === 0
                ? "https://i.pravatar.cc/150"
                : person.profilePhoto[0]
            }
            sx={{ mx: 2, width: 40, height: 40 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff", fontWeight: 500 }}>
            {person?.name}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* MENSAJES */}
      <List
        ref={messagesRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 2,
          bgcolor: "#f7f7f7",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {messages.map((msg, i) => {
          const isMine = msg.senderId._id === senderId;
          return (
            <ListItem
              key={i}
              sx={{ justifyContent: isMine ? "flex-end" : "flex-start" }}
            >
              <Paper
                elevation={1}
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: 3,
                  maxWidth: "70%",
                  bgcolor: isMine ? "#FD5068" : "#fff",
                  color: isMine ? "#fff" : "#333",
                }}
              >
                <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                  {msg.text}
                </Typography>
              </Paper>
            </ListItem>
          );
        })}
      </List>

      {/* INPUT */}
      <Box
        component="form"
        onSubmit={handleSend}
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          bgcolor: "#fff",
          borderTop: "1px solid #eee",
        }}
      >
        <TextField
          fullWidth
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#FD5068",
            minWidth: 90,
            "&:hover": { bgcolor: "#FF7854" },
          }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
