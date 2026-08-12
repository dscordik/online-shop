import React, {FC} from "react";
import {CartItem} from "../../Entities/product/model/types";
import './CartModal.css'

interface CartProps {
    cart: CartItem[],
    onOpenCart: () => void,
    removeFromCart: (id:number) => void,
    addCount: (id:number) => void,
    minusCount: (id:number) => void
}

export const CartModal:FC<CartProps> = ({cart, onOpenCart, removeFromCart, addCount, minusCount})=> {
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
                                <div className="cart-modal__counter">
                                    <button className="cart-modal__counter-btn" onClick={() => minusCount(item.id)}>-</button>
                                    <span className="cart-modal__counter-value">{item.count} шт</span>
                                    <button className="cart-modal__counter-btn" onClick={() => addCount(item.id)}>+</button>
                                </div>
                            </div>
                            <button className="cart-modal__remove" onClick={() => removeFromCart(item.id)}>Удалить товар</button>
                        </div>))}
                </div>
            </div>
        </div>
    )
}