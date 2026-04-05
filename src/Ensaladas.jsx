import { Link } from "react-router-dom";
import styles from './Paginas.module.css'



const Ensaladas = ({ data }) => {

  if (!data) return <p>Cargando...</p>;

  const ensaladas = data.filter(item =>
    Array.isArray(item.Orden)
      ? item.Orden.includes("Ensaladas")
      : item.Orden === "Ensaladas"
  );

  return (
    <div className={styles.container}>
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

      <nav className="addReceta">
        <Link to='/create'>Añade una nueva receta</Link>
      </nav>
    </div>
  );
};

export default Ensaladas;