import"./Nav.css"
export function Nav(){
    return (
    <header className="hero">
      <div className="hero-container">
        <h1 className="hero-title">Panel Controller</h1>
        <nav className="hero-nav">
          <a href="/inicioadmin">Inicio</a>
          <a href="/subir">Subir Noticias</a>
          <a href="/verusuarios">Ver usuarios usuarios</a>
        </nav>
      </div>
    </header>
  );
}
