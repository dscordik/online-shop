import React, {useState} from 'react'
import {User} from "../../../../../Entities/user/model/types"
import {registerUser, fetchCurrentUser, loginUser} from '../../../../../Entities/user/model/authApi'
import {saveTokens} from "../../../../../Entities/user/model/tokenStorage"
import './RegisterForm.css'

interface RegisterFormProps {
    onAuthSuccess: (user:User) => void,
    onSwitchToLogin: () => void
}

export const RegisterForm:React.FC<RegisterFormProps> = ({onAuthSuccess, onSwitchToLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<null | string>(null)
    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault()
        try {
            await registerUser({email, password})
            const token = await loginUser({email, password})
            saveTokens(token)
            const currentUser = await fetchCurrentUser()
            onAuthSuccess(currentUser)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }
    return(
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form__field">
                <label className="auth-form__label">Email</label>
                <input className="auth-form__input"
                       placeholder='Введите email'
                       value={email}
                       type='email'
                       onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="auth-form__field">
                <label className="auth-form__label">Пароль</label>
                <input className="auth-form__input"
                       placeholder='Введите password'
                       value={password}
                       type='password'
                       onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="auth-form__error">{error}</p>}
            <button className="auth-form__submit">Зарегистрироваться</button>
            <button className="auth-form__switch" type='button' onClick={() => onSwitchToLogin()}>Уже есть аккаунт? Войти</button>
        </form>
    )
}