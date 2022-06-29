import { httpServer } from './src/http_server/index';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { resolve } from 'path';
import { cwd } from 'process';
import { connection } from './src/connection ';

dotenv.config({ path: resolve(cwd(), '.env') });

const HTTP_PORT = process.env.HTTP_PORT || 3000;
const WSS_PORT = Number(process.env.WSS_PORT) || 8080;

console.log(`Start static http server on ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
  port: WSS_PORT,
});

console.log(`Websocket server is running on ${WSS_PORT} port.`);

wss.on('connection', connection);

process.on("SIGNINT", () => {
  console.log("WebSocketServer closed");
  wss.close();
  process.exit(0);
});
