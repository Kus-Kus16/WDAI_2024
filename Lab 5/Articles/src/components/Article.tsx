interface ArticleProp {
    id: number
    title: string
    body: string
}

function Article(props: ArticleProp) {
    return (
        <div className="article" key={props.id}>
            <h1>{props.title}</h1>
            <p>{props.body}</p>
        </div>
    );
}

export default Article;
export type {ArticleProp};