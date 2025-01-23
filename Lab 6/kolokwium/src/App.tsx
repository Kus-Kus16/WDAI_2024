
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { ShapesList } from './components/ShapesList';
import { ShapeDetails } from './components/ShapeDetails';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<ShapesList />} />
                    <Route path="shape/:id" element={<ShapeDetails/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
