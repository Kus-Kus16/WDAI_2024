import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
    imie: string
    nazwisko: string
    rocznik: number
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
export type {Student};