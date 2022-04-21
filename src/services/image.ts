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

export async function GetImage(imageId: number) {
    try {
        const api = new Api();
        const response = await api.instance.get(`image/${imageId}`, { responseType: "arraybuffer" });

        return Buffer.from(response.data, "binary").toString("base64");
    } catch (error) {
        return null;
    }
}

export async function RemoveImage(imageId: number) {
    const api = new Api();
    const request = await api.instance.delete(`image/${imageId}`);

    return request.data;
}