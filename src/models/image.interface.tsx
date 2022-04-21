export interface IImage {
    imageId: number;
    name: string;
    path: string;
    user: {
        userId: number;
        name: string;
    }
}