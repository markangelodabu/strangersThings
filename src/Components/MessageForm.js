import "./MessageForm.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addMessage, fetchPosts } from "../api";

const MessageForm = ({token, setPosts}) => {
    const {postID} = useParams();
    const [content, setContent] = useState('');

    const handleMessage = async (event) => { 
        try {
            event.preventDefault();
            await addMessage(token, postID, content);
            const {newPosts:newerPosts} = await fetchPosts();
            setPosts(newerPosts)
        }   catch (error) {
            console.error(error);
        }
    } 

    return (
        <form className="messageform" onSubmit={handleMessage}>
            <h2 className="messagetitle">Message Form</h2>
            <label htmlFor="message-input">Write your message here: </label>
            <textarea className="messagebox" value={content} onChange={(event) => { setContent(event.target.value)}} id="message-input" />
            <button>Submit</button>
        </form>
    )
}

export default MessageForm;