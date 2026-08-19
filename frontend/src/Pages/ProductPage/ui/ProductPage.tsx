import React, {useEffect, useState} from 'react'
import {Product} from "../../../Entities/product/model/types";
import {Link, useParams} from "react-router";
import './ProductPage.css'

interface ProductPageProps {
    addCart: (product:Product) => void
}

export const ProductPage:React.FC<ProductPageProps> = ({addCart}) => {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Товар не найден');
                return res.json();
            })
            .then((data:Product) => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => {
                setProduct(null);
                setLoading(false);
            });
    }, [id]);
    if (loading) {
        return<div>
            <span>Загрузка товара...</span>
        </div>
    }
    if (!product?.id) {
        return <div>
            <span>Товар не найден</span>
        </div>
    }
    return (
        <div className="product-page">
            <Link to="/" className="product-page__back">В каталог товаров</Link>
            <div className="product-page__content">
                <div className="product-page__image-wrapper">
                    <img className="product-page__image" src={product.image_url} alt={product.title}/>
                </div>
                <div className="product-page__info">
                    <h1 className="product-page__title">{product.title}</h1>
                    <p className="product-page__price">{product.price} Р</p>
                    <p className="product-page__category">Категория: {product.category}</p>
                </div>
                <button className='product-page__btn' onClick={() => addCart(product)}>Добавить в корзину</button>
            </div>
        </div>
    )
}