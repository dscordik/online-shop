import React, {useState} from "react";
import {CartItem} from "../../../Entities/product/model/types";
import {Link} from "react-router";
import {getAccessToken} from "../../../Entities/user/model/tokenStorage";
import './OrderPage.css'

interface OrderPageProps {
    cart: CartItem[],
    clearCorzina: () => void,
    total_price: number
}

export const OrderPage:React.FC<OrderPageProps> = ({cart, total_price, clearCorzina}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    async function handlerOrder(e:React.FormEvent) {
        e.preventDefault()
        try {
            if (firstName === ''){
                return setError('Напишите имя')
            }
            if (lastName === ''){
                return setError('Напишите фамилию')
            }
            if (number === ''){
                return setError('Напишите номер телефона')
            }
            if (email === ''){
                return setError('Напишите почту')
            }
            if (address === ''){
                return setError('Напишите адрес')
            }
            const token = getAccessToken()
            const headers: Record<string, string> =  {'Content-Type':'application/json', }
            if (token) {
                headers['Authorization'] = 'Bearer ' + token
            }
            if (cart.length === 0) {
                return setError('Товаров нет в корзине')
            }
            const res = await fetch('http://localhost:8000/api/order/', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    first_name:firstName,
                    last_name:lastName,
                    number:number,
                    email:email,
                    address:address,
                    items:cart.map((value) => ({product_id:value.id, product_name:value.title, price:value.price, total_count:value.count}))
                })
            })
            if (!res.ok) {
                const error = await res.json()
                throw new Error(error.detail)
            } else {
                setSuccess('Заказ успешно оформлен!!!')
                clearCorzina()
                setError(null)
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }

    return (
        <div className="order-page">
            <Link to="/" className="order-page__back">В каталог товаров</Link>
            <h2 className="order-page__title">Оформление заказа</h2>
            <div className="order-page__items">
                {cart.map((value) => (
                    <div key={value.id} className="order-page__item">
                        <span className="order-page__item-name">{value.title}</span>
                        <span className="order-page__item-count">{value.count} шт.</span>
                        <span className="order-page__item-price">{value.price} ₽</span>
                        <span className="order-page__item-total">{value.price * value.count} ₽</span>
                    </div>
                ))}
            </div>
            <div className="order-page__total">
                <span>Итого:</span>
                <span className="order-page__total-price">{total_price} ₽</span>
            </div>
            {error && <p className="order-page__error">{error}</p>}
            {success && <p className="profile-page__success">{success}</p>}
            <button className="order-page__clear-btn" onClick={() => clearCorzina()} type="button">Очистить корзину</button>
            {cart.length === 0 ? (
                <p className="order-page__empty">Корзина пустая</p>
            ) : (
                <form className="order-page__form" onSubmit={handlerOrder}>
                    <div className="order-page__form-group">
                        <label className="order-page__label">Имя</label>
                        <input className="order-page__input" placeholder="Введите имя..." value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="order-page__form-group">
                        <label className="order-page__label">Фамилия</label>
                        <input className="order-page__input" placeholder="Введите фамилию..." value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div className="order-page__form-group">
                        <label className="order-page__label">Телефон</label>
                        <input className="order-page__input" type="tel" placeholder="Введите номер..." value={number} onChange={(e) => setNumber(e.target.value)}/>
                    </div>
                    <div className="order-page__form-group">
                        <label className="order-page__label">Email</label>
                        <input className="order-page__input" type="email" placeholder="Введите почту..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="order-page__form-group">
                        <label className="order-page__label">Адрес доставки</label>
                        <input className="order-page__input" placeholder="Введите адрес..." value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <button className="order-page__submit-btn" type="submit">Подтвердить заказ</button>
                </form>
            )}
        </div>
    )
}