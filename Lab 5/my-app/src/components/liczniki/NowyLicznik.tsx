import { useState } from "react";
import Przycisk from "./Przycisk";

function NowyLicznik() {
    const [counter, setCounter] = useState(0)

    const increment = () => {
        setCounter(counter + 1);
    };

    return (
        <div>
            <h1>{counter}</h1>
            <Przycisk onClick={increment}/>
        </div>
    );
}

export default NowyLicznik;