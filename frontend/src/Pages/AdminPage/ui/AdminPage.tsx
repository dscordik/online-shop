import React, {useEffect, useState} from 'react'
import {User} from "../../../Entities/user/model/types";
import {Link, useNavigate} from "react-router";
import {OrderOut, Product} from "../../../Entities/product/model/types";
import {authorizedFetch} from "../../../Entities/user/model/authApi";
import {API_BASE_URL} from "../../../Shared/api/config";
import {updateOrderStatus} from "../../../Entities/order/model/adminOrderApi";
import {getAllProducts, createProduct, deleteProduct, updateProduct} from "../../../Entities/product/model/adminProductApi";
import './AdminPage.css'

interface AdminPageProps{
    user:User | null
}

export const AdminPage:React.FC<AdminPageProps> = ({user}) => {
    const [products, setProducts] = useState<Product[]>([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [productForms, setProductForms] = useState({
        title: '',
        price: '',
        image_url: '',
        category: '',
        description: ''
    })
    const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders')
    const [historyOrders, setHistoryOrders] = useState<OrderOut[]>([])
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
        }
    }, [user, navigate])
    useEffect(() => {
        async function ordersFunc() {
            try {
                const orders = await historyOfOrders()
                setHistoryOrders(orders)
            } catch (error) {
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
    useEffect(() => {
        if (activeTab === 'products') {
            async function loadProducts() {
                try {
                    const products = await getAllProducts()
                    setProducts(products)
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message)
                    }
                }
            }

            loadProducts()
        }
    }, [activeTab]);

    async function historyOfOrders(): Promise<OrderOut[]> {
        return authorizedFetch(`${API_BASE_URL}/api/order/all`, {method: 'GET'})
    }

    async function handleStatusChange(orderId: number, newStatus: string) {
        try {
            await updateOrderStatus(orderId, newStatus)
            const newHistory = historyOrders.map((item) => {
                if (item.id === orderId) {
                    return {...item, status: newStatus as OrderOut['status']}
                } else {
                    return item
                }
            })
            setHistoryOrders(newHistory)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }

    async function handleDeleteProduct(productId: number) {
        try {
            if (!window.confirm('Удалить товар?')) return
            await deleteProduct(productId)
            const product = products.filter((item) => item.id !== productId)
            setProducts(product)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }

    async function handleProductSave() {
        try {
            const payload = {
                title: productForms.title,
                price: Number(productForms.price),
                image_url: productForms.image_url,
                category: productForms.category,
                description: productForms.description
            }
            if (editingProduct !== null) {
                const updatedProduct = await updateProduct(editingProduct.id, payload)
                const updatedList = products.map(item => item.id === editingProduct.id ? updatedProduct : item)
                setProducts(updatedList)
            } else {
                const newProduct = await createProduct(payload)
                setProducts([...products, newProduct])
            }
            setIsCreateModalOpen(false)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        }
    }

    return (
        <div className="admin-page">
            <div className="admin-page__header">
                <h1 className="admin-page__title">Админ-панель</h1>
                <div className="admin-page__tabs">
                    <button onClick={() => setActiveTab('orders')} className={`admin-page__tab ${activeTab === 'orders' ? 'admin-page__tab--active' : ''}`}>
                        Заказы
                    </button>
                    <button onClick={() => setActiveTab('products')} className={`admin-page__tab ${activeTab === 'products' ? 'admin-page__tab--active' : ''}`}>
                        Товары
                    </button>
                </div>
                <Link to='/' className="admin-page__back">В каталог товаров</Link>
            </div>
            {error && <p className="admin-page__error">{error}</p>}
            {activeTab === 'orders' && (
                <div className="admin-orders">
                    <h2 className="admin-orders__title">Все заказы</h2>
                    {historyOrders.length === 0 ? (
                        <p className="admin-orders__empty">Заказов нет...</p>
                    ) : (
                        <div className="admin-orders__list">
                            {historyOrders.map((order) => (
                                <div key={order.id} className="admin-orders__item">
                                    <div className="admin-orders__header">
                                        <span className="admin-orders__date">{order.created_at_order}</span>
                                        <span className="admin-orders__status">{order.status}</span>
                                        <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} className="admin-orders__status-select">
                                            <option value='Оформляем'>Оформляем</option>
                                            <option value='Собираем'>Собираем</option>
                                            <option value='Доставляем'>Доставляем</option>
                                            <option value='Готов к получению'>Готов к получению</option>
                                        </select>
                                    </div>
                                    <div className="admin-orders__items">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="admin-orders__product">
                                                <span className="admin-orders__product-name">{item.product_name}</span>
                                                <span className="admin-orders__product-count">{item.total_count} шт.</span>
                                                <span className="admin-orders__product-price">{item.price} ₽</span>
                                                <span className="admin-orders__product-total">{item.price * item.total_count} ₽</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="admin-orders__total">Итого: {order.total_price} ₽</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {activeTab === 'products' && (
                <div className="admin-products">
                    <div className="admin-products__header">
                        <h2 className="admin-products__title">Товары</h2>
                        <button onClick={() => {setProductForms({title: '', price: '', image_url: '', category: '', description: ''});setIsCreateModalOpen(true);}} className="admin-products__add-btn">
                            Добавить товар
                        </button>
                    </div>
                    {products.length === 0 ? (
                        <p className="admin-products__empty">Товаров нет...</p>
                    ) : (
                        <div className="admin-products__list">
                            {products.map((product) => (
                                <div key={product.id} className="admin-products__item">
                                    <img src={product.image_url} alt={product.title} className="admin-products__image"/>
                                    <div className="admin-products__info">
                                        <span className="admin-products__name">{product.title}</span>
                                        <span className="admin-products__price">{product.price} ₽</span>
                                        <span className="admin-products__category">{product.category}</span>
                                    </div>
                                    <div className="admin-products__actions">
                                        <button
                                            onClick={() => {
                                                setEditingProduct(product);
                                                setProductForms({
                                                    title: product.title,
                                                    price: String(product.price),
                                                    image_url: product.image_url,
                                                    category: product.category,
                                                    description: product.description
                                                });
                                            }}
                                            className="admin-products__edit-btn"
                                        >
                                            Редактировать
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="admin-products__delete-btn">Удалить</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {isCreateModalOpen && (
                <div className="admin-modal">
                    <div className="admin-modal__content">
                        <h3 className="admin-modal__title">{editingProduct ? 'Редактировать товар' : 'Создать товар'}</h3>
                        <div className="admin-modal__form">
                            <input placeholder='Название' value={productForms.title} onChange={(e) => setProductForms({...productForms, title: e.target.value})} className="admin-modal__input"/>
                            <input placeholder='Цена' value={productForms.price} onChange={(e) => setProductForms({...productForms, price: e.target.value})} className="admin-modal__input" type="number"/>
                            <input placeholder='URL изображения' value={productForms.image_url} onChange={(e) => setProductForms({...productForms, image_url: e.target.value})} className="admin-modal__input"/>
                            <input placeholder='Категория' value={productForms.category} onChange={(e) => setProductForms({...productForms, category: e.target.value})} className="admin-modal__input"/>
                            <textarea placeholder='Описание' value={productForms.description} onChange={(e) => setProductForms({...productForms, description: e.target.value})} className="admin-modal__input admin-modal__textarea"/>
                            <div className="admin-modal__actions">
                                <button onClick={handleProductSave} className="admin-modal__save-btn">Сохранить</button>
                                <button onClick={() => { setIsCreateModalOpen(false); setEditingProduct(null); }} className="admin-modal__cancel-btn">Отмена</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage