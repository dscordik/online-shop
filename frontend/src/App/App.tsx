import React, {useEffect, useState} from 'react';
import './App.css';
import {Product} from "../Entities/product/model/types";
import {Header} from "../Widgets/ui/Header";
import ProductCard from "../Entities/product/ui/ProductCard";
import {CartModal} from "../Widgets/ui/CartModal";

function App() {
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<Product[]>(() => {
        const saved = localStorage.getItem('cart')
        if (saved !== null) {
            return JSON.parse(saved)
        } else {
            return []
        }
    })
    useEffect(() => {
        fetch("http://localhost:8000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Ошибка загрузки', err))
    }, []);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart]);

     function addCart(product: Product) {
        setCart([...cart, product])
    }

    function clearCorzina() {
         setCart([])
    }

    function onOpenCart() {
         setIsCartOpen(false);
    }

    function removeFromCart(id:number) {
         setCart(cart.filter((item) => item.id !== id))
    }

    const total_price = cart.reduce((sum, b) => sum + b.price, 0)

    const total_count = cart.length

    return (
        <div className="catalog">
            <Header total_price={total_price} total_count={total_count} clearCorzina={clearCorzina} onOpenCart={() => setIsCartOpen(true)}/>
            <h1 className="catalog__title" >Каталог товаров</h1>
            <div className="catalog__grid">
                {products.map((product) =>
                    <ProductCard key={product.id} product={product} addCart={addCart}/>)}
            </div>
            {isCartOpen && (<CartModal cart={cart} onOpenCart={onOpenCart} removeFromCart={removeFromCart}/>)}
        </div>
    )
}

export default App;
