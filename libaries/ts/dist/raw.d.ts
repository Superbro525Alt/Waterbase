declare class RawServer {
    private url;
    private auth;
    private fetch_path;
    constructor(url: string, auth: string);
    private add_params;
    get(path: string): Promise<string>;
    set(path: string, content: string): Promise<string>;
    delete(path: string): Promise<string>;
    data(): Promise<string>;
    save(): Promise<boolean>;
    load(): Promise<boolean>;
}
export { RawServer };
