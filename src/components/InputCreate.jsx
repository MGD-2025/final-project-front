import { useState } from "react";

const InputCreate = ({newReceta}) =>{
    const [receta, setReceta] = useState('')
    const urlApi = 'http://localhost:3000/create'
    const createReceta = async () =>{
    try{
        const response = await fetch(urlApi, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Nombre:receta}),
      })
    setReceta('')
    newReceta()

    }catch (error){
      console.error(error)
    }
  }

return (
    <>
    <input
    type='text'
    placeholder='Añande una nueva receta'
    value={receta}
    onChange={(e)=>setReceta(e.target.value)}
    />
    <button onClick={createReceta} type='submit'>Nueva Receta</button>
    </>
)
}

export default InputCreate