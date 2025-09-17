import { FC, useEffect, useState } from 'react'
import { getCartApi, removeFromCartAPI, updateCartItemAPI } from '../../api/cart'
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import './Cart.scss'
import { createOrderApi, DataType } from '../../api/createOrder';
import { useNavigate } from 'react-router-dom';

export const Cart: FC = () => {
    const [cart, setCart] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = await getCartApi()
                setCart(data)
            } catch (e) {
                console.error('Error loading cart:', e)
            } finally {
                setLoading(false)
            }
        }
        fetchCart()
    }, [])

    const totalPrice = cart
    ? cart.items.reduce(
        (sum: number, i: any) => sum + i.product.price * i.quantity,
        0
      )
    : 0;

    const handleQuantityChange = async (productId: number, quantity: number) => {
        if (quantity < 1) return
        try {
            const updatedCart = await updateCartItemAPI(productId, quantity)
            setCart(updatedCart)
        } catch (e) {
            console.error("Error updating item:", e)
        }
    }

    const handleRemove = async (productId: number) => {
        try {
            const updatedCart = await removeFromCartAPI(productId)
            setCart(updatedCart)
        } catch (e) {
            console.error("Error removing item:", e)
        }
    }

    if (loading) return <div className="cart__page">Loading...</div>

    const schema = Yup.object().shape({
        userEmail: Yup.string().email('Invalid email').required('Required'),
        userPhone: Yup.string().required('Required'),
        deliveryAddress: Yup.string().required('Required')
    });

    const onSubmit = async (data: DataType) => {
        try {
            const payload = {
                ...data,
                totalPrice
            }
            await createOrderApi(payload)
            navigate('/')
        } catch(e) {
            console.error('Error creating order:', e)
        }
    }

    return (
        <div className="cart__page">
            <div className="cart__title">Shopping Cart</div>
            <div className="cart__items">
                {cart && cart.items.length > 0 ? (
                    cart.items.map((item: any) => (
                        <div className="cart__item" key={item.id}>
                            <img src={item.product.imageUrl} alt={item.product.name} />
                            <div className="cart__details">
                                <div className="cart__name">{item.product.name}</div>
                                <div className="cart__price">${item.product.price}</div>
                                <div className="cart__controls">
                                    <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <button className="remove__btn" onClick={() => handleRemove(item.productId)}>
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="cart__empty">Your cart is empty</div>
                )}
            </div>

            <div className="cart__summary">
                <h3>Order Summary</h3>
                <div className="cart__total">
                    Total: $
                    {cart
                        ? cart.items.reduce((sum: number, i: any) => sum + i.product.price * i.quantity, 0)
                        : 0}
                </div>
            </div>

            <div className="cart__form">
                <h3>Delivery Details</h3>
                <Formik initialValues={{ userEmail: '', userPhone: '', deliveryAddress: '' }} validationSchema={schema} onSubmit={onSubmit}>
                    {({ handleChange, handleBlur, values, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Email</label>
                                <input name="userEmail" value={values.userEmail} onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="userEmail" component="div" className="error__message" />
                            </div>
                            <div className="field">
                                <label>Phone number</label>
                                <input name="userPhone" value={values.userPhone} onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="userPhone" component="div" className="error__message" />
                            </div>
                            <div className="field">
                                <label>Delivery address</label>
                                <input name="deliveryAddress" value={values.deliveryAddress} onChange={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="deliveryAddress" component="div" className="error__message" />
                            </div>

                            <button type="submit" className="auth__button">Submit Order</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}