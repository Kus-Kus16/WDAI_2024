interface ProductType {
    id: number
    title: string
    category: string
    brand: string
}

export function Product({product, onClick} : {product: ProductType, onClick: (id: number) => void}){
    return (
        <div onClick={() => onClick(product.id)}>
            <h2>{product.title}</h2>
            <h3>{product.category}</h3>
            <p>{product.brand}</p>
        </div>
    );
}

export type {ProductType};