import { load_data } from "./persistence";

const REQ_CONFIG = ["port", "persistent_auth_tokens", "save_file_path"];
const DEFAULT_CONFIG = {
    port: 3000,
    persistent_auth_tokens: [],
    save_file_path: "./save.json"
}
export function get_config() {
    let config = load_data("./config.json");

    for (let i = 0; i < REQ_CONFIG.length; i++) {
        if (config[REQ_CONFIG[i]] == undefined) {
            config[REQ_CONFIG[i]] = DEFAULT_CONFIG[REQ_CONFIG[i]];
        }
    }

    return config;
}