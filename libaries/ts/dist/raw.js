"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawServer = void 0;
class RawServer {
    constructor(url, auth) {
        this.url = url;
        this.auth = auth;
    }
    add_params(path, params) {
        let result = path;
        let first = true;
        for (let key in params) {
            if (first) {
                result += '?';
                first = false;
            }
            else {
                result += '&';
            }
            result += key + '=' + params[key];
        }
        return result;
    }
    async get(path) {
        return fetch(this.add_params(this.url + "/get", {
            token: this.auth,
            path: path
        }), {
            method: 'GET'
        }).then((response) => {
            // error code
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
            return response.text();
        });
    }
    async set(path, content) {
        return fetch(this.add_params(this.url + "/set", {
            token: this.auth,
            path: path,
            value: content
        }), {
            method: 'PUT'
        }).then((response) => {
            // error code
            console.log(this.url + "/set");
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    async delete(path) {
        return fetch(this.add_params(this.url + "/delete", {
            token: this.auth,
            path: path
        }), {
            method: 'DELETE'
        }).then((response) => {
            // error code
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    async data() {
        return fetch(this.add_params(this.url + "/data", {
            token: this.auth
        }), {
            method: 'GET'
        }).then((response) => {
            // error code
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
            return response.text();
        });
    }
    async save() {
        return fetch(this.add_params(this.url + "/save_to_file", {
            token: this.auth
        }), {
            method: 'POST'
        }).then((response) => {
            // error code
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
            return true;
        });
    }
    async load() {
        return fetch(this.add_params(this.url + "/load_from_file", {
            token: this.auth
        }), {
            method: 'POST'
        }).then((response) => {
            // error code
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
            return true;
        });
    }
}
exports.RawServer = RawServer;
