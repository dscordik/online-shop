import React, {useEffect, useState} from 'react';
import './App.css';
import {CartItem, Product} from "../Entities/product/model/types";
import {Header} from "../Widgets/ui/Header/Header";
import ProductCard from "../Entities/product/ui/ProductCard";
import {CartModal} from "../Widgets/ui/CartModal/CartModal";
import {Footer} from "../Widgets/ui/Footer/Footer";


function App() {
    const [selectCategory, setSelectCategory] = useState('')
    const [searchProducts, setSearchProducts] = useState('')
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<CartItem[]>(() => {
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
         const arr = cart.find((item) => item.id === product.id)
         if (arr) {
             setCart(cart.map((item) => {
                 if (item.id === product.id) {
                     return {...item, count: item.count + 1}
                 } else {
                     return item
                 }}))
         } else {
             setCart([...cart, {...product, count:1}])}
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

    function addCount(id:number) {
         setCart(cart.map((item) => {
             if (item.id === id) {
                 return {...item, count:item.count + 1}
             } else {
                 return item
             }
         }))
    }

    function minusCount(id:number) {
        const arr = cart.find((item) => item.id === id)
        if (arr?.count === 1) {
            removeFromCart(id)
        } else {
            setCart(cart.map((item) => {
                if (item.id === id) {
                    return {...item, count:item.count - 1}
                } else {
                    return item
                }
            }))
        }
    }

    const total_price = cart.reduce((sum, b) => sum + b.price * b.count, 0)

    const total_count = cart.reduce((sum, b) => sum + b.count,0)

    const uniqCategory = [...new Set(products.map((item) => item.category))]

    return (
        <div className="catalog">
            <Header uniqCategory={uniqCategory} selectCategory={selectCategory} setSelectCategory={setSelectCategory} setSearchProducts={setSearchProducts} searchProducts={searchProducts} total_count={total_count} onOpenCart={() => setIsCartOpen(true)}/>
            <h1 className="catalog__title" >Каталог товаров</h1>
            <div className="catalog__grid">
                {products.filter((item) => item.title.toLowerCase().includes(searchProducts.toLowerCase()) &&
                    (selectCategory === '' || item.category === selectCategory)
                ).map((product) =>
                    <ProductCard key={product.id} product={product} addCart={addCart}/>)}
            </div>
            {isCartOpen && (<CartModal cart={cart} onOpenCart={onOpenCart} removeFromCart={removeFromCart} minusCount={minusCount}
                                       addCount={addCount} total_price={total_price} total_count={total_count} clearCorzina={clearCorzina}/>)}
            <Footer/>
        </div>
    )
}

export default App;
