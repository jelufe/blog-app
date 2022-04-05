export interface IPost {
    postId: number;
    title: string;
    description: string;
    user: {
        userId: number;
        name: string;
    }
}