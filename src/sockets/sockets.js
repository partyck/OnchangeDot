module.exports = io => {
  io.on('connection', socket => {
    socket.on('accelerometers', function (data) {
      io.sockets.emit('graphic', data);
    });
  });

};