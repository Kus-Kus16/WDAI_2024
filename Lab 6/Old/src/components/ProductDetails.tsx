import { useParams } from "react-router-dom";
import { ProductType } from "./Product";
import { useEffect, useState } from "react";

export function ProductDetails() {
    const {id} = useParams()
    const [product, setProduct] = useState<ProductType>()

    useEffect( () => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();

                setProduct(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [] )

    return (
        <div>
            <p>
                {JSON.stringify(product)}
            </p>
        </div>
    );
}