require('dotenv').config();
const Hapi = require('@hapi/hapi');

const albumRoutes = require('./src/api/albums/routes');
const songRoutes = require('./src/api/songs/routes');
const userRoutes = require('./src/api/users/routes');
const authRoutes = require('./src/api/authentications/routes');
const playlistRoutes = require('./src/api/playlists/routes');

const { ClientError } = require('./src/utils/errorHandler');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || '0.0.0.0',
    routes: { cors: { origin: ['*'] } },
  });

  // Register JWT plugin
  await server.register(require('@hapi/jwt'));

  // JWT Authentication strategy
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 3600,
    },
    validate: (artifacts, request, h) => ({
      isValid: true,
      credentials: { userId: artifacts.decoded.payload.id },
    }),
  });

  // Set default auth strategy (optional)
  // server.auth.default('openmusic_jwt');

  // Register routes
  server.route([
    ...albumRoutes,
    ...songRoutes,
    ...userRoutes,
    ...authRoutes,
    ...playlistRoutes,
  ]);

  // Global error handling
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
        if (response instanceof ClientError) {
            return h.response({
                status: 'fail',
                message: response.message,
            }).code(response.statusCode);
        }

        if (!response.isServer) return h.continue;

        return h.response({
            status: 'error',
            message: 'Terjadi kegagalan pada server',
        }).code(500);
    }

    return h.continue;
});


  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
