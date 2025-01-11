import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import '../styles/Shop.css';

const ProductCard = ({ image, title, series, onClick }) => {
    return (
        <div className="product-card" onClick={onClick}>
            <img src={image} alt={title} />
            <div className="product-info">
                <h3>{title}</h3>
                <p>{series}</p>
            </div>
        </div>
    );
}; 

const Shop = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/products.json');
                if (!response.ok) {
                    throw new Error('Network error');
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        if (activeTab !== 'All' && activeTab !== 'New') {
            filtered = filtered.filter(product => product.brand === activeTab);
        } else if (activeTab === 'New') {
            filtered = filtered.filter(product => product.isNew);
        }

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [activeTab, searchQuery, products]);

    const handleProductClick = (product) => {
        navigate('/item', { state: { product } });
    };

    const handleTabClick = (brand) => {
        setActiveTab(brand);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const brands = ['All', 'New', 'CASIO', 'SEIKO', 'CITIZEN', 'ORIENTAL'];

    return (
        <main className="main">
            <div className="nav-tabs" style={{ justifyContent: "flex-start" }}>
                {brands.map(brand => (
                    <a
                        key={brand}
                        href="#"
                        className={`brandtab ${activeTab === brand ? 'active' : ''}`}
                        style={{ fontFamily: brand !== 'All' && brand !== 'New' ? 'Norwester' : 'Glacial' }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleTabClick(brand);
                        }}
                    >
                        {brand}
                    </a>
                ))}
                <div className='searchbox'>
                    <input 
                        className='searchinput'
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search products..."
                    />
                    <img src="/icons/magnifier.png" className='magnifier' />
                </div>
            </div>
            <div className="products">
                {filteredProducts.map((product, index) => (
                    <ProductCard 
                        key={index} 
                        {...product} 
                        onClick={() => handleProductClick(product)}
                    />
                ))}
            </div> 
        </main>
    );
};

export default Shop;
