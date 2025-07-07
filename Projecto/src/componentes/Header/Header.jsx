import "./Header.css";

export function Header({ title, links }) {
  return (
    <header className="hero">
      <div className="hero-container">
        <h1 className="hero-title">{title}</h1>
        <nav className="hero-nav">
          {links.map((link, index) => (
            <a key={index} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
