import {HeaderProps} from "../../../Entities/product/model/types";
import React, {useState} from "react";
import './Header.css'
import {Link} from "react-router";

export const Header: React.FC<HeaderProps> = ({total_count,onOpenCart, searchProducts, setSearchProducts, uniqCategory,
                                                  setSelectCategory, selectCategory, user, onIsAuthModalOpen, handleLogout,
                                                  sortCategory, setSortСategory, minPrice, setMinPrice, bigPrice, setBigPrice,
                                                  resetFilters})=> {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    return(
        <div className="header">
            <h1 id="catalog" className="header__logo">Misha store</h1>
            <div className="header__search">
                <div className="header__category">
                    <button className="header__category-toggle" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>Категории</button>
                    {isCategoryOpen && (
                        <div className="header__category-list">
                            <button className="header__reset" onClick={() => {setSelectCategory(''); setIsCategoryOpen(false)}}>Все категории</button>
                            {uniqCategory.map((item) => (
                                <button className="header__category-item" onClick={() => {setSelectCategory(item); setIsCategoryOpen(false)}} key={item}>{item}</button>
                            ))}
                        </div>
                    )}
                </div>
                <div className='header__sort'>
                    <select className='header__sort-select' value={sortCategory} onChange={(e) => setSortСategory(e.target.value as 'default' | 'minToBigPrice' | 'bigToMinPrice' | 'onAlphabet')}>
                        <option value='default'>Без сортировки</option>
                        <option value='minToBigPrice'>Сначала дешёвые</option>
                        <option value='bigToMinPrice'>Сначала дорогие</option>
                        <option value='onAlphabet'>По алфавиту</option>
                    </select>
                </div>
                <div className='header__price-filter'>
                    <input className='header__price-input1' type='number' placeholder='от' value={minPrice} min={0} onChange={(e) => setMinPrice(e.target.value)}/>
                    <input className='header__price-input1' type='number' placeholder='до' value={bigPrice} min={0} onChange={(e) => setBigPrice(e.target.value)}/>
                </div>
                <button className='header__reset-btn' onClick={() => resetFilters()}>Сбросить фильтры</button>
                <input placeholder='Введите товар' className="header__search-input" value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)}/>
            </div>
            <div className="header__auth">
                {user !== null ? (
                    <div className="header__auth__div">
                        <Link to='/profile' className="header__auth-profile">Личный кабинет</Link>
                        <button className="header__auth-logout" onClick={() => handleLogout()}>Выйти</button>
                    </div>
                ) : (
                    <button className="header__auth-login" onClick={() => onIsAuthModalOpen()}>Войти</button>
                )}
            </div>
            <Link to='/favorites'><button className='header__fav-btn'>Избранные</button></Link>
            <div className="header__cart">
                <span className="header__count">Товаров: {total_count} шт.</span>
                <button className="header__open" onClick={() => onOpenCart()}>Корзина</button>
            </div>

        </div>
    )
}