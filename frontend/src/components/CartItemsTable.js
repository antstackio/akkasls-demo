import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const CartItemsTable = (props) => {

    const [usercart, setUsercart] = useState([]);
    const cart_backend = process.env.CART_BACKEND

    async function getCartItems(url='', id='') {
        const response = await fetch(url + 'carts/' + id);
        return response.json();
    }

    async function getCart(url='', id='') {
        const userCart = await getCartItems(url, id);
        setUsercart(userCart.items);
    }

    useEffect(() => {
        getCart(cart_backend, props.location.state.user.id);
    }, []);

    console.log(usercart);
    const renderTableContents = usercart.map((item) => {
        console.log(item);
        return (
            <CartItem item={item} />
        )
    })

    return (
        <div style={{marginTop: "70px"}}>
            <div className="ui breadcrumb">
                <Link to={{ pathname: "/"}}>
                    <div className="section">Back to Catalog</div>
                </Link>
                <div className="divider">
                    /
                </div>
                <Link to={{ pathname: "/eekeekai"}}>
                    <div className="section">All Users</div>
                </Link>
                <div className="divider">
                    /
                </div>
                <div className="active section">
                    {props.location.state.user.name}
                </div>
            </div>
            <div className="ui cards" style={{ margin: "50px"}}>
                <div className="card">
                    <div className="content">
                        <div className="header">
                            {props.location.state.user.name}
                        </div>
                        <div className="meta">
                            ID: {props.location.state.user.id}
                        </div>
                        <div className="description">
                            Email: {props.location.state.user.emailAddress}
                        </div>
                    </div>
                </div>
            </div>
            <table className="ui celled table">
                <thead>
                    <tr><th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th></tr>
                </thead>
                <tbody>
                    {renderTableContents}
                </tbody>
            </table>
        </div>
    )
}

export default CartItemsTable;