import React from 'react';

export default function Header(props) {
    return (
        <header className="block row center">
            <div className="m-auto">
                <a className="text-muted" href="#/cart">
                    Cart{' '}
                    {props.countCartItems ? (
                        <button className="btn btn-danger">{props.countCartItems}</button>
                    ) : (
                        ''
                    )}
                </a>{' '}
            </div>
        </header>
    );
}
