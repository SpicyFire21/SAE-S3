export function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = str.length % 4;
    if (pad) {
        str += '='.repeat(4 - pad);
    }
    return atob(str);
}

export function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1];
        const jsonPayload = base64UrlDecode(base64Payload);
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Erreur lors du décodage du JWT :", e);
        return null;
    }
}

