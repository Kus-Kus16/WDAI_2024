interface Person {
    name: string;
    surname: string;
}
  
function Welcome(props: Person) {
    return <h1>Hello, {props.name} {props.surname}</h1>;
}
  
function Goodbye(props: Person) {
    return <h1>{props.name.endsWith('a') ? 'Woman' : 'Man'}</h1>
}

const people: Person[] = [
    { name: "Sara", surname: "Herding" },
    { name: "Jan", surname: "Doe" },
    { name: "Alicja", surname: "Smith" }
]

function Greetings() {
    return (
    <div>
        {people.map((person, id) => (
        <div key={id}>
            <Welcome name={person.name} surname={person.surname} />
            <Goodbye name={person.name} surname={person.surname} />
        </div>
        ))}
    </div>
    );
}

export default Greetings;