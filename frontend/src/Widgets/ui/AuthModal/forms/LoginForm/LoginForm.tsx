import React, {useState} from 'react'
import {User} from "../../../../../Entities/user/model/types"
import {loginUser, fetchCurrentUser} from '../../../../../Entities/user/model/authApi'
import {saveTokens} from "../../../../../Entities/user/model/tokenStorage"
import './LoginForm.css'

interface LoginFormProps {
    onAuthSuccess: (user:User) => void,
    onSwitchToRegister: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({onAuthSuccess, onSwitchToRegister}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<null | string>(null)
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault()
        try {
            const tokens = await loginUser({email, password})
            saveTokens(tokens)
            const currentUser = await fetchCurrentUser()
            onAuthSuccess(currentUser)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__field">
                <label className="auth-form__label">Email</label>
                <input className="auth-form__input"
                       placeholder='Введите email'
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type='email'
                />
            </div>
            <div className="auth-form__field">
                <label className="auth-form__label">Пароль</label>
                <input className="auth-form__input"
                       placeholder='Введите password'
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       type='password'
                />
            </div>
            {error && <p className="auth-form__error">{error}</p>}
            <button className="auth-form__submit">Войти</button>
            <button className="auth-form__switch" type='button' onClick={() => onSwitchToRegister()}>Нет аккаунта? Зарегистрироваться</button>
        </form>
    )
}