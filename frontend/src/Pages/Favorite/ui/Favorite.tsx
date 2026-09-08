import './Favorite.css'
import React, {useEffect, useState} from "react";
import {Favorite, Product} from "../../../Entities/product/model/types";
import {Link, useNavigate} from "react-router";
import {User} from "../../../Entities/user/model/types";

interface FavoriteProps{
    user: User | null
    favorite:Favorite[],
    addCart:(product: Product) => void,
    deleteFavoriteProduct:(product_id:number) => void
}

export const FavoriteComponent:React.FC<FavoriteProps> = ({user, favorite, addCart, deleteFavoriteProduct}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate]);
    if (!user) {
        return null
    }

    return(
        <div className="catalog__grid">
            {favorite.length === 0 && (<div className="favorite-empty">
                <h3>В избранных ничего нет, добавьте что-то, чтобы оно тут появилось.</h3>
                <Link to='/'><button className="favorite-empty-btn">В каталог товаров</button></Link>
            </div>)}
            {favorite.map((item) => (
                <div key={item.id} className="product-card">
                    <Link to={`/product/${item.product.id}`}>
                        <img className="product-card__image" src={item.product.image_url} alt={item.product.title} />
                        <h3 className="product-card__title">{item.product.title}</h3>
                    </Link>
                    <p className="product-card__price">{item.product.price} ₽</p>
                    <div className="product-card__actions">
                        <button className="cart-btn" onClick={() => addCart(item.product)}>В корзину</button>
                        <button className="delete-btn" onClick={() => deleteFavoriteProduct(item.product.id)}>Удалить</button>
                    </div>
                </div>
            ))}
        </div>
    )
}