import express from 'express';

import { get_ip_data } from './utils';

export interface Server {
    start(): void;
    stop(): void;
    restart(): void;
    _server: any;
    _port: number;
    _running_server_instance: any;
    ip_data: object;
}

export function createServer(port: number): Server {
    let app = express();

    let server_ip = get_ip_data();

    return {
        start() {
            this._running_server_instance = this._server.listen(this._port, () => {
                console.log(`Server is running on port ${this._port} here:`);
                console.log(this.ip_data)
            });
        },
        stop() {
            this._running_server_instance.close();
        },
        restart() {
            this._running_server_instance.close();
            this.start();
        },
        _server: app,
        _port: port,
        _running_server_instance: null,
        ip_data: server_ip,
    };
}

export function addPage(server: Server, path: string, page: string) {
    server._server.get(path, (_req: any, res: any) => {
        res.send(page);
    });
}

export function addAPIEndpoint(server: Server, path: string, callback: any) {
    server._server.get(path, callback);
}
