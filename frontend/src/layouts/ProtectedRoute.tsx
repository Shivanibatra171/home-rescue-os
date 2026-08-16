    import { Navigate, Outlet } from 'react-router-dom';
    import { useAuth } from '@/hooks/useAuth';
    import type { UserRole } from '@/types';
    import { ROUTES } from '@/utils/constants';

    export function ProtectedRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.USER_LOGIN} replace />;
    }

    if (role && !allowedRoles.includes(role)) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
    }