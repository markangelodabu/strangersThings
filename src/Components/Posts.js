import { fetchPosts, register, login} from "../api";
import { useState, useEffect } from "react";
import  AddPost  from "./AddPost";
import  PostForm  from "./PostForm";


const Posts = () => {
  const [posts, setPosts] = useState([]);
//understand why post useState inside of post?
  const handlePosts = async () => {
    try {
      const newPosts = await fetchPosts();
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //   fetchPosts().then((posts) => {
    //       setPosts(posts);
    //   }).catch((error) => {
    //     console.error(error);
    // })
    handlePosts();
  }, []);
// console.log(posts);
  return (
    <div className="posts">
        <AddPost/>
      {posts.length > 0 &&
        posts.map(({ _id, description }) => {
          return (
              // use classname when styling
            <div className="post" key={_id}>
              {description}
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
