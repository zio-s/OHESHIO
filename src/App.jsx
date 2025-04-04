import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/layout/Layout';
import { About, Cart, Checkout, Home, Login, Main, MyPage, Product, Signup } from './pages';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NaverCallback from './components/login/NaverCallback';
import { ToastContainer } from 'react-toastify';
import Kbrand from './pages/kbrand';
import OrderComplete from './components/checkout/OrderComplete';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/' element={<Layout />}>
              <Route path='/kbrand' element={<Kbrand />} />
              <Route path='/about' element={<About />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/product' element={<Product />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/main' element={<Main />} />
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/checkout'>
                <Route index element={<Checkout />} />
                <Route path='complete/:orderNumber' element={<OrderComplete />} />
              </Route>
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login/callback/naver' element={<NaverCallback />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;
