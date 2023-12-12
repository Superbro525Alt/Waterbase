import {Server, createServer, addPage, addAPIEndpoint } from './server';
import { generate_auth_token } from './utils';

const server: Server = createServer(3000);

let auth_token = generate_auth_token(100);

let data: object = {

};

addAPIEndpoint(server, '/data', (_req: any, res: any) => {
    if (_req.query.token == auth_token) {
        res.send(data);
    } else {
        res.send("Invalid token");
    }
});

addAPIEndpoint(server, '/set', (_req: any, res: any) => {
    if (_req.query.token == auth_token) {
        // use a path to get a location in the data dictionary
        // a path will be like path/to/data and turn it into data[path][to][data]
        let path: string = _req.query.path;
        let value: string = _req.query.value;

        let path_list: Array<string> = path.split("/");

        let current_data: object = data;

        for (let i = 0; i < path_list.length - 1; i++) {
            let path_part: string = path_list[i];

            if (current_data[path_part] === undefined) {
                current_data[path_part] = {};
            }

            current_data = current_data[path_part];

            console.log(current_data)
        }
        // if current_data is not an object, then we need to make it one
        if (typeof current_data !== "object" || current_data === undefined) {
            current_data = {};
        }

        current_data[path_list[path_list.length - 1]] = value;

        // set data[path][to][data] to value
        for (let i = 0; i < path_list.length - 1; i++) {
            let path_part: string = path_list[i];

            data[path_part] = current_data;
        }



        res.send("Success");
    } else {
        res.send("Invalid token");
    }
});

console.log("AUTH TOKEN: " + auth_token);

server.start();