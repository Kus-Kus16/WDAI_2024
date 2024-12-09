import Produkt from "./Produkt";

const produkty = [
    {nazwa: "jabłko"},
    {nazwa: "gruszka"},
    {nazwa: "banan"},
    {nazwa: "pomarańcze"},
    {nazwa: "cytryny"}
]
  

function NowyKoszyk() {
    return (
    <ul>
        {produkty.map( (produkt, i) => (
            <li key={i}>
                <Produkt nazwa={produkt.nazwa}/>
            </li>
        ) )}
    </ul>
    );
};

export default NowyKoszyk;