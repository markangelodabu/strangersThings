import { useState } from "react";

const PostForm = ({ post, setPost, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={post.post.title}
        placeholder="Title"
        onChange={(event) => {
          setPost({ ...post, title: event.target.value })
        }}
      />
        <input
        value={post.post.description}
        placeholder="Description"
        onChange={(event) => {
          setPost({ ...post, description: event.target.value })
        }}
      />
        <input
        value={post.post.price}
        placeholder="Price"
        onChange={(event) => {
          setPost({ ...post, price: event.target.value })
        }}
      />
      <button>Submit</button>
    </form>
  );
};

export default PostForm;
