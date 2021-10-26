import React from 'react';
import sample_image from '../images/db1.png';
import { Link } from 'react-router-dom';

const CartItemCard = (props) => {
    const {productId, name, quantity} = props.cartItem;
    const itemDetails = props.items.filter((item) => {
        return item.id === productId;
    });
    return (        
        <div className="ui card">
            <div className="image">
                <img src={'/' + itemDetails[0].image} alt={itemDetails[0].image} />
            </div>
            <div className="content">
                <div className="right floated" style={{marginRight: "10px"}}>
                    {quantity}
                </div>
                <Link to={{ pathname: `/item/${itemDetails[0].id}`, state: {item: itemDetails[0] }}}>
                    <div className="header" style={{marginLeft: "10px"}}>
                        {name}
                    </div>
                    <div className="meta" style={{marginLeft: "10px"}}>
                        Rs. {itemDetails[0].price}
                    </div>
                    <div className="description" style={{marginLeft: "10px", marginBottom: "10px"}}>
                        {itemDetails[0].description}
                    </div>
                </Link>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui red button" onClick={() => props.removeFromCart(itemDetails[0].id)}>Remove</div>
                        <div className="ui green button" onClick={() => props.addToCart(itemDetails[0].id)}>Add more</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;
