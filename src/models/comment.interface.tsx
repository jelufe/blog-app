export interface IComment {
    commentId: number;
    message: string;
    postId: number;
    user: {
        userId: number;
        name: string;
    }
    post: {
        postId: number;
        title: string;
    }
}