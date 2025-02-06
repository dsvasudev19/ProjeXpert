const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    // Join personal room
    socket.on('join', (userId) => {
      socket.join(`user_${userId}`);
    });

    // Handle new message
    socket.on('new_message', (data) => {
      // Emit to both participants
      io.to(`user_${data.participant1Id}`).to(`user_${data.participant2Id}`).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      // Handle disconnect
    });
  });

  return io;
}; 