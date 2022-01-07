import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import swal from '@sweetalert/with-react'

const Purchase = () => {
    const[singleProduct,setSingleProduct] = useState({})
    const {user} = useAuth()
    const {id} = useParams()
    console.log(typeof id)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.status = 'Pending';
        console.log(data)
        fetch('https://sheltered-reaches-06774.herokuapp.com/orders',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        
        swal( <p style={{color:'green'}}>
            Thank you for trusting us.Your order has been confirmed.
          </p>)
    };
    useEffect(()=>{
        fetch(`http://localhost:5000/purchase/${id}`)
        .then(res=>res.json())
        .then(data=>setSingleProduct(data))
    },[id])
    console.log(singleProduct)
    return (
        
        
    <Container sx={{mx:'auto'}}>
                   <Grid container spacing={2} style={{margin:'30px'}}>
  <Grid item xs={12} md={5}>
  <Card sx={{border: 1, boxShadow: 1, p:2 ,bgcolor:'black'}}>
            <CardMedia
                component="img"
                style={{ width: '100%', height: 'auto', margin: '0 auto' }}
                image={singleProduct?.img}
                alt="green iguana"
            />
            <CardContent style={{textAlign:'left'}} sx={{color:'whitesmoke'}}>
                <Typography variant="h5" component="div" sx={{fontWeight:600}}>
                    {singleProduct?.title}
                </Typography>
               
            </CardContent>
           
        </Card>
  </Grid>
  <Grid item xs={12} md={7}>
  <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column' ,padding:'10px'}}>
      {/* register your input into the hook by invoking the "register" function */}
      <input readOnly defaultValue={singleProduct?.title} 
      {...register("title",{required:true})} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />
      <input readOnly defaultValue={singleProduct?.price} 
      {...register("price",{required:true})} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />
      {user && 
      <input defaultValue={user?.displayName} 
      {...register("name")} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />}
      {user &&
      <input type='email' defaultValue={user?.email} 
      {...register("email" , {required:true})} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />
      }
      
      {/* include validation with required or other standard HTML validation rules */}
      <input placeholder='phone' {...register("phone", { required: true })} style={{padding:'10px' , width:'50%' , marginBottom:'30px'}} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input defaultValue="Buy Now" 
      style={{color:'white',padding:'5px' , width:'25%' , marginBottom:'5px' , backgroundColor:'#36DDCC' , border:0 , boxShadow:0,cursor:'pointer'}}
      type="submit" />
     </form>
  </Grid>
  

</Grid>
    </Container>
           
  
    );
};

export default Purchase;