import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCollection, setProductCollection] = useState('');
  const [productSeries, setProductSeries] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [products, setProducts] = useState([]);

  const sellerName = sessionStorage.getItem('sellerName') || 'Default Seller';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        const filteredProducts = data.filter(product => product.seller === sellerName);
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, [sellerName]);

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (!productTitle || !productCollection || !productSeries || !productPrice || !productQuantity || !productDescription) {
      alert('Please fill in all fields.');
      return;
    }

    const newProduct = { 
      title: productTitle, 
      image: productImage, 
      collection: productCollection, 
      series: productSeries, 
      price: parseFloat(productPrice), 
      quantity: parseInt(productQuantity, 10), 
      description: productDescription, 
      seller: sellerName
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    setProductTitle('');
    setProductImage('');
    setProductCollection('');
    setProductSeries('');
    setProductPrice('');
    setProductQuantity('');
    setProductDescription('');
  };

  return (
    <div className="dashboard-container">
      <div className='first'>
        <div className="account-info">
          <div>
            <h2>{sellerName}</h2>
            <p>Seller</p>
            <button>Edit</button>
            <p>Joined 12 December 2024</p>
          </div>
          <div className="contact-link">
            <a href="/contact">Contact Us</a>
            <button onClick={() => {sessionStorage.clear(); window.location = "/";}}>Log out</button>
          </div>
        </div>

        <div className="product-form-container">
          <h2>New Product</h2>
          <form onSubmit={handleProductSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                value={productTitle} 
                onChange={(e) => setProductTitle(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setProductImage(URL.createObjectURL(e.target.files[0]))} 
              />
              {productImage && <img src={productImage} alt="Preview" className="image-preview" />}
            </div>
            <div className="form-group">
              <label>Collection</label>
              <input 
                type="text" 
                value={productCollection} 
                onChange={(e) => setProductCollection(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Series</label>
              <input 
                type="text" 
                value={productSeries} 
                onChange={(e) => setProductSeries(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input 
                type="number" 
                value={productPrice} 
                onChange={(e) => setProductPrice(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input 
                type="number" 
                value={productQuantity} 
                onChange={(e) => setProductQuantity(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                value={productDescription} 
                onChange={(e) => setProductDescription(e.target.value)} 
                style={{ background: 'transparent' }} 
              />
            </div>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>

      <div className="product-table-container">
        <h2>Product List</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Collection</th>
              <th>Series</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.collection}</td>
                <td>{product.series}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;