import {Server, createServer, addPage, addAPIEndpoint } from './server';
import { generate_auth_token, validate_token } from './authentication';
import { get, set } from "./database";
import { save_data, load_data } from "./persistance";
import { waterbase_version_html } from "./version";

const server: Server = createServer(3000);

//let auth_tokens: Array<string> = generate_auth_tokens(100);
let auth_tokens: Array<string> = ["V6TvuJ6IhaE7LavkJy4xJoPkNFuckTleuNpKslXjPTIWbcYLu0JvnNV8dLzRD8fXN4uCEOhcr3yeyb4SiEiwVSSweRyGuuM8dPkk"];

let data: object = {};

addAPIEndpoint(server, '/data', (_req: any, res: any) => {
    if (validate_token(_req.query.token, auth_tokens)) {
        res.send(data);
        res.status(200)
    } else {
        res.send("Invalid token");
        res.status(401)
    }
});

addAPIEndpoint(server, '/set', (_req: any, res: any) => {
    console.log(validate_token(_req.query.token, auth_tokens))
    console.log(_req.query.token);
    console.log(auth_tokens)
    if (validate_token(_req.query.token, auth_tokens)) {

        let path: string = _req.query.path;
        let value: string = _req.query.value;

        let path_list: Array<string> = path.split("/");

        set(data, path_list, value)

        res.send(data);
        res.status(200);
    } else {
        res.send("Invalid token");
        res.status(401);
    }
});

addAPIEndpoint(server, '/get', (_req: any, res: any) => {
    if (validate_token(_req.query.token, auth_tokens)) {
        let path =  _req.query.path;

        let path_list: Array<string> = path.split("/")

        let value = get(data, path_list, undefined);

        if (value == undefined) {
            res.send("Value not found");
            res.status(404);
            return;
        }
        res.send(value);
        res.status(200)
    } else {
        res.send("Invalid token");
        res.status(401);
    }
});

addAPIEndpoint(server, '/delete', (_req: any, res: any) => {
    if (validate_token(_req.query.token, auth_tokens)) {
        let path: string = _req.query.path;

        let path_list: Array<string> = path.split("/");

        set(data, path_list, undefined);

        res.send(data);
        res.status(200);
    } else {
        res.send("Invalid token");
        res.status(401);
    }
});

server._server.get('/', (_req: any, res: any) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Database</title>
</head>
<body>
    <!-- make it look cool and have different status codes for different things -->
    <pre>${waterbase_version_html()}</pre>
    
    <p>Server is running on port ${server._port}</p>
    <p>Server is running with the ip(s): 
        <pre>
${JSON.stringify(server.ip_data, null, 4)}
        </pre>
    </p>
    
    <p>Auth tokens:</p>
    <ul>
        ${auth_tokens.map((token) => {
        return `<li>${token}</li>`
    }).join("")}
    </ul>
    
    <p>Data:</p>
    <pre>${JSON.stringify(data, null, 4)}</pre>
    </body>
<style>
    body {
        font-family: sans-serif;
    }
</style>
</html>
`);
});

console.log("AUTH TOKENS: " + auth_tokens);

server.start();