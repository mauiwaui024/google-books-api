import React from "react";


function Card (props){
    return (<div className="book-card col-md-3 col-xs-6 .offset-md-5" >
   <img src={props.img} class="card-img-top" alt="No Image in Library"></img>
   
      <p className="p-grey"> {props.category}</p>
      <p> {props.title}</p>
      <p>{props.authors}</p>
      
  </div>
)
}


export default Card;