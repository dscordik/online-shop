import {HeaderProps} from "../../../Entities/product/model/types";
import React, {useState} from "react";
import './Header.css'

export const Header: React.FC<HeaderProps> = ({total_count,onOpenCart, searchProducts, setSearchProducts, uniqCategory, setSelectCategory, selectCategory})=> {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    return(
        <div className="header">
            <h1 id="catalog" className="header__logo">Misha store</h1>
            <div className="header__search">
                <div className="header__category">
                    <button className="header__category-toggle" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>Категории товаров</button>
                    {isCategoryOpen && (
                        <div className="header__category-list">
                            <button className="header__reset" onClick={() => {setSelectCategory(''); setIsCategoryOpen(false)}}>Все категории</button>
                            {uniqCategory.map((item) => (
                                <button className="header__category-item" onClick={() => {setSelectCategory(item); setIsCategoryOpen(false)}} key={item}>{item}</button>
                            ))}
                        </div>
                    )}
                </div>
                <input placeholder='Введите товар' className="header__search-input" value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)}/>
            </div>
            <div className="header__cart">
                <span className="header__count">Товаров: {total_count} шт.</span>
                <button className="header__open" onClick={() => onOpenCart()}>Корзина</button>
            </div>

        </div>
    )
}