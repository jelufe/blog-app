import { IDashboard } from "../models/dashboard.interface";
import { Api } from "./api";

export async function GetDashboard() {
    try {
        const api = new Api();
        const reponse = await api.instance.get('dashboard');

        return reponse.data.data as IDashboard;
    } catch (error) {
        return null;
    }
}