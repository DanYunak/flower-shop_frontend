import { FC } from "react";
import { FlowersList } from "../FlowersList/FlowersList";
import { ShopsSidebar } from "../ShopsSidebar/ShopsSidebar";
import './FlowerShops.scss';

export const FlowerShops: FC = () => {
    return (
        <div className='flower__shops'>
            <ShopsSidebar />
            <FlowersList />
        </div>
    )
}