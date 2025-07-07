import "../Header/Header.css";
export function Hero() {
  return (
    <header className="hero">
      <div className="hero-container">
        <h1 className="hero-title">NoticiasARG</h1>
        <nav className="hero-nav">
          <a href="/">Inicio</a>
          <a href="/login">Iniciar Sesión</a>
          <a href="/registro">Registrarse</a>
        </nav>
      </div>
    </header>
  );
}
