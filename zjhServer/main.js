const LoginMessage = require('./routes/loginMessage');
const HallMessage = require('./routes/hallMessage');

LoginMessage.createServer(3000);
HallMessage.createServer(3001);