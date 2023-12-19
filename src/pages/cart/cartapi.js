// this componenet is optional

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cart';
import './cart.css';

const SHIPPING_CHARGES = 25;
const CRUD_API_ENDPOINT = 'https://crudcrud.com/api/e70764a5a0404e57a652d7ab50804b06/data';

const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const [remoteCart, setRemoteCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRemoteCart = async () => {
        try {
            const response = await fetch(CRUD_API_ENDPOINT);
            const data = await response.json();
            console.log("data fetch", data);
            setRemoteCart(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching remote cart data:', error);
        }
    };

    const postData = async () => {
        try {
            const response = await fetch(CRUD_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart: [...remoteCart, ...cart] }),
            });
            const data = await response.json();
            console.log('Data posted successfully:', data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    useEffect(() => {
        fetchRemoteCart();
    }, []);

    useEffect(() => {
        if (!loading) {
            postData();
        }
    }, [cart, loading]);

    const cartTotal = () => {
        return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    };

    const round = (value, decimals) => {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    };

    return (
        <div className="cartWrapper">
            <div className="container">
                {cart.length >= 1 ? (
                    <div className="grid my-5">
                        <div className="cartItem p-3">
                            <h2>Order Summary</h2>
                            {remoteCart.map((item) => (
                                <div className="item" key={item.product.id}>
                                    <div className="grid py-3">
                                        <div className="itemImage">
                                            <img src={item.product.image} alt="" />
                                        </div>
                                        <div className="itemDesc">
                                            <div className="title">
                                                <Link to={"/product/" + item.product.id} className="titleLink">
                                                    {item.product.title}
                                                </Link>
                                            </div>
                                            <span className="price">${(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className="itemControl flex">
                                            <div>
                                                <button
                                                    onClick={() => increaseQuantity(item.product.id)}
                                                    className="addQty"
                                                >
                                                    +
                                                </button>
                                                <span className="mx-1">{item.quantity}</span>
                                                <button
                                                    onClick={() => decreaseQuantity(item.product.id)}
                                                    disabled={item.quantity === 1}
                                                    className="removeQty"
                                                >
                                                    -
                                                </button>
                                                <div
                                                    className="remove my-1"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="payment p-3">
                            <h2>Payment Summary</h2>
                            <div className="summary py-3 my-2">
                                <div className="flex py-1">
                                    <span>Subtotal:</span>
                                    <span className="price">${cartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex py-1">
                                    <span>Shipping Fee:</span>
                                    <span className="price">${SHIPPING_CHARGES.toFixed(2)}</span>
                                </div>
                                <div className="flex py-1">
                                    <span>Total:</span>
                                    <span className="price">${(cartTotal() + SHIPPING_CHARGES).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error">
                        <p>&#9432; Cart is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Cart };



