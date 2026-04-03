import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <Link to={`/editar/${receta._id}`}><button type='submit'> Editar receta </button></Link>

    </>
  );
};

export default ItemDetailPage;