import { useState } from "react";

function Card({id,name,image,price,description,removeTour}){
            const [readmore,setReadmore]=useState(false);
            const info = readmore ? description :`${(description || '').substring(0,50)}....`; // isme substring ka mujhe smajh ni aaya ?

            function readmoreHandler(){
                setReadmore(!readmore);
            }
  
            
    return( 

        <div className="card">
            <img src={image} className="image"></img>
            
            <div className="tour-info">
              
              <div className="tour-details"> 
                <h4 className="tour-price">{price}</h4>
                <h4 className="tour-name">{name}</h4>
              </div>

              <div className="info">{info}
                <span className="read-more" onClick={readmoreHandler}> 
                  {readmore ?`show less`:`read more`}</span>
              </div>

            </div>
            
            <button onClick={()=>removeTour(id)}>Not Intrested</button>
        
        </div>
    );
}

export default Card;