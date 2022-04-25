import { Navigate } from "react-router-dom";
import { getUserLocalStorage } from "../../context/providers/util";

export const ProtectedLayout = ({children, userTypesAllowed} : {children : JSX.Element, userTypesAllowed: string[]}) => {
    const user = getUserLocalStorage();

    if (!user?.email) {
        return <Navigate to="/login" />
    } else {
        if (!userTypesAllowed.includes(user.role))
            return <Navigate to="/login" />
    }

    return children;
}