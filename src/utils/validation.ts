export function validateToken(token: string) {
    return process.env.TOKEN === token;
}