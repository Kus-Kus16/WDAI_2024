import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="products/:id" element={<ProductDetails/>} />
            </Routes>
        </BrowserRouter>
    );
}