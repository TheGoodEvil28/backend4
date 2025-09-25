require('dotenv').config();
const Hapi = require('@hapi/hapi');
const albumRoutes = require('./src/api/albums/routes');
const songRoutes = require('./src/api/songs/routes');

const init = async () => {
  const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: process.env.HOST || '0.0.0.0',
  routes: { cors: { origin: ['*'] } }
});


  server.route(albumRoutes);
  server.route(songRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
