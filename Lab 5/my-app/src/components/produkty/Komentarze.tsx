import { useEffect, useState } from "react";
import Komentarz from "./Komentarz";

interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
};

interface User {
    id: number;
    username: string;
    fullName: string;
};

function Komentarze() {
    const [comments, setComments] = useState<Comment[]>([])

    useEffect( () => {
        const fetchComments = async () => {
            try {
                const response = await fetch("https://dummyjson.com/comments");
                const data: { comments: Comment[] } = await response.json(); 
                setComments(data.comments);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComments();
    }, [] )

    return (
        <>
        {comments.map( (comment) => (
            <Komentarz
                key={comment.id}
                id={comment.id}
                body={comment.body}
                postId={comment.postId}
                likes={comment.likes}
                user={comment.user}
            />
        ))}
        </>
    )
};

export default Komentarze;