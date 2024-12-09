import { useState } from "react";

function Licznik() {
    const [counter, setCounter] = useState(0)

    const increment = () => {
        setCounter(counter + 1);
    };

    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={increment}>Zwiększ</button>
        </div>
    );
}

export default Licznik;