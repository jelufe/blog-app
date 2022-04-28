import { IUserAuth } from "./userAuth.interface";

export interface IContext extends IUserAuth {
    authenticate: (email: string, password: string) => Promise<void>;
    authenticateGoogle: (tokenGoogle: string) => Promise<void>;
    logout: () => void;
}