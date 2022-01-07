import React from 'react';
import useAuth from '../../../hooks/useAuth';
import ManageProducts from '../ManageProducts/ManageProducts';
import MyOrders from '../MyOrders/MyOrders';

const DashBoardHome = () => {
    const {admin} = useAuth();
    return (
        <>
        {admin ? <ManageProducts></ManageProducts> : <MyOrders></MyOrders>}
        </>
    )
};

export default DashBoardHome;