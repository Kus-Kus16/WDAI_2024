import { useState } from "react";

interface Student {
    imie: string
    nazwisko: string
    rocznik: number
};

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

function StudentManager() {
    const [Students, setStudents] = useState<Student[]> ([
        { imie: "Jan", nazwisko: "Kowalski", rocznik: 2001 },
        { imie: "Anna", nazwisko: "Nowak", rocznik: 2002 },
        { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2000 },
        { imie: "Maria", nazwisko: "Zielińska", rocznik: 2003 },
        { imie: "Tomasz", nazwisko: "Mazur", rocznik: 1999 },
        { imie: "Alicja", nazwisko: "Lewandowska", rocznik: 2001 }
    ]);

    const addStudent = (student: Student) => {
        setStudents( (prevStudents) => ( [...prevStudents, student] ) );
    };

    return (
        <>
        <table>
            <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Rocznik</th>
            </tr>
            {Students.map ( (student, i) => (
            <tr key={i}>
                    <td>{student.imie}</td>
                    <td>{student.nazwisko}</td>
                    <td>{student.rocznik}</td>
            </tr>
            )         
            )}
        </table>
        <Dodawanie addStudent={addStudent}/>
        </>
    );
};

export default StudentManager;