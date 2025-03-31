const net = require('net');

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', () => {
      resolve(false);
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    
    server.listen(port);
  });
}

async function findAvailablePort(startPort = 3000, maxPort = 3999) {
  for (let port = startPort; port <= maxPort; port++) {
    if (await isPortAvailable(port)) {
      console.log(port);
      return;
    }
  }
  console.error('No available ports found');
  process.exit(1);
}

findAvailablePort(); 