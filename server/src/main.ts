import {
    Server,
    createServer,
    addPage,
    GetEndpoint,
    PutEndpoint,
    DeleteEndpoint,
    PostEndpoint
} from './server';
import { generate_auth_tokens, validate_token } from './authentication';
import { get, set } from "./database";
import { save_data, load_data } from "./persistence";
import { waterbase_version_html } from "./version";
import { get_config } from "./config";

const config = get_config();

const port: number = config.port;
const server: Server = createServer(port);
let auth_tokens: Array<string> = generate_auth_tokens(4);
auth_tokens = auth_tokens.concat(config.persistent_auth_tokens);
const save_file_path: string = config.save_file_path;

let data: object = {};


GetEndpoint(server, '/data', (_req: any, res: any) => {
    if (validate_token(_req.query.token, auth_tokens)) {
        res.send(data);
        res.status(200)
    } else {
        res.send("Invalid token");
        res.status(401)
    }
});

PutEndpoint(server, '/set', (_req: any, res: any) => {
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

GetEndpoint(server, '/get', (_req: any, res: any) => {
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

DeleteEndpoint(server, '/delete', (_req: any, res: any) => {
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

PostEndpoint(server, '/load_from_file', (_req: any, res: any) => {
    if (validate_token(_req.query.token, auth_tokens)) {
        data = load_data(save_file_path);

        res.send(data);
        res.status(200);
    } else {
        res.send("Invalid token");
        res.status(401);
    }
});

PostEndpoint(server, '/save_to_file', (_req: any, res: any) => {
    if (validate_token(_req.query.token, auth_tokens)) {
        save_data(save_file_path, data);

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
    
    <button onclick="fetch('/load_from_file?token=${auth_tokens[0]}');window.location.reload();">Load data from file</button>
    
    <br/>
    <br/>
    
    <button onclick="fetch('/save_to_file?token=${auth_tokens[0]}';window.location.reload())">Save data to file</button>
    
    <p>Endpoints:</p>
    
    <ul>
        <li>/data</li>
        <li>/set</li>
        <li>/get</li>
        <li>/delete</li>
        <li>/load_from_file</li>
        <li>/save_to_file</li>
    </ul>
    </body>
<style>
    body {
        font-family: sans-serif;
    }
    
    button {
        font-size: 1.5em;
        background-color: #4CAF50;
        border: none;
        transition: background-color 0.4s ease;
    }
    
    button:hover {
        background-color: #3e8e41;
    }
</style>
</html>
`);
});

console.log("AUTH TOKENS: " + auth_tokens);

server.start();

console.log(`View the dashboard at http://localhost:${server._port}/`);
