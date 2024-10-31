import {useState} from "react";
import axios from "axios";


export default function PostCreate() {

    const [title, setTitle] = useState("")

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title,
        });

        setTitle("")
    }



    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        value={title}
                        id="title"
                        type="text"
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>

    );


}