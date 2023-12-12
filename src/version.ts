const VERSION = "0.0.1";

export function waterbase_version_html(): string {
    return `
    <div style="text-align: center; height: 5%; width: 100%">
        <h1>Waterbase</h1>
        <h2>Version ${VERSION}</h2>
    </div>
    `
}

export function waterbase_version_json(): string {
    return JSON.stringify({
        version: VERSION
    });
}

export function waterbase_version(): string {
    return VERSION;
}