import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Fade, IconButton, Paper } from '@mui/material';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { io } from 'socket.io-client';
import { MessageList, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import axiosConfig from '../config/axiosConfig';

export default function MessageBox({ open, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const messageListRef = useRef(null);
  const conversationId = 1;

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (messageListRef.current) {
      const messageList = messageListRef.current;
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setCollapsed(false);
    }
  }, [open]);

  // Fetch user and set sender
  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await axiosConfig.get('/user/me');
        setSender(response.data.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // Fetch messages when sender is available
  useEffect(() => {
    if (!sender) return;

    const fetchMessages = async () => {
      try {
        const response = await axiosConfig.get(`/messages/${conversationId}`);
        const formattedMessages = response.data.map((msg) => ({
          position: msg.senderId === sender ? 'right' : 'left',
          type: 'text',
          text: msg.content,
          date: new Date(msg.createdAt),
        }));

        setMessages(formattedMessages);
        
        // Scroll to bottom after fetching messages
        setTimeout(scrollToBottom, 100);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [sender, conversationId, scrollToBottom]);

  // Initialize socket connection
  useEffect(() => {
    if (!sender) return;

    const socketInstance = io('http://localhost:3000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setSocket(socketInstance);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    const handleReceiveMessage = (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prevMessages) => {
          const updatedMessages = [
            ...prevMessages,
            {
              position: message.senderId === sender ? 'right' : 'left',
              type: 'text',
              text: message.content,
              date: new Date(message.createdAt),
            },
          ];
          
          // Use setTimeout to ensure DOM has updated before scrolling
          setTimeout(scrollToBottom, 100);
          
          return updatedMessages;
        });
      }
    };

    socketInstance.on('receiveMessage', handleReceiveMessage);

    return () => {
      socketInstance.off('receiveMessage', handleReceiveMessage);
      socketInstance.disconnect();
    };
  }, [sender, conversationId, scrollToBottom]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !socket) return;

    socket.emit('sendMessage', {
      content: newMessage,
      senderId: sender,
      conversationId,
    });

    setMessages((prevMessages) => {
      const updatedMessages = [
        ...prevMessages,
        {
          position: 'right',
          type: 'text',
          text: newMessage,
          date: new Date(),
        },
      ];
      
      // Use setTimeout to ensure DOM has updated before scrolling
      setTimeout(scrollToBottom, 100);
      
      return updatedMessages;
    });

    setNewMessage('');
  }, [newMessage, sender, socket, conversationId, scrollToBottom]);

  if (!open) return null;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component={Paper}
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 50,
        height: collapsed ? 60 : 450,
        width: 350,
        boxShadow: 5,
      }}
    >
      <Box
        sx={{
          borderRadius: '5px 5px 0 0',
          width: 350,
          position: 'fixed',
          bottom: collapsed ? 10 : 400,
          right: 50,
          zIndex: 1001,
          bgcolor: 'primary.light',
        }}
      >
        <IconButton sx={{ m: 1 }} onClick={onClose} aria-label="close" size="small">
          <CloseRoundedIcon />
        </IconButton>
        <IconButton onClick={handleToggle} aria-label="toggle" size="small">
          <RemoveRoundedIcon />
        </IconButton>
      </Box>
      <Fade in={!collapsed} unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 50,
            width: 350,
            height: 400,
            bgcolor: 'white',
          }}
        >
          <Box 
            ref={messageListRef}
            sx={{ 
              width: '100%', 
              height: 350, 
              overflowY: 'scroll' 
            }}
          >
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight="90%"
              dataSource={messages}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 10,
                position: 'fixed',
                bottom: 5,
                width: 335,
                borderTop: 'solid 2px #ddd',
              }}
            >
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rightButtons={
                  <IconButton onClick={handleSendMessage}>
                    <SendRoundedIcon />
                  </IconButton>
                }
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}