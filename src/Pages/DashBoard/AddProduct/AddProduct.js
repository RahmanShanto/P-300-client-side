import React from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const onSubmit = data => {
        fetch('https://sheltered-reaches-06774.herokuapp.com/addProduct',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        console.log(data)
        reset();
      };
    const { register, handleSubmit ,reset} = useForm();
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column' ,padding:'10px'}}>
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder='title'
      {...register("title",{required:true})} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />
      <input placeholder='price'
      {...register("price",{required:true})} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />
      
      <input placeholder='image'
      {...register("img")} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />
    
      
      
      
      <input value="Add Product" 
      style={{color:'white',padding:'5px' , width:'25%' , marginBottom:'5px' , backgroundColor:'#36DDCC' , border:0 , boxShadow:0,cursor:'pointer'}}
      type="submit" />
     </form>
    );
};

export default AddProduct;