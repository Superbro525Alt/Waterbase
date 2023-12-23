import { RawServer } from "../../raw";
import { NetworkObject } from "../types";
import { Vector3, Vector2 } from "./positions";
import { Player } from "./player";

class MultiplayerServer extends RawServer {
    public players: Player[] = [];

    constructor(url: string, auth: string) {
        super(url, auth);
    }

    public async createPlayer(path: string, position: Vector3 | Vector2): Promise<Player> {
        let player = new Player(this, path, position);
        await player.set();
        this.players.push(player);
        return player;
    }

    public async pushAll(): Promise<void> {
        for (let player of this.players) {
            await player.set();
        }
    }
}

export { MultiplayerServer };
