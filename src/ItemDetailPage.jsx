import { useParams } from "react-router-dom";
import InputUpadate from "./components/InputUpdate";

const ItemDetailPage = ({ data }) => {
  const { id } = useParams();

  const receta = data?.find(item => item._id.toString() === id);

  if (!receta) {
    return <p>Cargando...</p>;
  }

  const ingredientes = Array.isArray(receta.Ingredientes)
    ? receta.Ingredientes
    : receta.Ingredientes?.tipo || [];

    const preparacion = Array.isArray(receta.Receta)
    ? receta.Receta
    : receta.Receta?.preparacion || [];

  const updateReceta = async (id) => {
    try {
      await fetch(`http://localhost:3000/id/${id}`, {
        method: "PUT"
      });

      setRecetas(recetas.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error al actualizar", error);
    }
  };

  return (
    <>
      <h2>{receta.Nombre}</h2>

      <h3>Ingredientes:</h3>
      <ul>
        {ingredientes.map((ingredientes, index) => (
          <li key={index}>{ingredientes}</li>
        ))}
      </ul>

      <p>Como se hace: </p>
      <ol>
        {preparacion.map((preparacion, index) => (
          <li key={index}>{preparacion}</li>
        ))}
      </ol>
      <button onClick={() => updateReceta(receta._id)}> Editar receta </button>

    </>
  );
};

export default ItemDetailPage;