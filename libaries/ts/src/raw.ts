class RawServer {
    private url: string;
    private auth: string;

    private fetch_path: string;

    constructor(url: string, auth: string) {
        this.url = url;
        this.auth = auth;
    }

    private add_params(path: string, params: any): string {
        let result = path;
        let first = true;
        for (let key in params) {
            if (first) {
                result += '?';
                first = false;
            } else {
                result += '&';
            }
            result += key + '=' + params[key];
        }
        return result;
    }

    public async get(path: string): Promise<string> {
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

    public async set(path: string, content: string): Promise<string> {
        return fetch(this.add_params(this.url + "/set", {
            token: this.auth,
            path: path,
            value: content
        }), {
            method: 'PUT'
        }).then((response) => {
            // error code
            console.log(this.url + "/set")
            if (response.status != 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    public async delete(path: string): Promise<string> {
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

    public async data(): Promise<string> {
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

    public async save(): Promise<boolean> {
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

    public async load(): Promise<boolean> {
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

export { RawServer };
