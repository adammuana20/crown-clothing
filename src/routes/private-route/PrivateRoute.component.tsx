import { Component, FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom'

type PrivateRouteProps = {
    navigateToPath: string;
    isAllowed: boolean;
    children?: Component;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ navigateToPath, children, isAllowed }) => {
    return (
        <>
            { !isAllowed ? (
                <Navigate to={navigateToPath} replace />
                ) : (
                    children ? children : <Outlet />
                )
            }
        </>
    )
}

export default PrivateRoute