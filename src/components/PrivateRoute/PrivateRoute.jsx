import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    return user ? children : null;
}

export default PrivateRoute;