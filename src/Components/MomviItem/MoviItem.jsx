import React from 'react'
import { Link } from 'react-router-dom'

export default function MoviItem({item}) {



  return<>
   <div className="col-md-2 p-2">
  <Link to={`/movidetails/${item.id}/${item.media_type}`} className='text-decoration-none text-white'>
 
    <div className="ittem position-relative">
      {item.poster_path?
      <img src={'https://image.tmdb.org/t/p/w500'+item.poster_path} className='w-100' alt={item.title}/>:
      <img src={'https://image.tmdb.org/t/p/w500'+item.profile_path} className='w-100' alt={item.name}/>
    }

<h3 className='h6'>{item.title}{item.name}</h3>
{item.vote_average?
<div className="vote position-absolute top-0 end-0 p-1 ">
{item.vote_average.toFixed(1)}

</div>:''}

    </div>
    </Link>
  </div>

  </>
}
