import "./PostForm.css";

const PostForm = ({ post, setPost, handleSubmit }) => {
  return (
    <form className="postform" onSubmit={handleSubmit}>
      <input
        value={post.title}
        placeholder="Title"
        onChange={(event) => {
          setPost({ ...post, title: event.target.value });
        }}
      />
      <input
        value={post.description}
        placeholder="Description"
        onChange={(event) => {
          setPost({ ...post, description: event.target.value });
        }}
      />
      <input
        value={post.location}
        placeholder="Location"
        onChange={(event) => {
          setPost({ ...post, location: event.target.value });
        }}
      />
      <input
        value={post.price}
        placeholder="Price"
        onChange={(event) => {
          setPost({ ...post, price: event.target.value });
        }}
      />
      <div>
        <span> Will Deliver? </span>
        <input
          className="checkbox"
          type="checkbox"
          value={post.willDeliver}
          placeholder="Will Deliver"
          onChange={(event) => {
            setPost({ ...post, willDeliver: event.target.checked });
          }}
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default PostForm;
