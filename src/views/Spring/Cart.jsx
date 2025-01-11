import React, { useEffect, useState } from 'react';
import '../styles/Cart.css';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
      setItems(JSON.parse(cartData));
    }
  }, []);

  const quantityChange = (id, change) => {
    const existingItemIndex = items.findIndex(item => item.id === id);
    if(items[existingItemIndex].quantity <= 1 && change < 0) {items.splice(existingItemIndex, 1);}
    else{items[existingItemIndex].quantity += change;}
    sessionStorage.setItem('cart', JSON.stringify(items));
    window.location.reload();
  };

  const subtotal = items.reduce((accumulator, item) => {
    return accumulator + parseInt(item.price.replace(',', ''), 10) * item.quantity;
  }, 0);
  const discount = 0;
  const delivery = 10;
  const total = subtotal - discount + delivery;
  
  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Cart +++ <button onClick={() => { sessionStorage.clear(); alert("cart cleared!"); window.location.reload(); }}>Clear Cart</button></h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="cart-item">
              <img className="cart-item-image" src={item.image} alt={item.title} />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.title}</p><br />
                <p className="cart-item-price">${item.price}</p>
              </div>
              <div className="cart-item-quantity">
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => quantityChange(item.id, -1)}>-</button>
                <button onClick={() => quantityChange(item.id, 1)}>+</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-checkout-container">
        <h2>CHECKOUT ++</h2>
        <div className="cart-summary">
          <p>Subtotal: ${subtotal}</p>
          <p>Discount: ${discount}</p>
          <p>Delivery: ${delivery}</p>
          <hr />
          <p className="cart-total">Total: ${total}</p>
        </div>
        <div className="cart-payment-info">
          <h3>Card Info ++</h3>
          <p>Card Number:</p>
          <input type="text" placeholder="**** **** **** ****" />
          <button className="cart-payment-button">Complete Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
