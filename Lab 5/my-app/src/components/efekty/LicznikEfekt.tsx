import { useEffect, useState } from "react";

function LicznikEfekt() {
    const [counter, setCounter] = useState(0)

    useEffect( () => {
        console.log("licznik zwiększył się do " + counter);
    }, [counter]);

    useEffect( () => {
        console.log("Hello World!");
    }, [])

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

export default LicznikEfekt;