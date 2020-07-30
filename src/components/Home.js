import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => (
  <div>
    <h1 className="text-center"> Welcome to Home Page </h1>
    <p className="text-center"> This is Simple Task Management Application, where Task creation, updation and deletion can be performed. <Link to={`/tasks`} ><span>click here</span></Link> for continue
     </p>
  </div>
)


export default Home;
