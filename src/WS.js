import SocketIO from 'socket.io';

import socketAuth from './middlewares/socketAuth';

export default class WS {
  static init(server) {
    WS.io = SocketIO(server, { path: '/api/socket.io' });

    WS.io.of(/^\/board\//).use(socketAuth);

    WS.io
      .of('/board')
      .on('connect', (socket) => {
        const { room } = socket.handshake.query;
        socket.join(room);

        socket.on('action', (actionType, payload) => {
          socket.broadcast.to(room).emit('action', actionType, payload);
        });
      });
  }

  static emitAction(nsp, action) {
    WS.io.of(nsp).emit('action', action);
  }
}
