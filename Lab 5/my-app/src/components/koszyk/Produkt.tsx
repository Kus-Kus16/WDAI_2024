interface ProduktProps {
    nazwa: string;
}

function Produkt(props: ProduktProps) {
    return <h2>{props.nazwa}</h2>;
};

export default Produkt;