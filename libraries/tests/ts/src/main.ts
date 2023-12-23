import * as waterbase from '../../../ts/src/index';

const Server = new waterbase.MultiplayerServer("http://localhost:3000", "test");

Server.createPlayer("test", { x: 0, y: 0, z: 0 });
