import { useState } from "react";

function Haslo() {
    const [haslo1, setHaslo1] = useState("")
    const [haslo2, setHaslo2] = useState("")

    return (
        <>
        <input type="text" id="Input1" value={haslo1} onChange={(event) => setHaslo1(event.target.value)}/>
        <label htmlFor="Input1"> Hasło </label>
        <input type="text" id="Input2" value={haslo2} onChange={(event) => setHaslo2(event.target.value)}/>
        <label htmlFor="Input2"> Powtórz Hasło</label>

        {haslo1 == "" || haslo2 == "" ?
        <div>Proszę wprowadzić hasło</div> :
            haslo1 != haslo2 ?
            <div>Hasła nie są zgodne</div> :
                <div></div>
        }
        </>
    );
}

export default Haslo;