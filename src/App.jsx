import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Home'
import ItemDetailPage from "./ItemDetailPage";
import InputCreate from "./components/InputCreate.jsx";
import InputUpdate from "./components/InputUpdate.jsx";
import Entrantes from "./Entrantes.jsx";
import Ensaladas from "./Ensaladas.jsx";
import Principales from "./Principales.jsx";
import Postres from "./Postres.jsx";
import './App.css'

const App = () => {
  const [data, setData]= useState(null)
  const urlBase = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/'
  const urlApi = urlBase|| 'http://localhost:3000/'

  const fetchData = async () =>{
    try{
      const response = await fetch(urlApi)
      const resData = await response.json ()
      setData(resData)
    }catch (error){
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchData()

  }, [])
  return (
  <Router>
    <div className="container">
      <nav className='barra'>
        <Link to='/'> INICIO</Link>
        <Link to='/entrantes'> ENTRANTES</Link>
        <Link to='/principales'> PLATO PRINCIPAL</Link>
        <Link to='/ensaladas'> ENSALADAS</Link>
        <Link to='/postres'> POSTRES</Link>
      </nav>

      {data===null 
      ? ( <div>Cargando ...</div>) 
      : 
      <Routes>
        <Route path='/' element={<Home data={data}/>} /> 
        <Route path='/:id' element={<ItemDetailPage data={data} />} />
        <Route path='/create' element={<InputCreate newReceta={fetchData}/>} />
        <Route path='/editar/:id' element={<InputUpdate actualizarReceta={fetchData} />} />
        <Route path='/entrantes' element={<Entrantes data={data} />} />
        <Route path='/ensaladas' element={<Ensaladas data={data} />} />
        <Route path='/principales' element={<Principales data={data} />} />
        <Route path='/postres' element={<Postres data={data} />} />
      </Routes>
      }
    </div>

  </Router>      
  )
};

export default App;
