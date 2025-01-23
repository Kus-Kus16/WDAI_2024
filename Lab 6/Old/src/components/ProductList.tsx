import { useEffect, useState } from "react";
import { Product, ProductType } from "./Product";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";
import "./ProductList.css"

export function ProductList() {
    const [search, setSearch] = useState("");
    const [animate, setAnimate] = useState(false);
    const [allProducts, setAllProducts] = useState<ProductType[]>([])
    const [viewedProducts, setViewedProducts] = useState<ProductType[]>([])
    const navigate = useNavigate();

    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                const data: {products: ProductType[]} = await response.json();
    
                setAllProducts(data.products);
                setViewedProducts(data.products);
                setTimeout( () => {
                    setAnimate(true);
                }, 3000 );
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [] )

    useEffect( () => {
        const newViewed = allProducts.filter((product) => 
            product.title.toLowerCase().includes(search.toLowerCase())
        );

        setViewedProducts(newViewed);
    }, [search] );

    return (
        <div className={animate ? "animate" : ""}>
            <Search handleSearch={setSearch}></Search>
            {viewedProducts.map( (product) => (
                <Product key={product.id} product={product} onClick={(id) => {navigate(`products/${id}`)}}/>
            ) )}
        </div>
    );
}