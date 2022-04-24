import { Api } from "./api";

export async function InsertSharing(sessionId: string | null, userId: number | null, postId: number) {
    const api = new Api();
    const request = await api.instance.post('sharing', {sessionId, userId, postId});

    return request.data;
}