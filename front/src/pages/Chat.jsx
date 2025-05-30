import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import {
  AppBar, Toolbar, IconButton, Typography, Avatar,
  Box, TextField, Button, List, ListItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useAuth } from '../context/authContext';
import { getAllUsers } from "../services/userService";


const socket = io('http://localhost:5000');

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id: receiverId } = useParams();
  const senderId = user.id ||0
  const [input, setInput] = useState('');
  const [person, setPerson]=useState({});
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

    useEffect(()=>{
        GetUser()

        return ()=>{
            setPerson({})
        }
        
    },[])

    async function GetUser (){
        const data = await getAllUsers();
        setPerson(data.find((u) => u._id === receiverId));

        if (!senderId || !receiverId) return;

        socket.emit('join', senderId);
        socket.emit('load history', { senderId, receiverId });

    }

  useEffect(() => {
    socket.on('history', (history) => {
      setMessages(history);
      scrollToBottom();
    });

    socket.on('chat message', (msg) => {
      if (msg.senderId._id === senderId || msg.receiverId._id === senderId) {
        setMessages((prev) => {
            const newMessages = [...prev, msg];
            const uniqueMessages = Array.from(new Set(newMessages));
            return uniqueMessages;
          });
        scrollToBottom();
      }
    });

    return () => {};
  }, []);


  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    socket.emit('chat message', { senderId, receiverId, text: input });
    setInput('');
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* HEADER */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar src={(!person.profilePhoto || person.profilePhoto.length === 0)?"https://i.pravatar.cc/300":person.profilePhoto[0]} sx={{ mx: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {person?.name}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* LOGIN FORM */}
      
        <>
          {/* MENSAJES */}
          <List
            ref={messagesRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 1,
              bgcolor: '#f0f2f5',
            }}
          >
            {messages.map((msg, i) => (
              <ListItem
                key={i}
                sx={{
                  justifyContent:
                    msg.senderId._id === senderId ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    bgcolor:
                      msg.senderId._id === senderId ? '#dcf8c6' : '#fff',
                    p: 1,
                    borderRadius: 2,
                    maxWidth: '70%',
                  }}
                >
                  <Typography variant="body2">
                    <strong>{msg.senderId.name}</strong>: {msg.text}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>

          {/* INPUT */}
          <Box
            component="form"
            onSubmit={handleSend}
            autoComplete='off'
            sx={{
              display: 'flex',
              gap: 1,
              p: 2,
              bgcolor: 'white',
              borderTop: '1px solid #ccc',
            }}
          >
            <TextField
              fullWidth
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              size="small"
            />
            <Button type="submit" variant="contained">
              ➤
            </Button>
          </Box>
        </>
    </Box>
  );
};

export default Chat;