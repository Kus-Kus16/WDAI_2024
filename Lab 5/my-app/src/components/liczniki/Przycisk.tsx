interface PrzyciskProps {
    onClick: () => void;
}

function Przycisk(props: PrzyciskProps) {
    return (
        <button onClick={props.onClick}>Zwiększ</button>
    );
}

export default Przycisk;