const midi = require('midi');
const midiOut = new midi.output();
const socket = require('socket.io');

try {
  midiOut.openPort(0);
  console.log(midiOut.getPortCount());
} catch (error) {
  midiOut.openVirtualPort('');
}

module.exports = server => {
  var io = socket(server);

  var dotSocket = io.of('/')
    .on('connection', socket => {
      console.log('user connected: ', socket.id);

      socket.on('accelerometers', data => {
        io.sockets.emit('graphic', data);
      });
    });

  var midiSocket = io.of('/midi')
    .on('connection', socket => {
      console.log('user connected: ', socket.id);

      socket.on('noteDown', data => {
        console.log('noteDown: ', data.key);
        console.log('speed: ', data.speed);
        midiOut.sendMessage([144, data.key, data.speed]);
      });

      socket.on('noteUp', data => {
        console.log('note: ', data.key);
        console.log('speed: ', data.speed);
        midiOut.sendMessage([128, data.key, data.speed]);
      });

      socket.on('accKnob', data => {
        if(data.instrument < 18){
          var channel = parseInt(data.instrument) + 174;
          // var channel = 180;
          console.log('Knob ',channel,': ', data.x);
          midiOut.sendMessage([channel, 0, data.x]);
        }
      });
    });
};