import { useEffect, useState } from "react";
import { Koło } from "./Koło";
import { Kwadrat } from "./Kwadrat";
import { Prostokąt } from "./Prostokąt";
import "./List.css"
import { useNavigate } from "react-router-dom";

interface ShapeType {
    id: number
    type: string
}

export function ShapesList() {
    const [shapes, setShapes] = useState<ShapeType[]>([
        {id: 1, type: "circle"},
        {id: 2, type: "square"},
        {id: 3, type: "rectangle"},
    ])
    const [viewedShapes, setViewedShapes] = useState<ShapeType[]>(shapes)

    const [currentId, SetCurrentId] = useState(4);
    const [filter, setFilter] = useState("");
    const [animate, setAnimate] = useState(false);

    const navigate = useNavigate();
    
    const rendertype = (shape: string, id: number) => {
        switch (shape) {
            case "square":
                return (
                    <div key={id} className="shapeDiv">
                    <Kwadrat/>
                    <button onClick={() => removeShape(id)}>Usuń</button>
                    </div>
                )
            case "rectangle":
                return (
                    <div key={id} className="shapeDiv">
                    <Prostokąt/>
                    <button onClick={() => removeShape(id)}>Usuń</button>
                    </div>
                )
            case "circle":
                return (
                    <div key={id} className="shapeDiv" >
                    <Koło/>
                    <button onClick={() => removeShape(id)}>Usuń</button>
                    </div>
                )

        }
    }

    const addShape = (shape: string) => {
        let newShapes = shapes;
        
        newShapes.push({
            id: currentId,
            type: shape
        })

        setShapes(newShapes);
        SetCurrentId(currentId + 1);
        refilterShapes(newShapes);
    }

    const removeShape = (id: number) => {      
        let newShapes = shapes.filter((shape) => shape.id != id)

        setShapes(newShapes);
        refilterShapes(newShapes)
    }

    const refilterShapes = (toFilterShapes: ShapeType[]) => {
        let newShapes = toFilterShapes.filter( (shape) =>  shape.type.includes(filter))

        setViewedShapes(newShapes);
    }

    useEffect( () => {
        refilterShapes(shapes);
    }, [filter] )

    useEffect( () => {
        setTimeout( () => {
            setAnimate(true);
        }, 2000 );
    }, [] )

    return (
        <div>
            <div>
                <button onClick={() => addShape("square")}>Add square</button>
                <button onClick={() => addShape("rectangle")}>Add rectangle</button>
                <button onClick={() => addShape("circle")}>Add circle</button>
                <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                    <option value="">Wszystkie</option>
                    <option value="square">Kwadraty</option>
                    <option value="rectangle">Prostokąty</option>
                    <option value="circle">Koła</option>
                </select>
            </div>
            <div className={`listContainer ${animate ? "animate" : ""}`} >
                {viewedShapes.map( (shape) => (
                    rendertype(shape.type, shape.id)
                ) )}
            </div>
        </div>
    );
}

