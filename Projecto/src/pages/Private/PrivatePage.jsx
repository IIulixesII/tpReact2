import { useAuth } from "../../context/AuthContext";

export function PrivatePage() {
  const { isLogged, login, logout } = useAuth();

  if (!isLogged) {
    window.location.href = "/";
    return;
  }

  return <h1>Página privada</h1>;
}
