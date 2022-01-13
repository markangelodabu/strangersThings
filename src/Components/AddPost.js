import { useState } from "react";
import PostForm from "./PostForm";
import { addPost } from "../api";


const AddPost = ({ fetchPosts, token, setPosts, posts }) => {
  const blankPost = {
    post: {
      title: "",
      description: "",
      price: "",
      willDeliver: false,
    },
  };
  const [post, setPost] = useState(blankPost);

  const handleAdd = async (event) => {
      try {
          event.preventDefault();
          const { data: { post: newPost} } = await addPost (token, post)
          setPosts([...posts, newPost]);
          setPost(blankPost);
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <>
      <h2>Add Post</h2>
      <PostForm handleSubmit={handleAdd} post={post} setPost={setPost} />
    </>
  );
};

export default AddPost;
