import { Server } from 'waterbase_sdk';

const server: Server = new Server("http://localhost:3000", "test");

server.set("test", "test");
