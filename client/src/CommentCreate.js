import {useState} from "react";
import axios from "axios";

export default function CommentCreate({postId}) {

    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        })

        setContent('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="commnet">New Comment</label>
                    <input
                        value={content}
                        type="text"
                        id="comment"
                        className="form-control"
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}