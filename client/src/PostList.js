import {useEffect, useState} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";


export default function PostList() {

    const [posts, setPosts] = useState({})
    
    const fetchPosts = () => {

        axios.get('http://posts.com/posts')
            .then((res) => {
                console.log(res.data)
                setPosts(res.data);
            }).catch((err) => {
                console.error(err);
                setPosts({});
        })

    }

    useEffect(() => {
        fetchPosts();
    },[])


    const renderedPosts = Object.values(posts).map((post) => {
        return (
            <div key={post.id} className='card' style={{width:'30%', marginBottom: '20px'}}>
                <div className="card-body">
                    <h3 className="card-title">{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });



    return <div className="d-flex flex-row flex-wrap justify-content-around">
        {renderedPosts}
    </div>


}