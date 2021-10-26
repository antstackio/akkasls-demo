import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = (props) => {
    const {id, name, description, image, price} = props.item;
    return (
        <div className="ui card" style={{margin: "10px"}}>
            <div className="image">
                <img src={'/'+image} alt={image}/>
            </div>
            <div className="content">
                <div className="right floated" style={{marginRight: "10px"}} onClick={() => props.addToCart(id)}>
                    <a><i className="inverted orange cart plus icon"/></a>
                </div>
                <Link to={{ pathname: `/item/${id}`, state: { item: props.item }} }>
                    <div className="header" style={{marginLeft: "10px"}}>
                        {name}
                    </div>
                    <div className="meta" style={{marginLeft: "10px"}}>
                        Rs. {price}
                    </div>
                    <div className="description" style={{marginLeft: "10px", marginBottom: "10px"}}>
                        {description}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ItemCard;
