import { NetworkObject } from "../types";
import { Vector3, Vector2 } from "./positions";
import {RawServer} from "../../raw";

class Player extends NetworkObject {
    public constructor(server: RawServer, path: string, position: Vector3 | Vector2 ) {
        super({}, path, server);

        this.setPosition(position);
    }

    public setPosition(position: Vector3 | Vector2): void {
        if ((position as Vector3).z !== undefined) {
            this.data = {
                position: position as Vector3
            };
        } else {
            this.data = {
                position: {
                    x: (position as Vector2).x,
                    y: (position as Vector2).y,
                    z: 0
                }
            };
        }
    }

    public getPosition(): Vector3 {
        return this.data["position"];
    }

    public setExtraData(key: string, value: any): void {
        this.data[key] = value;
    }
}

export { Player };
