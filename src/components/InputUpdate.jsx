import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const tipos = ['Entrantes', 'Principales', 'Ensaladas', 'Postres'];
const alergia = ['Lácteos', 'Huevos', 'Gluten', 'Mariscos', 'Vegano']

const InputUpdate = ({ actualizarReceta }) => {
  const { id } = useParams();

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('[]');
  const [ingredientes, setIngredientes] = useState('');
  const [preparacion, setPreparacion] = useState('');
  const [alergenos, setAlergenos] = useState ('[]')

  const urlApi = `http://localhost:3000/editar/${id}`;
    
  useEffect(() => {
    const fetchReceta = async () => {
      const response = await fetch(`http://localhost:3000/id/${id}`);
      const resData = await response.json();

      setNombre(resData.Nombre || '');
      setTipo(resData.Tipo || '');
      setIngredientes(resData.Ingredientes?.tipo?.join(',') || '');
      setPreparacion(resData.Receta?.preparacion?.join(',') || '');
      setAlergenos (resData.Alérgenos?.tipo || ''); 
    };

    fetchReceta()
    
  }, [id]);

  const updateReceta = async () => {
    try {

      const body = {
        Nombre: nombre,
        Tipo: tipo,
        Ingredientes: {
          tipo: ingredientes.split(',') 
        },
        Receta: {
          preparacion: preparacion.split(',')
        }
      };

      await fetch(urlApi, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      actualizarReceta();
      
    } catch (error) {
      console.error(error);
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
        value={tipo} 
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => option.value);
          setTipo(values);
        }}
      >
        <option value="Entrantes">Entrantes</option>
        <option value="Principales">Principales</option>
        <option value= "Ensaladas">Ensaladas</option>
        <option value="Postres">Postres</option>
      </select>

      <input
        type='text'
        placeholder='Ingredientes (separados por coma)'
        value={ingredientes}
        onChange={(e) => setIngredientes(e.target.value)}
      />

      <input
        type='text'
        placeholder='Preparación (separada por coma)'
        value={preparacion}
        onChange={(e) => setPreparacion(e.target.value)}
      />

      <select value={alergia} onChange={(e) => setAlergenos(e.target.value)}>
        <option value="">Selecciona Alérgenos</option>
        {alergia.map(alergia => (
        <option key={alergia} value={alergia}>{alergia}</option>
        ))}
      </select>

      <button onClick={updateReceta}>Actualizar receta</button>
    </>
  );
};

export default InputUpdate;