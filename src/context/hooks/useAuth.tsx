import { useContext } from "react"
import { AuthContext } from "../providers/authProvider";

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
}