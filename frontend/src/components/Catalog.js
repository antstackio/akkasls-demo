import React from 'react';
import ItemCard from './ItemCard';


class Catalog extends React.Component {
    renderCatalog = this.props.items.map((item) => {
        return (
            <ItemCard item={item} key={item.id}  addToCart={this.props.addToCart}/>
        );
    });
    render () {
        return (
            <div className="ui grid" style={{marginTop: '20px' }}>{this.renderCatalog}</div>
        )
    };
}

export default Catalog;