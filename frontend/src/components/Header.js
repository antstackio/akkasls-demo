import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render () {
        return (
            <div className="ui fixed menu">
                <div className="ui container centre" style={{margin: '10px'}}>
                    <h2>Akkaserverless Demo Shopping Cart</h2>
                </div>
                <div className='item'>
                    <Link to="/cart">
                        <i className="cart icon"></i>
                        {this.props.user.name}'s cart
                    </Link>
                </div>
            </div>
        );
    }
};

export default Header;
