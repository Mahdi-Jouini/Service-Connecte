const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./models/index.js');
const { Message, Conversation } = db; // Import Sequelize models
const cookieParser = require('cookie-parser');
const categoriesRoutes = require('./routes/categoriesRoutes.js');
const servicesRoutes = require('./routes/servicesRoutes.js');
const providerRoutes = require('./routes/providerRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const upload = require('./middlewares/MulterMiddleware.js');

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware and routes setup
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.post('/upload/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ message: 'File uploaded successfully', filename: req.file.name });
});

// Database connection
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected!');
    await db.sequelize.sync({ alter: true });
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

// Routes
app.use('/categories', categoriesRoutes);
app.use('/services', servicesRoutes);
app.use('/providers', providerRoutes);
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Home Services API is running!');
});

// Messaging setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust according to your frontend's URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle incoming messages
  socket.on('sendMessage', async ({ content, senderId, conversationId }) => {
    try {
      // Save message to the database
      const message = await db.Message.create({
        content,
        senderId,
        conversation_id: conversationId,
      });

      // Broadcast the message to all clients in the same conversation
      io.emit('receiveMessage', {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        conversationId: message.conversation_id,
        createdAt: message.createdAt,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// API Endpoint for fetching conversation messages
app.get('/messages/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await db.Message.findAll({
      where: { conversation_id: conversationId },
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// API Endpoint for creating a new conversation
app.post('/conversations', async (req, res) => {
  try {
    const { title } = req.body;
    const conversation = await db.Conversation.create({ title });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// API Endpoint for retrieving all conversations
app.get('/conversations', async (req, res) => {
  try {
    const conversations = await db.Conversation.findAll({
      include: [{ model: db.Message, as: 'messages' }],
    });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
