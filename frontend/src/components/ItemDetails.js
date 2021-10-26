import React from 'react';
import sample_image from '../images/db1.png';
import { Link } from 'react-router-dom';

const ItemDetails = (props) => {
    const {id, name, description, image, price} = props.location.state.item;
    return (
        <div className="ui items" style={{marginTop: "70px"}}>
            <div className="item">
                <div className="ui breadcrumb">
                    <Link to={{ pathname: "/"}}>
                        <div className="section">Catalog</div>
                    </Link>
                    <div className="divider"> / </div>
                    <div className="active section">{name}</div>
                </div>
            </div>
            <div className="item" style={{margin: "80px"}}>
                <div className="ui large image">
                    <img src={'/' + image} alt={image}/>
                </div>
                <div className="content" style={{margin: "50px"}}>
                    <div className="header" style={{margin: "20px", marginLeft: "0px"}}>{name}</div>
                    <div className="meta" style={{margin: "20px", marginLeft: "0px"}}>Rs. {price}</div>
                    <div className="description">
                        <p>{description}</p>
                        <p>{description}</p>
                        <p>{description}</p>
                        <p>{description}</p>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <div className="item">
                <div className="ui vertical animated button" tabIndex="0" onClick={() => props.addToCart(id)}>
                    <div className="visible content">
                        Add to Cart
                    </div>
                    <div className="hidden content">
                        <i className="shop icon"></i>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
