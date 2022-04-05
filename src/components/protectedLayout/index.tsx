import { Navigate } from "react-router-dom";
import { getUserLocalStorage } from "../../context/providers/util";

export const ProtectedLayout = ({children} : {children : JSX.Element}) => {
    const user = getUserLocalStorage();

    if (!user?.email) {
        return <Navigate to="/login" />
    }

    return children;
}