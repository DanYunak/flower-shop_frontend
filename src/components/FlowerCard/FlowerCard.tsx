import { FC, useEffect, useState } from 'react'
import { ProductType } from '../../redux/types/FlowerShops.type'
import './FlowerCard.scss'
import { useAppDispatch } from '../../hooks';
import { addToCartApi, getCartApi } from '../../api/cart';
import { Button } from 'antd';

type PropsType = {
    product: ProductType
}

export const FlowerCard: FC<PropsType> = ({ product }) => {
    const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false)

    useEffect(() => {
        const checkCart = async () => {
            try {
                const cart = await getCartApi()
                const exists = cart.items.some((item: any) => item.productId === product.id)
                setIsAddedToCart(exists)
            } catch(e) {
                console.error('Failed to load cart', e)
            }
        }

        checkCart()
    }, [product.id])

    const addToCart = async () => {
        try {
            await addToCartApi(product.id, 1);
            setIsAddedToCart(true);
        } catch (e) {
            console.error("Failed to add to cart", e);
        }
    };

    return (
        <div className='flower__card'>
            <img src={product.imageUrl} />
            <div className='title'>{product.name}</div>
            <div className='flower__card_footer'>
                <div className='price'>${product.price}</div>
                {!isAddedToCart
                    ? <button className='add_to_cart' onClick={addToCart}>Add to cart</button>
                    : <button className='added_to_cart'>Added to cart</button>
                }
            </div>
        </div >
    )
}