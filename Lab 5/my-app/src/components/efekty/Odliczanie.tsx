import { useEffect, useState } from "react";

function Odliczanie() {
    const [licznik, setLicznik] = useState(5.0)
    const [active, setActive] = useState(false)
    const [ended, setEnded] = useState(false)

    const toggleTimer = () => {
        setActive(!active);
    };

    useEffect( () => {
        let interval: number | undefined;
        if (active) {
            interval = setInterval( () => {
                setLicznik(prevLicznik => {
                    if (prevLicznik > 0.1) {
                        return prevLicznik - 0.1;
                    } else {
                        setEnded(true);
                        setActive(false);
                        return 0;
                    }
                })
            }, 100 )
        } 

        return () => {clearInterval(interval)};
    }, [active] );

    return (
        <>
        <div>{licznik.toFixed(1)} sek</div>
        <button onClick={toggleTimer} disabled={ended}>{ended ? "Odliczanie zakończone" : active ? "Stop" : "Start"}</button>
        </>
    );
};

export default Odliczanie;