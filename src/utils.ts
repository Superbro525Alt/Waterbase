
import { networkInterfaces } from 'os';

export function get_ip_data(): any {
    const nets = networkInterfaces();

    if (!nets) {
        return {};
    }

    return nets
}
