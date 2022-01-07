import React, { useEffect, useState } from 'react';
import {Container, Grid, Typography ,Box, Card, CardMedia, CardContent, CardActions, Button} from '@mui/material';

const ManageProducts = () => {
    const [isDeleted , setIsDeleted] =useState(null);
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        fetch('https://sheltered-reaches-06774.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[isDeleted])

    const handleDelete = (id) => {
        fetch(`https://sheltered-reaches-06774.herokuapp.com/deleteProducts/${id}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json'
            }
            
        })
        .then(res=>res.json())
            .then(result=>{
                if(result.deletedCount){
                    setIsDeleted(true)
                }
                else{
                    setIsDeleted(false);
                }
            })
            alert('Do You want to procceed?')
    }

    return (
        <Box sx={{flexGrow:1}}>
        <Container>
            <Typography sx={{ fontWeight: 700, m: 2, color: '#9F1E1E' }} variant="h4">
                All PRODUCTS
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    products.map(pd => <Grid item xs={4} sm={4} md={4}>
                        <Card sx={{border: 1, boxShadow: 1, p:2 ,bgcolor:'black' }}>
                            <CardMedia
                                component="img"
                                style={{ width: '100%', height: 'auto', margin: '0 auto' }}
                                image={pd.img}
                                alt="green iguana"
                            />
                            <CardContent sx={{color:'whitesmoke' , textAlign:'left'}}>
                                <Typography variant="h5"  component="div" sx={{fontWeight:600}}>
                                    {pd.title}
                                </Typography>
                                <Typography variant="body1" color="text.white" sx={{fontWeight:600}}>
                                   Price: {pd.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button variant="contained" onClick={()=>handleDelete(pd._id)}>Delete Product</Button>
                         </CardActions>
                        </Card>
                    </Grid>)
                }
            </Grid>
        </Container>
    </Box>
    );
};

export default ManageProducts;