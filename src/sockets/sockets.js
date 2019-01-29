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
  let io = socket(server);

  let dotSocket = io.of('/')
    .on('connection', socket => {
      console.log('user connected: ', socket.id);

      socket.on('accelerometers', data => {
        io.sockets.emit('graphic', data);
      });

      socket.on('acc', data => {
        io.sockets.emit('graphic', data);
        toMidi(data.session, data.x, data.y, data.z);
        // console.log('session:', data.session);
        // console.log('  X:', data.x);
        // console.log('  Y:', data.y);
        // console.log('  Z:', data.z);
      });

      // socket.on('scene', data => {
      //   io.sockets.emit('scene');
      // });
    });

  function toMidi(session, x, y, z) {
    let xmidi = toMidi2(x);
    let ymidi = toMidi2(y);
    if (session < 16) {
      let channelX = (parseInt(session) - 1 )* 2 + 176;
      let channelY = channelX + 1;
      // var channel = 180;
      console.log('Knob ', channelX, ': ', xmidi);
      console.log('Knob ', channelY, ': ', ymidi);
      midiOut.sendMessage([channelX, 0, xmidi]);
      midiOut.sendMessage([channelY, 0, ymidi]);
    }
  }

  function toMidi2(x) {
    if (x > 9.81) {
      return 128;
    }
    if (x < -9.81) {
      return 0;
    }
    return parseInt((x + 9.81) * 6.5, 10);
    // return x * 1.28;
  }

  let midiSocket = io.of('/midi')
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
        if (data.instrument < 18) {
          let channel = parseInt(data.instrument) + 174;
          // var channel = 180;
          console.log('Knob ', channel, ': ', data.x);
          midiOut.sendMessage([channel, 0, data.x]);
          io.sockets.emit('graphic', data);
        }
      });
    });
};