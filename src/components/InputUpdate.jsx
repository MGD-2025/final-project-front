import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const tipos = ['Entrantes', 'Principales', 'Ensaladas', 'Postres'];
const alergia = ['Lácteos', 'Huevos', 'Gluten', 'Mariscos', 'Vegano']

const InputUpdate = ({ actualizarReceta }) => {
  const { id } = useParams();

  const [nombre, setNombre] = useState('');
  const [orden, setOrden] = useState([]);
  const [ingredientes, setIngredientes] = useState('');
  const [preparacion, setPreparacion] = useState('');
  const [alergenos, setAlergenos] = useState ([])
  const [mensaje, setMensaje] = useState('');

  const urlApi = `http://localhost:3000/editar/${id}`;
    
  useEffect(() => {
    const fetchReceta = async () => {
      const response = await fetch(`http://localhost:3000/id/${id}`);
      const resData = await response.json();

      setNombre(resData.Nombre || '');
      setOrden(resData.Orden || []);
      setIngredientes(resData.Ingredientes?.join(',') || '');
      setPreparacion(resData.Receta?.join(',') || '');
      setAlergenos (resData.Alergenos || []); 
      
    };

    fetchReceta()
    
  }, [id]);

  const updateReceta = async () => {
    try {

      const body = {
        Nombre: nombre,
        Orden: orden,
        Ingredientes: ingredientes.split(','),
        Receta: preparacion.split(','),
        Alergenos: alergenos
      };

      await fetch(urlApi, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setMensaje('Receta modificada')
      actualizarReceta();
      
    } catch (error) {
      console.error(mensaje);
      setMensaje('Error al modificar la receta')
    }
  };

  return (
    <>
      <input
        type='text'
        placeholder='Nombre'
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <select 
        multiple 
        value={orden} 
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => option.value);
          setOrden(values);
        }}
      >
        <option value="Entrantes">Entrantes</option>
        <option value="Principales">Principales</option>
        <option value= "Ensaladas">Ensaladas</option>
        <option value="Postres">Postres</option>
      </select>

      <input
        type='text'
        placeholder='Ingredientes (separados por ;)'
        value={ingredientes}
        onChange={(e) => setIngredientes(e.target.value)}
      />

      <input
        type='text'
        placeholder='Preparación (separada por ;)'
        value={preparacion}
        onChange={(e) => setPreparacion(e.target.value)}
      />

      <select 
        multiple 
        value={alergenos} 
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => option.value);
          setAlergenos(values);
        }}
      >
        <option value="Lácteos">Lácteos</option>
        <option value="Huevos">Huevos</option>
        <option value= "Gluten">Gluten</option>
        <option value="Mariscos">Mariscos</option>
        <option value="Vegano">Vegano</option>

      </select>

      <button onClick={updateReceta}>Actualizar receta</button>
    </>
  );
};

export default InputUpdate;