import { IChart } from "./chart.interface";

export interface IDashboard {
    usersMostCommentsInMonth: IChart[];
    postsMostCommentsInMonth: IChart[];
    postsMostViewsInMonth: IChart[];
    postsMostSharesInMonth: IChart[];
    postsMostLikesInMonth: IChart[];
}