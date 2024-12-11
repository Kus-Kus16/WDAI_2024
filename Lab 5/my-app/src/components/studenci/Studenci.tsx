interface Student {
    imie: string
    nazwisko: string
    rocznik: number
};

function Studenci() {
    const Students: Student[] = [
        { imie: "Jan", nazwisko: "Kowalski", rocznik: 2001 },
        { imie: "Anna", nazwisko: "Nowak", rocznik: 2002 },
        { imie: "Piotr", nazwisko: "Wiśniewski", rocznik: 2000 },
        { imie: "Maria", nazwisko: "Zielińska", rocznik: 2003 },
        { imie: "Tomasz", nazwisko: "Mazur", rocznik: 1999 },
        { imie: "Alicja", nazwisko: "Lewandowska", rocznik: 2001 }
    ];

    return (
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
    );
};

export default Studenci;