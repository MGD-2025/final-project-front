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
    : receta.Ingredientes || [];

  const preparacion = Array.isArray(receta.Receta)
    ? receta.Receta
    : receta.Receta || [];

  const orden = Array.isArray(receta.Orden)
    ? receta.Orden
    : receta.Orden || [];
  
  const alergias = Array.isArray(receta.Alergenos)
    ? receta.Alergenos
    : receta.Alergenos || [];



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

      <p>Esta receta es: {receta.Orden.join(',')}</p>
      <p>Esta receta contiene: {receta.Alergenos.join(',')}</p>

      <Link to={`/editar/${receta._id}`}><button type='submit'> Editar receta </button></Link>

    </>
  );
};

export default ItemDetailPage;