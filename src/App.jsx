import React, { useState } from 'react'
import Tours from './components/Tours'
import data from './components/data'
import UndertakingLetter from './components/UndertakingLetter'

const App=() =>{

  const[tours,setTours]=useState(data)

  function removeTour(id){
       const newTours = tours.filter(tour =>tour.id !== id); // ynha pr hum filter kr rhe jiski id same ni hai voh new tours me ajayenge
         setTours(newTours);
            }

 // render to no tour left ui page ---

   if (tours.length === 0){
    return(
      <div className='refresh'>
        <h2> No Tours Left</h2>
        <button onClick={()=>setTours(data)}>Refresh</button>       
      </div>
    )
   }         

  return (
    <div>
      <UndertakingLetter/>
      <Tours tours={tours} removeTour={removeTour}></Tours>
    </div> 
      
  )
}

export default App
 