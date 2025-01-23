import { useParams } from "react-router-dom";

export function ShapeDetails() {
    const {id} = useParams();

    return (
        <h2>{id}</h2>
    );
}