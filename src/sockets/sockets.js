const midi = require('midi');
const midiOut = new midi.output();

try {
  midiOut.openPort(0);
  console.log(midiOut.getPortCount());
} catch (error) {
  midiOut.openVirtualPort('');
}

module.exports = io => {
  io.on('connection', socket => {
    console.log('user connected: ', socket.id);

    socket.on('accelerometers', data => {
      io.sockets.emit('graphic', data);
    });

    socket.on('noteDown', data => {
      console.log('noteDown: ', data.key);
      midiOut.sendMessage([144, data.key, 100]);
    });

    socket.on('noteUp', data => {
      console.log('note: ', data.key);
      midiOut.sendMessage([128, data.key, 100]);
    });

  });
};