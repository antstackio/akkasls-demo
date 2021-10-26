import React from 'react';
import CartItemCard from './CartItemCard';
import { Link } from 'react-router-dom';

class Cart extends React.Component {

    // cartItems = await getCart();
    renderCart = this.props.cart.map((item) => {
        return (
            <CartItemCard
            cartItem={item}
            items={this.props.items}
            removeFromCart={this.props.removeFromCart}
            addToCart={this.props.addToCart}
            key={item.productId}
            />
        )
    });

    render () {
      if(this.props.cart.length === 0) {
        return (
          <div className="ui items" style={{margin: "90px"}}>
            <div className="item">
              <div className="ui breadcrumb">
                <Link to={{ pathname: "/"}}>
                    <div className="section">Back to Catalog</div>
                </Link>
              </div>
            </div>
            <div className="item">
              <h3 className="header">{this.props.user.name}'s Cart</h3>
              <h5> is looking rather empty</h5>
            </div>
        </div>
        )
      }
      return (
        <div className="ui items" style={{margin: "90px"}}>
          <div className="item">
            <div className="ui breadcrumb">
              <Link to={{ pathname: "/"}}>
                  <div className="section">Back to Catalog</div>
              </Link>
            </div>
          </div>
          <div className="item">
            <h3 className="header">{this.props.user.name}'s Cart</h3>
            <div className="ui grid" style={{margin: "20px"}}>{this.renderCart}</div>
          </div>
        </div>
      )
    }
};

export default Cart;