import { Link } from "react-router-dom";

const Ensaladas = ({ data }) => {

  if (!data) return <p>Cargando...</p>;

  const ensaladas = data.filter(item =>
    Array.isArray(item.Orden)
      ? item.Orden.includes("Ensaladas")
      : item.Orden === "Ensaladas"
  );

  return (
    <>
      <h1>ENSALADAS</h1>

      {ensaladas.length === 0 && <p>No hay recetas</p>}

      <ul>
        {ensaladas.map(item => (
          <li key={item._id}>
            <Link to={`/${item._id}`}>{item.Nombre}</Link>

            <Link to={`/editar/${item._id}`}>
              <button>Editar receta</button>
            </Link>
          </li>
        ))}
      </ul>

      <nav>
        <Link to='/create'>Añade una nueva receta</Link>
      </nav>
    </>
  );
};

export default Ensaladas;