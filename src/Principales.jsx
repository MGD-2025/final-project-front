import { Link } from "react-router-dom";
import styles from './Paginas.module.css'


const Principales = ({ data }) => {

  if (!data) return <p>Cargando...</p>;

  const principales = data.filter(item =>
    Array.isArray(item.Orden)
      ? item.Orden.includes("Principales")
      : item.Orden === "Principales"
  );

  return (
    <div className={styles.container}>
      <h1>PRINCIPALES</h1>

      {principales.length === 0 && <p>No hay recetas</p>}

      <ul>
        {principales.map(item => (
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

export default Principales;