export interface INotification {
    notificationIdId: number;
    title: string;
    message: string;
    createdAt: Date;
    user: {
        userId: number;
        name: string;
    }
    receiver: {
        userId: number;
        name: string;
    }
}