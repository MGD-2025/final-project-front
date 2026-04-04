import { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ data }) => {
  const [recetas, setRecetas] = useState(data);
  const getRecetas = async () => {
  try {
    const response = await fetch('http://localhost:3000/');
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
      await fetch(`http://localhost:3000/id/${id}`, {
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
      <ul>
        {recetas.map(item => (
          <li key={item._id}>
            <Link to={`/${item._id}`}>{item.Nombre}</Link>
            <button onClick={() => deleteReceta(item._id)}> Eliminar receta </button>
          </li>
        ))}
      </ul>
      <nav>
        <Link to='/create'>Añade una nueva receta</Link>
      </nav>
    </>
  );
};

export default Home;