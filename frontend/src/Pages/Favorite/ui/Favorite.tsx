import './Favorite.css'
import React, {useEffect} from "react";
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
            {favorite.length === 0 && (<div className="favorites__empty">
                <h3 className="favorites__empty-title">В избранных ничего нет, добавьте что-то, чтобы оно тут появилось.</h3>
                <Link to='/' className="favorites__empty-btn">В каталог товаров</Link>
            </div>)}
            {favorite.map((item) => (
                <article key={item.id} className="product-card">
                    <Link to={`/product/${item.product.id}`} className="product-card__link">
                        <div className="product-card__media">
                            <img className="product-card__image" src={item.product.image_url} alt={item.product.title} loading="lazy"/>
                        </div>
                        <div className="product-card__body">
                            <span className="product-card__category">{item.product.category}</span>
                            <h3 className="product-card__title">{item.product.title}</h3>
                        </div>
                    </Link>
                    <div className="product-card__body">
                        <p className="product-card__price">{item.product.price} ₽</p>
                    </div>
                    <div className="product-card__actions">
                        <button className="product-card__btn product-card__btn--cta" onClick={() => addCart(item.product)}>В корзину</button>
                        <button className="product-card__btn product-card__btn--danger" onClick={() => deleteFavoriteProduct(item.product.id)}>Удалить</button>
                    </div>
                </article>
            ))}
        </div>
    )
}
