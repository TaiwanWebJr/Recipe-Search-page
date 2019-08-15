import React from "react";
import "./Child.css";
const Child = ({title,text,img,ingredients}) =>{

  return(
    <div className="recipe"> 
      <h3>{title}</h3>
      <ol>
        {ingredients.map((item,i)=><li key={i}>{item.text}</li>)}
      </ol>
      <img src={img} alt=""/>
    </div>
  )
}
export default Child;
