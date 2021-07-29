import React, {useState} from 'react';
import {Link} from "react-router-dom";
import AddTransaction from "../transaction/AddTransaction";

export default function Basket(props) {
    const { cartItems, onAdd, onRemove } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.unitPrice, 0);
    const totalPrice = itemsPrice;
    const [Submitted, setSubmitted] = useState(false);

    const clickSubmitted = (e) =>{
        e.preventDefault();
        setSubmitted(true)
    }
    return (
        <aside className="bg-light m-auto btn-block">
            <h2 className="text-center">Cart Items</h2>
            <div>
                {cartItems.length === 0 && <div className="ml-3">Cart is empty</div>}
                {cartItems.map((item) => (
                    <div key={item.id} className="row">
                        <div className="col-2 ml-3">{item.name}</div>
                        <div className="col-2">
                            <button onClick={() => onRemove(item)} className="remove">
                                -
                            </button>{' '}
                            <button onClick={() => onAdd(item)} className="add">
                                +
                            </button>
                        </div>

                        <div className="col-2 text-right">
                            {item.qty} x ${item.unitPrice.toFixed(2)}
                        </div>
                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <hr></hr>
                        <div className="row">
                            <div className="col-2 ml-3">
                                <strong>Total Price</strong>
                            </div>
                            <div className="col-1 text-right">
                                <strong>${totalPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <a onClick={clickSubmitted} href="" className="text-center btn btn-info">
                                checkout
                            </a>
                        </div>
                    </>
                )}
            </div>
            {Submitted ? (
                <div className="mt-5">
                    <AddTransaction cartItems={cartItems} totalPrice={totalPrice} />
                </div>
            ) : (
                ''
            )}
        </aside>
    );
}