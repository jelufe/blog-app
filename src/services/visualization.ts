import { Api } from "./api";

export async function InsertVisualization(sessionId: string | null, userId: number | null, postId: number) {
    const api = new Api();
    const request = await api.instance.post('visualization', {sessionId, userId, postId});

    return request.data;
}

export async function UpdateVisualization(visualizationId: number, sessionId: string | null, userId: number | null, postId: number) {
    const api = new Api();
    const request = await api.instance.put('visualization', {visualizationId, sessionId, userId, postId});

    return request.data;
}