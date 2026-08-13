import React from "react";
import './Footer.css'

export const Footer:React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__brand">
                    <div className="footer__brand-top">
                        <div className="footer__logo-circle">
                            <span>M</span>
                        </div>
                        <h2 className="footer__logo">Misha store</h2>
                    </div>
                    <div className="footer__socials">
                        {/* Telegram */}
                        <a href="https://t.me/lljiekies" target="_blank" rel="noreferrer" className="footer__social" title="Telegram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.547.223l.2-2.87 5.23-4.72c.23-.21-.05-.33-.35-.12l-6.46 4.07-2.78-.87c-.6-.19-.61-.6.13-.89l10.87-4.19c.5-.19.94.12.78.89z"/>
                            </svg>
                        </a>
                        {/* VK */}
                        <a href="https://vk.com/id565491426" target="_blank" rel="noreferrer" className="footer__social" title="ВКонтакте">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.22 14.47h-1.46c-.55 0-.72-.44-1.71-1.42-.86-.84-1.24-.95-1.45-.95-.3 0-.38.09-.38.5v1.3c0 .36-.12.58-1.07.58-1.58 0-3.33-.96-4.56-2.74-1.85-2.56-2.36-4.48-2.36-4.88 0-.21.08-.4.5-.4h1.46c.37 0 .51.17.65.57.71 2.07 1.9 3.88 2.39 3.88.18 0 .27-.09.27-.55v-2.13c-.06-.98-.58-1.06-.58-1.42 0-.17.14-.34.37-.34h2.3c.31 0 .42.16.42.52v2.88c0 .31.14.42.23.42.18 0 .33-.11.66-.44 1.02-1.14 1.75-2.9 1.75-2.9.1-.21.26-.4.64-.4h1.46c.44 0 .53.23.44.55-.18.84-1.93 3.3-1.93 3.3-.15.24-.21.35 0 .62.15.2.66.64 1 1.03.62.72 1.1 1.32 1.23 1.74.13.42-.07.64-.5.64z"/>
                            </svg>
                        </a>
                        {/* GitHub */}
                        <a href="https://github.com/dscordik" target="_blank" rel="noreferrer" className="footer__social" title="GitHub">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="footer__nav">
                    <h3 className="footer__title">Навигация</h3>
                    <a href="#catalog" className="footer__link">Каталог</a>
                    <a className="footer__link">Доставка</a>
                    <a className="footer__link">Оплата</a>
                    <a className="footer__link">Возврат</a>
                </div>
                <div className="footer__contacts">
                    <h3 className="footer__title">Контакты</h3>
                    <div className="footer__contact-item">Телефон: +7 (999) 123-12-12</div>
                    <div className="footer__contact-item">Email: support@gmail.com</div>
                    <div className="footer__contact-item">Адрес: Secret</div>
                </div>
            </div>
            <div className="footer__bottom">
                <h4 className="footer__copyright">&copy; 2026 Misha store. Все права не защищены</h4>
            </div>
        </footer>
    );
}