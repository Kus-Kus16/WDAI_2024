import { useState } from "react";
import { Student } from "./StudentManager";

function Dodawanie({addStudent}: {addStudent: (student: Student) => void}) {
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [rocznik, setRocznik] = useState<number>();

    const Validate = () => {
        if (!imie || !nazwisko || !rocznik || rocznik < 0) {
            alert("Wprowadź prawidłowe dane!");
            return;
        }

        addStudent({imie, nazwisko, rocznik});
        setImie("");
        setNazwisko("");
        setRocznik(NaN);
    };

    return (
        <>
        <h3>Dodaj nowego studenta:</h3>
        <input type="text" id="inputImie" placeholder="Imię" value={imie} onChange={(event) => (setImie(event.target.value))}/>
        <input type="text" id="inputNazwisko" placeholder="Nazwisko" value={nazwisko} onChange={(event) => (setNazwisko(event.target.value))}/>
        <input type="number" id="inputRocznik" placeholder="Rocznik" value={rocznik} onChange={(event) => (setRocznik(Number(event.target.value)))} />

        <button onClick={Validate}>Dodaj</button>
        </>
    )
};

export default Dodawanie;