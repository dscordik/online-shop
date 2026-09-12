import React, {useEffect, useState} from 'react'
import {User, UserUpdate} from "../../../Entities/user/model/types";
import {Link, useNavigate} from "react-router";
import {authorizedFetch, userUpdate} from '../../../Entities/user/model/authApi';
import './ProfilePage.css'
import {OrderOut} from "../../../Entities/product/model/types";

interface ProfilePageProps{
    user:User | null,
    handleLogout: () => void,
    handleAuthSuccess:(user:User) => void,
}

export const ProfilePage:React.FC<ProfilePageProps> = ({user, handleAuthSuccess}) => {
    const [historyOrders, setHistoryOrders] = useState<OrderOut[]>([])
    const [forms, setForms] = useState({
        email:user?.email,
        currentPassword: '',
        newPassword:''
    })
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])
    useEffect(() => {
        async function ordersFunc() {
            try {
                const orders = await historyOfOrders()
                setHistoryOrders(orders)
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            }
        }
        ordersFunc()
    }, [])
    if (!user) {
        return null
    }

    async function historyOfOrders():Promise<OrderOut[]> {
        return authorizedFetch('http://localhost:8000/api/order/me', {method:'GET'})
    }

    async function handleUserUpdate(e:React.FormEvent){
        e.preventDefault()
        try {
            const payload:UserUpdate = {email: forms.email}
            if (forms.currentPassword !== '') {
                payload.old_password = forms.currentPassword
            }
            if (forms.newPassword !== ''){
                payload.new_password = forms.newPassword
            }
            const updateUser = await userUpdate(payload)
            setForms({email:forms.email, currentPassword: '', newPassword: ''},)
            handleAuthSuccess(updateUser)
            setSuccess('Пароль успешно изменен')
        } catch (error) {
            if (error instanceof Error){
                setError(error.message)
            }
        }
    }

    return(
        <div className="profile-page">
            <div className="profile-page__card">
                <div className="profile-page__header">
                    <h1 className="profile-page__title">Личный кабинет</h1>
                    <Link to='/' className="profile-page__back">В каталог товаров</Link>
                </div>
                <div className="profile-page__info">
                    <div className="profile-page__info-row">
                        <span className="profile-page__info-label">Email</span>
                        <span className="profile-page__info-value">{user.email}</span>
                    </div>
                    <div className="profile-page__info-row">
                        <span className="profile-page__info-label">Дата регистрации</span>
                        <span className="profile-page__info-value">{user.created_at}</span>
                    </div>
                </div>
                <form className="profile-page__form" onSubmit={handleUserUpdate}>
                    <div className="profile-page__field">
                        <label className="profile-page__label">Email</label>
                        <input className="profile-page__input" type='email' value={forms.email} onChange={(e) => setForms({...forms, email: e.target.value})}/>
                    </div>
                    <div className="profile-page__field">
                        <label className="profile-page__label">Текущий пароль</label>
                        <input className="profile-page__input" type='password' value={forms.currentPassword} onChange={(e) => setForms({...forms, currentPassword: e.target.value})}/>
                    </div>
                    <div className="profile-page__field">
                        <label className="profile-page__label">Новый пароль</label>
                        <input className="profile-page__input" type='password' value={forms.newPassword} onChange={(e) => setForms({...forms, newPassword: e.target.value})}/>
                    </div>
                    {error && <p className="profile-page__error">{error}</p>}
                    {success && <p className="profile-page__success">{success}</p>}
                    <button className="profile-page__submit">Сохранить изменения</button>
                </form>
                <div className="profile-page__orders">
                    <h2 className="profile-page__orders-title">Мои заказы</h2>
                    {historyOrders.length === 0 ? (
                        <p className="profile-page__orders-empty">У вас пока нет заказов</p>
                    ) : (
                        historyOrders.map((order) => (
                            <div key={order.id} className="profile-page__order">
                                <div className="profile-page__order-header">
                                    <span className="profile-page__order-date">{order.created_at_order}</span>
                                    <span className="profile-page__order-status">{order.status}</span>
                                </div>
                                <div className="profile-page__order-items">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="profile-page__order-item">
                                            <span className="profile-page__order-item-name">{item.product_name}</span>
                                            <span className="profile-page__order-item-count">{item.total_count} шт.</span>
                                            <span className="profile-page__order-item-price">{item.price} ₽</span>
                                            <span className="profile-page__order-item-total">{item.price * item.total_count} ₽</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="profile-page__order-total">
                                    Итого: {order.total_price} ₽
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}