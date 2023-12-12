
import { networkInterfaces } from 'os';

export function get_ip_data(): any {
    const nets = networkInterfaces();

    if (!nets) {
        return {};
    }

    return nets
}

export function generate_auth_token(length: number = 10, parts: Array<string | number> | null = null): string {
    if (parts == null) {
        // generate a random string of numbers and letters that is length long
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    } else {
        // generate a random string of numbers and letters that is length long
        let result = '';
        let characters = parts;
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters[Math.floor(Math.random() *
                charactersLength)];
        }
        return result;
    }
}