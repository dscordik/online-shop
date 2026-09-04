import React, {useEffect, useState} from 'react';
import './App.css';
import {CartItem, Product} from "../Entities/product/model/types";
import {Header} from "../Widgets/ui/Header/Header";
import ProductCard from "../Entities/product/ui/ProductCard";
import {CartModal} from "../Widgets/ui/CartModal/CartModal";
import {Footer} from "../Widgets/ui/Footer/Footer";
import {User} from "../Entities/user/model/types";
import {AuthModal} from "../Widgets/ui/AuthModal/AuthModal";
import {clearTokens, getAccessToken} from "../Entities/user/model/tokenStorage";
import {fetchCurrentUser} from "../Entities/user/model/authApi";
import {Route, Routes} from "react-router";
import {ProfilePage} from "../Pages/ProfilePage/ui/ProfilePage";
import {ProductPage} from "../Pages/ProductPage/ui/ProductPage";
import {OrderPage} from "../Pages/OrderPage/ui/OrderPage";


function App() {
    const [minPrice, setMinPrice] = useState<string>('')
    const [bigPrice, setBigPrice] = useState<string>('')
    const [sortCategories, setSortCategories] = useState<'default' | 'minToBigPrice' | 'bigToMinPrice' | 'onAlphabet'>('default')
    const [user, setUser] = useState<User | null>(null)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)
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
    useEffect(() => {
        if (getAccessToken()) {
            async function TOKENS() {
                try {
                    const currentUser = await fetchCurrentUser()
                    setUser(currentUser)
                } catch {
                    clearTokens()
                }
            }
            TOKENS()
        }
    }, []);

    function resetFilters() {
        setMinPrice('')
        setBigPrice('')
        setSortCategories('default')
        setSelectCategory('')
        setSearchProducts('')
    }

    function handleLogout() {
        clearTokens()
        setUser(null)
    }

    function handleAuthSuccess(users:User) {
        setUser(users)
        setIsAuthModalOpen(false)
    }

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

    const filteredProducts = products.filter((item) => item.title.toLowerCase().includes(searchProducts.toLowerCase()) &&
        (selectCategory === '' || item.category === selectCategory) &&
        (minPrice === '' || item.price >= Number(minPrice)) &&
        (bigPrice === '' || item.price <= Number(bigPrice))
    )
    const copyOfFiltered = [...filteredProducts]
    copyOfFiltered.sort((item1,item2) => {
        if (sortCategories === 'bigToMinPrice') {
            return item2.price - item1.price
        }
        if (sortCategories === 'minToBigPrice') {
            return item1.price - item2.price
        }
        if (sortCategories === 'onAlphabet') {
            return item1.title.localeCompare(item2.title)
        }
        if (sortCategories === 'default') {
            return 0
        }
        return 0
    })

    return (
        <div className="catalog">
            <Header user={user} handleLogout={handleLogout} onIsAuthModalOpen={() => setIsAuthModalOpen(true)} uniqCategory={uniqCategory}
                    selectCategory={selectCategory} setSelectCategory={setSelectCategory} setSearchProducts={setSearchProducts}
                    searchProducts={searchProducts} total_count={total_count} onOpenCart={() => setIsCartOpen(true)}
                    sortCategory={sortCategories} setSortСategory={setSortCategories} minPrice={minPrice}
                    setMinPrice={setMinPrice} bigPrice={bigPrice} setBigPrice={setBigPrice} resetFilters={resetFilters}
            />
            <Routes>
                <Route path='/' element={(
                    <>
                        <h1 className="catalog__title" >Каталог товаров</h1>
                        <div className="catalog__grid">
                            {copyOfFiltered.map((product) =>
                                <ProductCard key={product.id} product={product} addCart={addCart}/>)}
                        </div>
                    </>
                )}>
                </Route>
                <Route path='/profile' element={<ProfilePage handleLogout={handleLogout} handleAuthSuccess={handleAuthSuccess} user={user}/>}></Route>
                <Route path='/product/:id' element={<ProductPage addCart={addCart}/>}></Route>
                <Route path='/order' element={<OrderPage cart={cart} clearCorzina={clearCorzina} total_price={total_price}/>}></Route>
            </Routes>
            {isCartOpen && (<CartModal cart={cart} onOpenCart={onOpenCart} removeFromCart={removeFromCart} minusCount={minusCount}
                                       addCount={addCount} total_price={total_price} total_count={total_count} clearCorzina={clearCorzina}/>)}
            {isAuthModalOpen && (<AuthModal onClose={() => setIsAuthModalOpen(false)} onAuthSuccess={handleAuthSuccess}/>)}
            <Footer/>
        </div>
    )
}

export default App;
