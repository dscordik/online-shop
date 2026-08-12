import React, {FC} from "react";
import {Product} from "../../Entities/product/model/types";
import './CartModal.css'

interface CartProps {
    cart: Product[],
    onOpenCart: () => void,
    removeFromCart: (id:number) => void
}

export const CartModal:FC<CartProps> = ({cart, onOpenCart, removeFromCart})=> {
    return (
        <div className="cart-modal">
            <div className="cart-modal__content">
                <h2 className="cart-modal__title">Корзина</h2>
                <button className="cart-modal__close" onClick={() => onOpenCart()}>X</button>
                <div className="cart-modal__list">
                    {cart.length === 0 ? (
                        <p className="cart-modal__empty">Корзина пустая</p>
                    ) : (cart.map((item) =>
                        <div key={item.id} className="cart-modal__item">
                            <div className="cart-modal__item-info">
                                <span className="cart-modal__item-title">{item.title}</span>
                                <span className="cart-modal__item-price">{item.price} P</span>
                            </div>
                            <button className="cart-modal__remove" onClick={() => removeFromCart(item.id)}>Удалить товар</button>
                        </div>))}
                </div>
            </div>
        </div>
    )
}