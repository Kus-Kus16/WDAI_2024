import { useEffect, useState } from "react"

export function Search({handleSearch} : {handleSearch : (phrase: string) => void}) {
    const [phrase, setPhrase] = useState("");
    
    useEffect( () => {
        handleSearch(phrase);
    }, [phrase] )

    return (
        <div>
            <input type="text" value={phrase} onChange={(event) => setPhrase(event.target.value)}/>
        </div>
    );
}