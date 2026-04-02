import { useState } from "react";

const InputUpadate = ({ actualizarReceta }) => {

  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparacion, setPreparacion] = useState('');

  const urlApi = `http://localhost:3000/id/${id}`;
    
  useEffect(() => {
    const fetchReceta = async () => {
      const res = await fetch(`http://localhost:3000/recetas/${id}`);
      const data = await res.json();

      setNombre(data.Nombre || '');
      setTipo(data.Tipo || '');
      setIngredientes(data.Ingredientes?.tipo?.join(',') || '');
      setPreparacion(data.Receta?.preparacion?.join(',') || '');
    };

    fetchReceta();
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

      setNombre('');
      setTipo('');
      setIngredientes('');
      setPreparacion('');

      newReceta();

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

      <input
        type='text'
        placeholder='Tipo (Entrantes, Postres...)'
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

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

      <button onClick={updateReceta}>Actualizar receta</button>
    </>
  );
};

export default InputUpadate;