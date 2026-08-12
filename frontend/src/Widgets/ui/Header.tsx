import {HeaderProps} from "../../Entities/product/model/types";
import React from "react";
import './Header.css'

export const Header: React.FC<HeaderProps> = ({total_count, total_price, clearCorzina, onOpenCart})=> {
    return(
        <div className="header">
            <h1 className="header__logo">Misha store</h1>
            <div className="header__cart">
                <span className="header__count">Товаров: {total_count} шт. </span>
                <span className="header__price">Сумма: {total_price} ₽</span>
                <button className="header__clear" onClick={() => clearCorzina()}>Очистить корзину</button>
                <button className="header__open" onClick={() => onOpenCart()}>Корзина</button>
            </div>
        </div>
    )
}