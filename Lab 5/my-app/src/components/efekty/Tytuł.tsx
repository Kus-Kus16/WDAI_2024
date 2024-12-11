import { useEffect, useState } from "react"

function Tytuł() {
    const [title, setTitle] = useState("")

    useEffect( () => {
        document.title = title;
    }, [title] )

    return (
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
    );
};

export default Tytuł