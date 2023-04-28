import axios from 'axios';
import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import Movies from '../Movies/Movies';
import MoviItem from '../MomviItem/MoviItem';
import Loadingscreen from '../LoadingScreen/Loadingscreen';


export default function Home() {

const [movi, setmovi] = useState(null)
const [tv, setTv] = useState(null)
const [pepole, setpepole] = useState(null)

async function getTrending(mediaType,callBack){
  let {data}= await axios.get( `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=99d7f41a074df442999f3e145755a6b6`)
callBack(data.results);

console.log(data.results)
}
useEffect(()=>{
  getTrending('movie',setmovi);
  getTrending('tv',setTv);
  getTrending('person',setpepole);
},[])
  return <>
    
    {movi? <>
    <div className="row py-3">
    <div className="col-md-4 d-flex align-items-center">
     <div>
<div className="brdr w-25 mb-2"></div>
<h2 className='h3'>Trending <br/> Movies <br/> To Watch Now</h2>
<p className='text-muted'>watching Moveis in week </p>
<div className="w-100 brdr mt-2"></div>


     </div>
    </div>
    {movi?.slice(0,10).map((item,inx)=>{
return <MoviItem key={inx} item={item}/>
})}
   </div>

   <div className="row py-3 d-flex align-items-center">
    <div className="col-md-4">
     <div>
<div className="brdr w-25 mb-2"></div>
<h2 className='h3'>Trending <br/> Tv <br/> To Watch Now</h2>
<p className='text-muted'>watching Tv in week </p>
<div className="w-100 brdr mt-2"></div>


     </div>
    </div>
    {tv?.slice(0,10).map((item,inx)=>{
return <MoviItem key={inx} item={item}/>
})}
   </div>

   <div className="row py-3 d-flex align-items-center">
    <div className="col-md-4">
     <div>
<div className="brdr w-25 mb-2"></div>
<h2 className='h3'>Trending <br/> Pepole <br/> To Watch Now</h2>
<p className='text-muted'>watching Pepole in week </p>
<div className="w-100 brdr mt-2"></div>


     </div>
    </div>
    {pepole?.slice(0,10).map((item,inx)=>{
return <MoviItem key={inx} item={item}/>
})}
   </div> </>: <Loadingscreen/>
  }
    
    </>
    
}
