import axios from 'axios';

import React, { useEffect, useState } from 'react'


import Loadingscreen from '../LoadingScreen/Loadingscreen';
import { Link } from 'react-router-dom';

export default function People() {
  let mediaType='person'
  const [pepole, setPepole] = useState(null)
  const [isLoading, setisLoading] = useState(false)
 let nums= new Array(10).fill(1).map((ele,index)=>index+1);

  
  async function getTrending(page){
    setisLoading(<Loadingscreen/>)
    let {data}= await axios.get( `https://api.themoviedb.org/3/person/popular?api_key=99d7f41a074df442999f3e145755a6b6&language=en-US&page=${page}`)
  
    setPepole(data.results)
    setisLoading(false)
  console.log(data.results)
  }
  useEffect(()=>{
    getTrending(1);

  },[])

    return <> {isLoading==false?<>
    
    {pepole?    <div className="row py-3">
     {pepole?.map((item,index)=>{
      return   <div key={index} className="col-md-3 p-2">
      <Link to={`/movidetails/${item.id}/${mediaType}`} className='text-decoration-none text-white'>
     
        <div className="ittem position-relative">
       
      <img src={'https://image.tmdb.org/t/p/w500'+item.profile_path} className='w-100' alt={item.name}/>
    
        
    
    <h3 className='h6'>{item.name}</h3>
    {item.vote_average?
    <div className="vote position-absolute top-0 end-0 p-1 ">
    {item.vote_average.toFixed(1)}
    
    </div>:''}
    
        </div>
        </Link>
      </div>
     })}
    
  </div>:<Loadingscreen/> }
  <nav className='py-5'>
<ul className=' pagination pagination-sm d-flex justify-content-center'>

  {nums.map((page,ind)=><li key={page} onClick={()=>getTrending(page)} className='page-item p-1'>
   
   
     <Link  className='page-link bg-transparent text-white' >{page}</Link>
    
   
      </li>
  
  
   
  
  
  )}
 
</ul>
  </nav>
 
    
    </>:<Loadingscreen/>}

  </>
}
