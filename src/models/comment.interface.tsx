export interface IComment {
    commentId: number;
    message: string;
    user: {
        userId: number;
        name: string;
    }
}