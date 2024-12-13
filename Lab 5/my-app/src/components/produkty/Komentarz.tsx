import { useState } from "react";

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

function Komentarz(props: Comment) {
    const [likes, setLikes] = useState(props.likes)
    const [liked, setLiked] = useState(false)

    const likeClick = () => {
        setLikes( (prevLikes) => prevLikes + 1 );
        setLiked(!liked);
    }

    const dislikeClick = () => {
        setLikes( (prevLikes) => prevLikes - 1 );
        setLiked(!liked);
    }

    return (
    <div style={{border: "1px solid #ddd", borderRadius: "5px", width: "350px", margin: "10px", padding: "10px", display: "flex", flexDirection: "column", gap: "10px"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <h3>{props.user.fullName} </h3>
            <h4 style={{color: "#b5b5b5"}}>@{props.user.username}</h4>
        </div>

        <div style={{width: "80%"}}>
            <p style={{textAlign: "left"}}>{props.body}</p>
        </div>

        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "10px"}}>
                <p>Likes: {likes}</p>
                <button onClick={likeClick} disabled={liked} style={{padding: "10px 15px"}}>👍</button>
                <button onClick={dislikeClick} disabled={!liked} style={{padding: "10px 15px"}}>👎</button>
            </div>
            
            <span style={{fontSize: "60%", color: "#d1d1d1", alignSelf: "end", paddingBottom: "5px"}}>UserID: {props.user.id}, PostID: {props.id}</span>
        </div>
    </div>
    );
};

export default Komentarz;