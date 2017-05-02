import requireDirectory from 'require-directory';
const routes = requireDirectory(module, {visit: dir => dir.default});

export default function(server) {
  server.get('*', routes.default);
}