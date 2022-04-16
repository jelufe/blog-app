import {createContext, useEffect, useState} from "react";
import { IAuthProvider } from "../interfaces/authProvider.interface";
import { IContext } from "../interfaces/context.interface";
import { IUserAuth } from "../interfaces/userAuth.interface";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";
import jwtDecode from "jwt-decode";
import { IJWTUser } from "../../models/jwtUser.interface";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({children}: IAuthProvider) => {
    let [user, setUser] = useState<IUserAuth | null>();

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user)
            setUser(user);
    }, []);

    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password);

        var decoded = jwtDecode<IJWTUser>(response.data.token);

        const payload = {
            token: response.data.token,
            userId: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role
        };

        setUser(payload);
        setUserLocalStorage(payload);
    }

    function logout() {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
