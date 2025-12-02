import React from "react";
import Card from "./card";
 

function Tours ({tours,removeTour}){
  return(
    <div>
        <div>
           <h2 className= 'text-9xl text-blue-600'>Plan With Love</h2>
        </div>
        <div> 
          {
            tours.map((tours)=>{
              return   <Card key={tours.id} {...tours} removeTour={removeTour}></Card> // isme key ka use kiya hun
            })

          }
        </div>
    </div>
  )
}

export default Tours;