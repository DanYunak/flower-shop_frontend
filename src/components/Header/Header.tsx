import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { FC } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { actions } from '../../redux/model/userActions';
import './Header.scss';

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  const username = useAppSelector((s) => s.auth.username);

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>FlowerShops</div>

      <div className="header__right">
        {!isLoggedIn ? (
          <div className="user__icon" onClick={() => navigate('/auth')}>
            <PersonIcon />
          </div>
        ) : (
          <>
            <div className="username">{username}</div>
            <div className="cart__icon" onClick={() => navigate('/cart')}>
            <ShoppingCartIcon />
            </div>
            <div className="logout__icon" onClick={() => { dispatch(actions.logout()); navigate('/auth'); }}>
              <LogoutIcon />
            </div>
          </>
        )}
      </div>
    </header>
  );
};