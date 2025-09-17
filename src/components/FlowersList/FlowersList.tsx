import { FC, useEffect } from 'react';
import { FlowerCard } from '../FlowerCard/FlowerCard'
import './FlowersList.scss'
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getAllProducts, getSelectedShop } from '../../redux/selectors/flowerShopsSelectors';
import { actions } from '../../redux/model/flowerShopsActions';
import { ProductType } from '../../redux/types/FlowerShops.type';

export const FlowersList: FC = () => {
    const dispatch = useAppDispatch()

    const products = useSelector(getAllProducts)
    const selectedShop = useSelector(getSelectedShop)

    useEffect(() => {
        dispatch(actions.getAllProducts())
    }, [])

    const filteredProducts = selectedShop ? products.filter((product: ProductType) => product.shopId === selectedShop) : products

    return (
        <div className='flowers__list'>
            {filteredProducts.length !== 0
                ? <div className='flowers__grid'>
                    {filteredProducts.map((product: ProductType) => (
                        <FlowerCard key={product.id} product={product}  />
                    ))}
                </div>
                : <div className='flowers__list_empty'>There are no products</div>
            }
        </div>
    )
}