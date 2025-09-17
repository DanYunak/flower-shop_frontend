import { FC } from 'react'
import './Shop.scss'
import { ShopType } from '../../redux/types/FlowerShops.type';
import { actions } from '../../redux/model/flowerShopsActions';
import { useAppDispatch } from '../../hooks';

type PropsType = {
    shop: ShopType
}

export const Shop: FC<PropsType> = ({ shop }) => {
    const dispatch = useAppDispatch()

    return (
        <div onClick={() => dispatch(actions.setSelectedShop(shop.id))} className='shop'>
            {shop.name}
        </div>
    )
}