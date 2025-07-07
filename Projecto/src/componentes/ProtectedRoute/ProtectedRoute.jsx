import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexto/AuthContexto.jsx';

export function ProtectedRoute({ children, allowedRoles = [] }) {
  const { IsLogged, user } = useAuth();

  // Si no está logueado, redirige al login
  if (!IsLogged) return <Navigate to="/login" replace />;

  // Si allowedRoles está vacío => ruta accesible para todos los logueados
  if (allowedRoles.length === 0) return children;

  // Si su rol está permitido => accede; si no => redirige a inicio
  if (allowedRoles.includes(user?.rol)) return children;

  return <Navigate to="/" replace />;
}
