import React, {useEffect, useState} from 'react';
import './App.css';
import {Product} from "../Entities/product/model/types";
import {Header} from "../Widgets/ui/Header";
import ProductCard from "../Entities/product/ui/ProductCard";

function App() {
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<Product[]>([])
    useEffect(() => {
        fetch("http://localhost:8000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Ошибка загрузки', err))
    }, []);

     function addCart(product: Product) {
        setCart([...cart, product])
    }

    function clearCorzina() {
         setCart([])
    }

    const total_price = cart.reduce((sum, b) => sum + b.price, 0)

    const total_count = cart.length

    return (
        <div className="catalog">
            <Header total_price={total_price} total_count={total_count} clearCorzina={clearCorzina}/>
            <h1 className="catalog__title" >Каталог товаров</h1>
            <div className="catalog__grid">
                {products.map((product) =>
                    <ProductCard key={product.id} product={product} addCart={addCart}/>)}
            </div>
        </div>
    )
}

export default App;
