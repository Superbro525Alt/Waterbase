export function validate_token(token: string, valid_tokens: Array<string>): boolean {
    // return true if the token is in the valid_tokens array
    return valid_tokens.indexOf(token) != -1;
}

export function generate_auth_tokens(amt: number = 10, length: number = 10, parts: Array<string | number> | null = null): Array<string> {
    let tokens: Array<string> = [];

    for (let i = 0; i < amt; i++) {
        tokens.push(generate_auth_token(length, parts));
    }

    return tokens;
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