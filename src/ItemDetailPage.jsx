import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from './ItemDetailPage.module.css'

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
      <h2 className={styles.titulo} >{receta.Nombre}</h2>

      <h3 className={styles.ingredientes} >Ingredientes:</h3>
      <ul className={styles.listaIng}>
        {ingredientes.map((ingredientes, index) => (
          <li key={index}>{ingredientes}</li>
        ))}
      </ul>

      <p className={styles.preparacion}>Como se hace: </p>
      <ol className={styles.listaPrep}>
        {preparacion.map((preparacion, index) => (
          <li key={index}>{preparacion}</li>
        ))}
      </ol>

      <p className={styles.tipo}>Esta receta está en: <p className={styles.tipoWord}>{receta.Orden.join(',')}</p></p>
      <p className={styles.tipo}>Esta receta contiene:<p className={styles.tipoWord}>{receta.Alergenos.join(',')}</p></p>

      <Link to={`/editar/${receta._id}`}><button className={styles.boton}type='submit'> Editar receta </button></Link>

    </>
  );
};

export default ItemDetailPage;