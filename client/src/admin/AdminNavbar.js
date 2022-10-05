import { Button } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
export const AdminNavbar = () => {
    return (
        <div>
            <NavLink activeClassName='activeBtn' to={'/admin/userlist'}><Button className='adminsubnavbarbutton' type="primary">All Users</Button></NavLink>
            <br />
            <NavLink activeClassName='activeBtn' to={'/admin/pizzaslist'}><Button className='adminsubnavbarbutton' type="primary">All Pizzas</Button></NavLink>
            <br />
            <NavLink activeClassName='activeBtn' to={"/admin/addnewpizza"}><Button className='adminsubnavbarbutton' type="primary">Add New Pizza</Button></NavLink>
            <br />
            <NavLink activeClassName='activeBtn' to={"/admin/orderlist"}><Button className='adminsubnavbarbutton' type="primary">All Orders</Button></NavLink>
            <br />
        </div>
    )
}
