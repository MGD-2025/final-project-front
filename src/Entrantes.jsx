import { Link } from "react-router-dom";

const Entrantes = ({ data }) => {

  if (!data) return <p>Cargando...</p>;

  const entrantes = data.filter(item =>
    Array.isArray(item.Orden)
      ? item.Orden.includes("Entrantes")
      : item.Orden === "Entrantes"
  );

  return (
    <>
      <h1>ENTRANTES</h1>

      {entrantes.length === 0 && <p>No hay recetas</p>}

      <ul>
        {entrantes.map(item => (
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

export default Entrantes;