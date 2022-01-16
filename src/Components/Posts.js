import "./Posts.css";
import { fetchPosts, deletePost } from "../api";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    ({ title, description, location, price }) => {
      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        location.includes(searchTerm) ||
        price.includes(searchTerm)
      );
    }
  );
  //understand why post useState inside of post?
  const handlePosts = async () => {
    try {
      const newPosts = await fetchPosts();
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postID) => {
    try {
      await deletePost(token, postID);
      const newPosts = posts.filter((element) => element._id !== postID);
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

  return (
    <div className="posts">
      <input
        className="searchbar"
        type="text"
        placeholder="Search Posts"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {token && <AddPost token={token} posts={posts} setPosts={setPosts} />}
      {filteredPosts.length > 0 &&
        filteredPosts.map(
          ({
            _id,
            description,
            price,
            title,
            location,
            willDeliver,
            isAuthor,
          }) => {
            return (
              // use classname when styling
              <div className="post" key={_id}>
                <h2 className="title"> {title} </h2>
                <p className="description"> {description} </p>
                {location && <h5 className="location"> Location: {location}</h5>}
                <h5 className="price"> Price: ${price}</h5>
                {willDeliver && <p className="delivery">Delivery Available</p>}
                {isAuthor && (
                  <button
                    type="button"
                    className="deleteButton"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          }
        )}
    </div>
  );
};

export default Posts;