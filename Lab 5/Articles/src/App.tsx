import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Blog from "./pages/Blog";
import ArticlePage from "./pages/ArticlePage";
import Form from "./pages/Form";
import Layout from "./pages/Layout";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="blog" element={<Blog />} />
                <Route path="article/:id" element={<ArticlePage />} />
                <Route path="dodaj" element={<Form />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App
