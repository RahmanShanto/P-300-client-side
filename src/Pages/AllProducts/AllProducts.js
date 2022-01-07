import React, { useEffect, useState } from 'react';
import {Box, Container, Grid, Typography } from '@mui/material';
import AllProduct from '../AllProduct/AllProduct';

const AllProducts = () => {
    const [allProducts,setAllProducts] = useState([])
    useEffect(()=>{
        fetch('https://sheltered-reaches-06774.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>{
            setAllProducts(data)
        })
    },[])
    return (
        <Box sx={{flexGrow:1}}>
        <Container>
            <Typography sx={{ fontWeight: 700, m: 2, color: '#9F1E1E' }} variant="h4">
                OUR PRODUCTS
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    allProducts.map(pd => <AllProduct
                    key={pd._id}
                    products={pd}
                    ></AllProduct>)
                }
            </Grid>
        </Container>
    </Box>
    );
};

export default AllProducts;