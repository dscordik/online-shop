import React, {useState} from 'react'
import {User} from "../../../Entities/user/model/types";
import {LoginForm} from "./forms/LoginForm/LoginForm";
import {RegisterForm} from "./forms/RegisterForm/RegisterForm";
import './AuthModal.css'

interface AuthModalProps {
    onClose: () => void,
    onAuthSuccess: (user:User) => void
}

export const AuthModal:React.FC<AuthModalProps> = ({onAuthSuccess, onClose}) => {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    return (
        <div className="auth-modal">
            <div className="auth-modal__content">
                <button className="auth-modal__close" onClick={onClose}>✕</button>
                <h2 className="auth-modal__title">{mode === 'login' ? 'Вход' : 'Регистрация'}</h2>
                {mode === 'login'
                    ? <LoginForm onAuthSuccess={onAuthSuccess} onSwitchToRegister={() => setMode('register')}/>
                    : <RegisterForm onAuthSuccess={onAuthSuccess} onSwitchToLogin={() => setMode('login')}/>}
            </div>
        </div>
    )
}
