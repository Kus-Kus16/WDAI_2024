import Produkt from "./Produkt";

function Koszyk() {
    return (
    <ul>
        <li><Produkt nazwa="Jabłko"/></li>
        <li><Produkt nazwa="Gruszka"/></li>
        <li><Produkt nazwa="Banan"/></li>
        <li><Produkt nazwa="Pomarańcze"/></li>
        <li><Produkt nazwa="Cytryny"/></li>
    </ul>
    );
};

export default Koszyk;