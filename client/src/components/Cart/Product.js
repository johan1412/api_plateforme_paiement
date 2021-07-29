import React from 'react';

export default function Product(props) {
    const { product, onAdd } = props;
    return (
        <div className="text-center">
            <img className="small rounded" src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div>${product.price}</div>
            <div className="mb-5">
                <button className="btn btn-info" onClick={() => onAdd(product)}>Add To Cart</button>
            </div>
        </div>
    );
}