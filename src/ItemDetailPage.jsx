const ItemDetailPage = ({item}) => {

  return (
    <>
    <h3>{item.nombre}</h3>
    <p>Receta añadida correctamente {`${item.completed}`}</p>
    </>
 
  );
};

export default ItemDetailPage;
