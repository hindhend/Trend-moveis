import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectRoute from './Components/ProtecRoute/ProtectRoute';
import MovieDetails from './Components/MovieDetails/MovieDetails';



export default function App() {
  const [userdata, setuserdata] = useState(null)
  


function getUsreData(){
  let encocode= localStorage.getItem('token');
  let decode= jwtDecode(encocode);
  setuserdata(decode);
  // console.log(userdata)

}
// for refresh
function solveRefresh(){

  if(localStorage.getItem('token')!=null && userdata==null){

    getUsreData();
  }
}
useEffect(()=>{
  solveRefresh()
},[])

let routers = createBrowserRouter([
  { path: "/", element: <Layout userdata={userdata} setuserdata={setuserdata} /> , children: [
    {path:"home", element:<ProtectRoute><Home/></ProtectRoute> },
    {path:"register", element:<Register/> },
    {path:"movies" , element:<ProtectRoute><Movies/></ProtectRoute> },
    {path:"tvshow" , element: <ProtectRoute><Tvshow/></ProtectRoute>},
    {path:"people" , element: <ProtectRoute><People/></ProtectRoute>},
    {path:"movidetails/:id/:mediaType" , element: <ProtectRoute><MovieDetails/></ProtectRoute>},
    {path:"login" , element: <Login getUsreData={getUsreData}/>},
    {index:true, element: <Home/>},
    {path:"*" , element:  <Login getUsreData={getUsreData}/>},
  ]}
])

  return <>
  
  <RouterProvider router={routers}></RouterProvider>
  </>
  

}