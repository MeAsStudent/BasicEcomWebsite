import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Electronics from './components/Electronics';
import Sports from './components/Sports';
import Outdoor from './components/Outdoor';
import Travel from './components/Travel';
import Health from './components/Health';
import Errorpage from './components/Errorpage';
import Header from './components/Header';
import Cart from './components/Cart';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct'

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/outdoor" element={<Outdoor />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/health" element={<Health />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="*" elemnt={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
