import {AlertTitle, Button, Grid, TextField , Box, Alert} from '@mui/material';
import React, { useState } from 'react';


const MakeAdmin = () => {
    const[email,setEmail] = useState('')
    const [success,setSuccess] = useState(false)
    const handleOnBlur = e => {
        setEmail(e.target.value)
    }

    const handleAdminSubmit = (e) => {
        const user ={email}
        fetch('https://sheltered-reaches-06774.herokuapp.com/users/admin',{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount){
                setSuccess(true)
                console.log(data);
            }
        })
        e.preventDefault();
    }
    return (
        <Box>
              {success && <Alert severity="success">
           <AlertTitle>Success</AlertTitle>
            You have made a admin successfully — <strong>Congrats!</strong>
        </Alert>}
            <Grid container spacing={2}>
          
                <Grid item xs={12} md={5}>
                <h2>Make a Admin</h2>
               <form onSubmit={handleAdminSubmit}>
                <TextField type="email" onBlur={handleOnBlur} id="outlined-basic" label="email" variant="outlined" />
                <br/>
              <Button sx={{mt:2}}type='submit' variant='contained'>Make Admin</Button>
            
               </form>

                </Grid>

                <Grid item xs={12} md={7}>
                    <img src="https://i.ibb.co/WVQq6dJ/4346259.jpg" alt="" style={{width:'75%'}}/>
                </Grid>
 
            </Grid>
        </Box>
    );
};

export default MakeAdmin;