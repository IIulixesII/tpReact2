import { useState, useEffect } from 'react';

export function useNoticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/noticias')
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((error) => {
        console.error('Error al cargar noticias:', error);
      });
  }, []);

  return [noticias];
}
