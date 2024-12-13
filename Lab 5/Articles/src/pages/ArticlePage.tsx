import { useParams } from "react-router-dom";
import Article from "../components/Article";

function ArticlePage() {
    const {id} = useParams();
    const articles = JSON.parse(localStorage.getItem("articles") || "[]");
    const article = articles.find( (article: {id: string}) => article.id === id );

    if (!article) {
        return (
            <div>Article not found</div>
        );
    }

    return (
        <main>
        <Article id={article.id} title={article.title} body={article.body} />
        </main>
    );
}

export default ArticlePage;