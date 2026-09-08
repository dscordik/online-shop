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
        <div className="product-card">
            <img className="product-card__image" src={product.image_url} alt={product.title}/>
            <Link to={`/product/${product.id}`}><h3 className="product-card__title">{product.title}</h3></Link>
            <p className="product-card__price">{product.price} ₽</p>
            <button onClick={handleFavoriteClick} className="favorite-btn">
                {isFavorite ? 'Убрать из избранных' : 'Добавить в избранные'}
            </button>
            <button className="product-card__button" onClick={() => addCart(product)}>
                Добавить в корзину
            </button>
        </div>
    )
}

export default ProductCard