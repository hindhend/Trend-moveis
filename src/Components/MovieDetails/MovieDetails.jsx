
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loadingscreen from '../LoadingScreen/Loadingscreen';

export default function MovieDetails() {

  let {id  , mediaType}=useParams();
const [details, setdetails] = useState(null)
 
async function getDetails(id,mediaType){
  let{data}= await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=99d7f41a074df442999f3e145755a6b6&language=en-US`)
  setdetails(data)
console.log(data)
}
useEffect(()=>{
  getDetails(id,mediaType)
},[])


  return<>
  <div className="row">
    {details?<>
      <div className="col-md-3">
{details?.poster_path?
      <img src={'https://image.tmdb.org/t/p/w500'+details.poster_path} className='w-100' alt={details.title}/>:
      <img src={'https://image.tmdb.org/t/p/w500'+details?.profile_path} className='w-100' alt={details?.name}/>
    }

</div>
<div className="col-md-6 d-flex align-items-center p-2">
  <div>
<h2 className='h3'>{details.title}{details.name}</h2>
<p className='text-muted'>{details.overview}{details.biography}</p>

{details.vote_average?<h2 className='h3'> voteAverage: {details.vote_average}</h2>:" "}
{details.vote_count?<h2 className='h3'>voteCcount :{details.vote_count}</h2>:" "}

  </div>
  </div>
    </>:<Loadingscreen/>}




  </div>
  
  
  
  
  </>
}
