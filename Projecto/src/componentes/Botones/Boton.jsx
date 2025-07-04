import './Boton.css';

export function Boton({ text, handler }) {
  return (
    <button className="boton" onClick={() => handler()}>
      {text}
    </button>
  );
}
