import { RawServer } from "../raw";

class NetworkObject {
    public data: object;
    public path: string;

    private server: RawServer;

    constructor(data: object, path: string, server: RawServer) {
        this.data = data;
        this.path = path;
        this.server = server;
    }

    public async set(): Promise<string> {
        return this.server.set(this.path, JSON.stringify(this.data));
    }
}

export { NetworkObject };
