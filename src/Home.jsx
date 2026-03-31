import { Link } from "react-router-dom";


const Home = ({data}) => {
  return (
    <>
    <h2>Recetas</h2>
    <ul>
      {data.map(item =>(
        <li key= {item._id}>
          <Link to={`/${item._id}`}>{item.nombre}</Link>

        </li>
      ))}
    </ul>
    </>
  )
};

export default Home;
