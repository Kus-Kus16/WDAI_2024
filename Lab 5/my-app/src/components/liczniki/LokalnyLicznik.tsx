import { useEffect, useState } from "react";

function LokalnyLicznik() {
    const [counter, setCounter] = useState(0);

    useEffect( () => {
        const localCounter = localStorage.getItem("counter");
        if (localCounter) {
            setCounter(Number(localCounter));
        }
    }, [] )

    const increment = () => {
        localStorage.setItem("counter", String(counter + 1))
        setCounter(counter + 1);
    };

    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={increment}>Zwiększ</button>
        </div>
    );
}

export default LokalnyLicznik;