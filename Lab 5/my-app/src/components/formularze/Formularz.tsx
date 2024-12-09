import { useState } from "react";

function Formularz() {
    const [tekst, setTekst] = useState(" ")

    return(
        <>
        <input type="text" value={tekst} onChange={(event) => setTekst(event.target.value)} />
        <div>{tekst}</div>
        </>
    );
}

export default Formularz;