import { readFileSync, writeFileSync } from "fs";

export function save_data(file_path: string, data: any) {
    writeFileSync(file_path, JSON.stringify(data));
}

export function load_data(file_path: string): any {
    return JSON.parse(readFileSync(file_path, "utf8"));
}