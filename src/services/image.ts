import { IImage } from "../models/image.interface";
import { Api } from "./api";
import { Buffer } from "buffer/"

export async function GetImages() {
    try {
        const api = new Api();
        const reponse = await api.instance.get('image');

        return reponse.data.data as IImage[];
    } catch (error) {
        return null;
    }
}

export async function RemoveImage(imageId: number) {
    const api = new Api();
    const request = await api.instance.delete(`image/${imageId}`);

    return request.data;
}