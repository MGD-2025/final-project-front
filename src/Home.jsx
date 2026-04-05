import { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  const [recetas, setRecetas] = useState(data);
  const urlBase = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/'

  const getRecetas = async () => {
  try {
    const response = await fetch('urlBase');
    const resData = await response.json();
    setRecetas(resData);
  } catch (error) {
    console.error(error);
  }
  useEffect(() => {
  getRecetas();
}, []);
};

  const deleteReceta = async (id) => {
    try {
      await fetch(`urlBase+id+${id}`, {
        method: "DELETE"
      });

      setRecetas(recetas.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <>
      <h1>MI RECETARIO</h1>
      <ul className='recetas'>
        {recetas.map(item => (
          <li className='recetasBox' key={item._id}>
            <Link to={`/${item._id}`}>{item.Nombre}</Link>
            <button onClick={() => deleteReceta(item._id)}> Eliminar receta </button>
          </li>
        ))}
      </ul>
      <nav className="addReceta">
        <Link to='/create'>Añade una nueva receta</Link>
      </nav>
    </>
  );
};

export default Home;