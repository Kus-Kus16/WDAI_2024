import { useState } from "react";

function Haslo() {
    const [haslo1, setHaslo1] = useState("");
    const [haslo2, setHaslo2] = useState("");
    const [username, setUsername] = useState("");

    const checkEmpty = () => {
        return (!haslo1 || !haslo2 || !username);
    }

    const sendAlert = () => {
        if (haslo1 === haslo2) {
            alert("Zalogowano pomyślnie");
        } else {
            alert("Hasła nie są zgodne");           
        }
    }

    return (
        <>
        <input type="text" id="Input3" value={username} onChange={(event) => setUsername(event.target.value)}/>
        <label htmlFor="Input3"> Nazwa Użytkownika </label>
        <input type="text" id="Input1" value={haslo1} onChange={(event) => setHaslo1(event.target.value)}/>
        <label htmlFor="Input1"> Hasło </label>
        <input type="text" id="Input2" value={haslo2} onChange={(event) => setHaslo2(event.target.value)}/>
        <label htmlFor="Input2"> Powtórz Hasło</label>

        <button onClick={sendAlert} disabled={checkEmpty()}>Zaloguj się</button>
        </>
    );
}

export default Haslo;