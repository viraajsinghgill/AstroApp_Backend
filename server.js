require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Astrology API is running!');
});

// Import routes
const kundliRoutes = require('./routes/kundli');
const chatRoutes = require('./routes/chat');
const astrologerRoutes = require('./routes/astrologer');

app.use('/api/kundli', kundliRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/astrologers', astrologerRoutes);

// MongoDB connection (free Atlas)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Socket.io for chat
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg); // broadcast to all
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));