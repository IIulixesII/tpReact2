import"./Hero.css"
export function Hero(){
    return (
      
    <header className="hero">
      <div className="hero-container">
        <h1 className="hero-title">Mi Sitio</h1>
        
        <nav className="hero-nav">
          <a href="/">Inicio</a>
          <a href="/usuarios">usuarios</a>
          <a href="/login">Iniciar Sesion</a>
          
        </nav>
      </div>
      
    </header>
    
  );
  
}
