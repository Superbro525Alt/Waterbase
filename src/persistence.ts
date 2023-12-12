import { readFileSync, writeFileSync } from "fs";

export function save_data(file_path: string, data: any) {
    writeFileSync(file_path, JSON.stringify(data));
}

export function load_data(file_path: string): any {
    // if file exists then load it

    if (!file_exists(file_path)) return {};

    return JSON.parse(readFileSync(file_path, "utf8"));
}

export function file_exists(file_path: string): boolean {
    try {
        readFileSync(file_path);
        return true;
    } catch (e) {
        return false;
    }
}