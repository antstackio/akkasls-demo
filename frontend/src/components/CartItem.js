import React from 'react';

class CartItem extends React.Component {
    render () {
        return (
            <tr>
               <td>{this.props.item.productId}</td>
               <td>{this.props.item.name}</td>
               <td>{this.props.item.quantity}</td>
            </tr>
        )
    }
}

export default CartItem;