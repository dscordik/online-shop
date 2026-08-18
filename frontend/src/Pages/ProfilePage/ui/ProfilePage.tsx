import React, {useEffect, useState} from 'react'
import {User, UserUpdate} from "../../../Entities/user/model/types";
import {Link, useNavigate} from "react-router";
import {userUpdate} from '../../../Entities/user/model/authApi';
import './ProfilePage.css'

interface ProfilePageProps{
    user:User | null,
    handleLogout: () => void,
    handleAuthSuccess:(user:User) => void
}

export const ProfilePage:React.FC<ProfilePageProps> = ({user, handleLogout, handleAuthSuccess}) => {
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
    }, [user, navigate]);
    if (!user) {
        return null
    }

    async function handleUserUpdate(e:React.FormEvent){
        e.preventDefault()
        try {
            const payload:UserUpdate = {email: forms.email}
            if (forms.currentPassword != '') {
                payload.old_password = forms.currentPassword
            }
            if (forms.newPassword != ''){
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
            </div>
        </div>
    )
}