import {HeaderProps} from "../../../Entities/product/model/types";
import React, {useState} from "react";
import './Header.css'
import {Link} from "react-router";
import {FiGrid, FiHeart, FiLogIn, FiLogOut, FiSearch, FiSettings, FiShoppingCart, FiUser} from "react-icons/fi";

export const Header: React.FC<HeaderProps> = ({total_count,onOpenCart, searchProducts, setSearchProducts, uniqCategory,
                                                  setSelectCategory, selectCategory, user, onIsAuthModalOpen, handleLogout,
                                                  sortCategory, setSortСategory, minPrice, setMinPrice, bigPrice, setBigPrice,
                                                  resetFilters})=> {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    return(
        <header className="header">
            {/* Верхняя строка: логотип / поиск / аккаунт / избранное и корзина */}
            <div className="header__top">
                <h1 id="catalog" className="header__logo">
                    <span className="header__logo-mark">M</span>
                    <span className="header__logo-text">Misha <span className="header__logo-accent">store</span></span>
                </h1>

                <div className="header__search">
                    <FiSearch className="header__search-icon" aria-hidden="true"/>
                    <input placeholder='Введите товар' className="header__search-input" value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)}/>
                </div>

                <div className="header__auth">
                    {user !== null ? (
                        <>
                            <Link to='/profile' className="header__btn header__btn--ghost" title="Личный кабинет">
                                <FiUser className="header__btn-icon" aria-hidden="true"/>
                                <span className="header__btn-text header__btn-text--optional">Личный кабинет</span>
                            </Link>
                            {user.role === 'admin' && (
                                <Link to='/admin' className="header__btn header__btn--ghost" title="Админ-панель">
                                    <FiSettings className="header__btn-icon" aria-hidden="true"/>
                                    <span className="header__btn-text header__btn-text--optional">Админ-панель</span>
                                </Link>
                            )}
                            <button className="header__btn header__btn--danger" title="Выйти" onClick={() => handleLogout()}>
                                <FiLogOut className="header__btn-icon" aria-hidden="true"/>
                                <span className="header__btn-text header__btn-text--optional">Выйти</span>
                            </button>
                        </>
                    ) : (
                        <button className="header__btn header__btn--accent" onClick={() => onIsAuthModalOpen()}>
                            <FiLogIn className="header__btn-icon" aria-hidden="true"/>
                            <span className="header__btn-text">Войти</span>
                        </button>
                    )}
                </div>

                <div className="header__shortcuts">
                    <Link to='/favorites' className="header__btn header__btn--ghost" title="Избранные">
                        <FiHeart className="header__btn-icon" aria-hidden="true"/>
                        <span className="header__btn-text header__btn-text--desktop">Избранные</span>
                    </Link>
                    <button className="header__btn header__btn--cta" onClick={() => onOpenCart()} title="Корзина">
                        <FiShoppingCart className="header__btn-icon" aria-hidden="true"/>
                        <span className="header__btn-text">Корзина</span>
                        {total_count > 0 && <span className="header__badge">{total_count}</span>}
                    </button>
                </div>
            </div>

            {/* Нижняя строка: категории, сортировка, цена, сброс */}
            <div className="header__filters">
                <div className="header__category">
                    <button className="header__category-toggle" onClick={() => setIsCategoryOpen(!isCategoryOpen)} aria-expanded={isCategoryOpen}>
                        <FiGrid aria-hidden="true"/>
                        <span>{selectCategory === '' ? 'Категории' : selectCategory}</span>
                    </button>
                    {isCategoryOpen && (
                        <div className="header__category-list">
                            <button className={`header__category-item header__category-item--all ${selectCategory === '' ? 'header__category-item--active' : ''}`} onClick={() => {setSelectCategory(''); setIsCategoryOpen(false)}}>Все категории</button>
                            {uniqCategory.map((item) => (
                                <button className={`header__category-item ${selectCategory === item ? 'header__category-item--active' : ''}`} onClick={() => {setSelectCategory(item); setIsCategoryOpen(false)}} key={item}>{item}</button>
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
                    <input className='header__price-input' type='number' inputMode="numeric" placeholder='от' value={minPrice} min={0} onChange={(e) => setMinPrice(e.target.value)}/>
                    <span className="header__price-separator">—</span>
                    <input className='header__price-input' type='number' inputMode="numeric" placeholder='до' value={bigPrice} min={0} onChange={(e) => setBigPrice(e.target.value)}/>
                    <span className="header__price-currency">₽</span>
                </div>
                <button className='header__reset-btn' onClick={() => resetFilters()}>Сбросить фильтры</button>
            </div>
        </header>
    )
}
