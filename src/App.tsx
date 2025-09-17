import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { CartPage } from './pages/CartPage/CartPage';
import { FlowerShopsPage } from './pages/FlowerShopsPage/FlowerShopsPage';
import { Auth } from './components/Auth/Auth';
import { useEffect } from 'react';
import { initializeAuth } from './appInit';

function App() {
  useEffect(() => {initializeAuth()}, [])

  return (
    <div className='app__container'>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<FlowerShopsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
