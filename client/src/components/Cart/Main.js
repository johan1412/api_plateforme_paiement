import React from 'react';
import Product from './Product';

export default function Main(props) {
    const { products, onAdd } = props;
    return (
        <main className="text-center m-auto">
            <h2 className="text-center">Products</h2>
            <div className="d-flex bd-highlight">
                {products.map((product) => (
                    <div className="p-2 flex-fill bd-highlight">
                        <Product key={product.id} product={product} onAdd={onAdd}></Product>
                    </div>
                ))}
            </div>
        </main>
    );
}