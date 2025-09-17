import { FC, useEffect } from 'react';
import { Shop } from "../Shop/Shop";
import './ShopsSidebar.scss'
import { useAppDispatch } from '../../redux/store';
import { getAllShops } from "../../redux/selectors/flowerShopsSelectors";
import { useSelector } from "react-redux";
import { actions } from '../../redux/model/flowerShopsActions';
import { ShopType } from '../../redux/types/FlowerShops.type';

export const ShopsSidebar: FC = () => {
    const dispatch = useAppDispatch()

    const shops = useSelector(getAllShops)

    useEffect(() => {
        dispatch(actions.getAllShops())
    }, [])

    return (
        <div className='shops__sidebar'>
            {shops.length !== 0 
            ? <div className='shops__list'>
                {shops.map((shop: ShopType) => (
                    <Shop key={shop.id} shop={shop} />
                ))}
            </div>
            : <div className='shops__list_empty'>There are no shops</div>
            }
        </div>
    )
}