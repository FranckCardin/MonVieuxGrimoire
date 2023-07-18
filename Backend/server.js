//IMPORT PACKAGE NODE 
const http = require('http');
//IMPORT APP 
const app = require('./app');

//RENVOIE UN PORT VALIDE
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//PORT VALIDE ECOUTÉ SUR LE PORT 4000 
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

//GESTIONNAIRES DES DIFFÉRENTES ERREURS DU SERVER 
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//CRÉATION SERVER APP
const server = http.createServer(app);

//GESTION DES ERREURS ET ÉCOUTE DU SERVER
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//ÉCOUTE DU PORT CHOISI
server.listen(port);
