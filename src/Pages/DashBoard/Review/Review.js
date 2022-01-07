
import { Alert } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';

const Review = () => {
    const {user} =useAuth()
    const [reviews,setReviews] = useState({})
    const { register, handleSubmit, formState: { errors } , reset} = useForm();
    const onSubmit = async (data) => {
        setReviews(data);
        fetch('https://sheltered-reaches-06774.herokuapp.com/reviews',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:await JSON.stringify(reviews)
        });
        reset();
        alert('Thanks for your review')
    };
  
  

    return (
    <>
     <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column' ,padding:'10px'}}>
      {/* register your input into the hook by invoking the "register" function */}
      <input style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} defaultValue={user.name}{...register("name")} />
      
      {/* include validation with required or other standard HTML validation rules */}
      <textarea style={{padding:'20px' , width:'50%' , marginBottom:'30px'}} {...register("review", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input value="Add Review" 
      style={{color:'white',padding:'5px' , width:'25%' , marginBottom:'5px' , backgroundColor:'#36DDCC' , border:0 , boxShadow:0,cursor:'pointer'}}
      type="submit" />
    
    </form>
   
    </>
    );
};

export default Review;