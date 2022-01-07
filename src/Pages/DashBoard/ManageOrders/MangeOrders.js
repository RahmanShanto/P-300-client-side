import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const MangeOrders = () => {
    const [isDeleted,setIsDeleted] = useState(null)
    const [allOrders , setAllOrders] = useState([]);
    const [status,setStatus] = useState("")
    const handleStatus = (e) => {
        setStatus(e.target.value);
        e.preventDefault();
      };
    
    const handleUpdate = (id) => {
      
        fetch(`https://sheltered-reaches-06774.herokuapp.com/allOrders/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status})
            
        })
        
    };
    console.log(status)
    useEffect(()=>{
        fetch('https://sheltered-reaches-06774.herokuapp.com/allOrders')
        .then(res=>res.json())
        .then(data=>setAllOrders(data));
    },[isDeleted])

    const handleDelete = (id) => {
        fetch(`https://sheltered-reaches-06774.herokuapp.com/allOrders/${id}`,{
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
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Price($)</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Cancel Order</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((order) => (
            <StyledTableRow key={order.name}>
              <StyledTableCell component="th" scope="row">
                {order.title}
              </StyledTableCell>
              <StyledTableCell align="right">{order.price}</StyledTableCell>
              <StyledTableCell align="right">{order.name}</StyledTableCell>
              <StyledTableCell align="right">{order.phone}</StyledTableCell>
              <StyledTableCell align="right">{order.email}</StyledTableCell>
              <StyledTableCell align="right"> <form onChange={handleStatus}>
                  <select>
                  <option value={order.status}>{order.status}</option>
                  <option type="text">Shipped</option>
                  </select>
                  <button 
              style={{backgroundColor:'black' , border:'0',color:'white' ,cursor:'pointer', padding:'10px' ,borderRadius:'2px'}}
              onClick={()=>handleUpdate(order._id)}>Update</button>
              </form>
    </StyledTableCell>
              <StyledTableCell align="right">
                  <button 
              style={{backgroundColor:'black' , border:'0',color:'white' ,cursor:'pointer', padding:'10px' ,borderRadius:'2px'}}
              onClick={()=>handleDelete(order._id)}>Cancel</button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
};

export default MangeOrders;