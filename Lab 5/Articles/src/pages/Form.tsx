import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const submitForm = () => {
        if (!title || !body) {
            alert("Fill all the fields!");
            return;
        }

        const article = {
            id: Date.now().toString(),
            title,
            body
        };

        const articles = JSON.parse(localStorage.getItem("articles") || "[]");
        articles.push(article);
        localStorage.setItem("articles", JSON.stringify(articles));

        navigate("/blog");
    }

    return (
        <main className="form">
            <h1>Add new article:</h1>
            <input id="titleInput" type="text" placeholder="Article Title" value={title} onChange={(event) => {setTitle(event.target.value)}}/>
            <textarea id="bodyInput" placeholder="Article Content" value={body} onChange={(event) => {setBody(event.target.value)}}></textarea>
            <button onClick={submitForm}>Post</button>
        </main>
    );
}

export default Form;