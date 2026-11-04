import React from "react";
import {ProductCardProps} from "../model/types";
import './ProductCard.css'
import {Link} from "react-router";

function ProductCard({product, addCart, addFavoriteProduct, isFavorite, user, onOpenAuthModal, deleteFavoriteProduct}:ProductCardProps) {
    const handleFavoriteClick = () => {
        if (!user) {
            onOpenAuthModal();
            return;
        }
        if (isFavorite) {
            deleteFavoriteProduct(product.id);
        } else {
            addFavoriteProduct(product.id);
        }
    };

    return (
        <article className="product-card">
            <Link to={`/product/${product.id}`} className="product-card__media">
                <img className="product-card__image" src={product.image_url} alt={product.title} loading="lazy"/>
            </Link>
            <div className="product-card__body">
                <span className="product-card__category">{product.category}</span>
                <Link to={`/product/${product.id}`} className="product-card__link"><h3 className="product-card__title">{product.title}</h3></Link>
                <p className="product-card__price">{product.price} ₽</p>
            </div>
            <div className="product-card__actions">
                <button className="product-card__btn product-card__btn--cta" onClick={() => addCart(product)}>
                    Добавить в корзину
                </button>
                <button onClick={handleFavoriteClick} className={`product-card__btn product-card__btn--fav ${isFavorite ? 'product-card__btn--active' : ''}`}>
                    {isFavorite ? 'Убрать из избранных' : 'Добавить в избранные'}
                </button>
            </div>
        </article>
    )
}

export default ProductCard
