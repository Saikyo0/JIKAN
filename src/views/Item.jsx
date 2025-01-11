import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Item.css'; 

const Item = () => {
    const location = useLocation();
    const { product } = location.state || {};  

    if (!product) {
        return <div>No product data available</div>;
    }

    const handleBuyClick = () => {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            const newItem = { ...product, quantity: 1 }; 
            cart.push(newItem);
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        alert('Item added to cart!');
    };

    return (
        <div className="item-container">
            <div className="item-image">
                <p className="item-dot">+<br />+<br />+</p>
                <img 
                    src={product.image} 
                    alt={product.title} 
                />
                <p className="item-dot">+<br />+<br />+</p>
            </div>
            <div className="item-details">
                <div className="item-info">
                    <h1 className="item-title" style={{ display: 'flex', alignItems: 'center' }}>
                        {product.title} 
                        <p className="item-rating" style={{ marginLeft: '100px', display: 'inline', fontSize: "42px" }}>
                            {product.rating}
                        </p>
                    </h1>
                    <p className="item-series">{product.series}</p>
                    <p className="item-collection">{product.collection}</p>
                    <p className="item-collection">{product.brand}</p>
                    <p className="item-price">{product.price} Birr</p>
                    <p className="item-extra">{product.extra} for Delivery to Addis Ababa/Ethiopia</p>
                    <button className="buy-button" onClick={handleBuyClick}>Buy...</button>
                    <button className="suggest-button">Suggest a price</button>
                    <p className='item-desc'>{product.description}</p>
                </div>
                <div className="item-additional-info">
                    <p className="item-seller">Seller: {product.seller}</p>
                    <p className="item-rating" style={{paddingLeft: "80px"}}>Average rating: {product.sellerrating}</p>
                </div>
            </div>
        </div>
    );
};

export default Item;