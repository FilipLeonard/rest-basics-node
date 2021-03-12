let io;

module.exports = {
  init: httpServer => {
    console.log('iniiiiiit');
    io = require('socket.io')(httpServer, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
  },
};
