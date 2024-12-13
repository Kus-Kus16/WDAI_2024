import { Link } from "react-router-dom";
import { ArticleProp } from "../components/Article";
import { useState } from "react";

function Blog() {
    const [articles,setArticles] = useState( JSON.parse(localStorage.getItem("articles") || "[]") );
    
    const deleteArticles = () => {
        localStorage.removeItem("articles")
        setArticles([]);
    }

    return (
        <main className="blog">
        <h1>Welcome to the blog!</h1>
        {articles.length > 0 ? (
            <>
            <h2>Our articles:</h2>
            <ul>
                { articles.map((article: ArticleProp) => (
                    <li key={article.id}>
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </li>
                )) }
            </ul>
            <button onClick={deleteArticles}>Delete all Articles</button>
            </>
        ) : (
            <h2>No articles yet!</h2>
        )
        }
        </main>
    );
}

export default Blog;