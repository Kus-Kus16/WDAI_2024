import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
    const navigate = useNavigate();

    const navigateBlog = () => {
        navigate("/blog");
    };

    const navigateForm = () => {
        navigate("/dodaj");
    };

    return (
        <main>
        <h1>Welcome to the Articles website!</h1>
        <div>
            <button onClick={navigateBlog}>Blog</button>
            <button onClick={navigateForm}>Add article</button>
        </div>
        </main>
    );
}

export default Home;