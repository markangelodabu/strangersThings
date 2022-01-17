import React from "react";
import "./Posts.css";
import { fetchPosts, deletePost } from "../api";
import { useState, useEffect } from "react";
import AddPost from "./AddPost";
import { useNavigate } from "react-router-dom";

const Posts = ({ token }) => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  //understand why post useState inside of post?
  // const handlePosts = async () => {
  //   try {
  //     const newPosts = await fetchPosts();
  //     setPosts(newPosts);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDelete = async (postID) => {
    try {
      await deletePost(token, postID);
      const newPosts = posts.filter((element) => {
        return element._id !== postID;
      });
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts(token)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        console.error(error);
      });
    // handlePosts();
  }, [token]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredPosts = posts.filter(({ title, description, location }) => {
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  console.log(filteredPosts);
  return (
    <>
      <input
        className="searchbar"
        type="text"
        placeholder="Search Posts"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {token && <AddPost token={token} posts={posts} setPosts={setPosts} />}

      <div className="posts">
        {filteredPosts.length > 0 ? (
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
              console.log(isAuthor);
              return (
                // use classname when styling
                <div className="post" key={_id}>
                  <h2 className="title"> {title} </h2>
                  <p className="description"> {description} </p>
                  {location && (
                    <h5 className="location"> Location: {location}</h5>
                  )}
                  <h5 className="price"> Price: ${price}</h5>
                  {willDeliver && (
                    <p className="delivery">Delivery Available</p>
                  )}
                  {token && isAuthor && (
                    <button
                      type="button"
                      className="deleteButton"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </button>
                  )}
                  {!isAuthor && (
                    <button
                      type="button"
                      className="messageButton"
                      onClick={() => {
                        navigate(`posts/${_id}/messages`);
                      }}
                    >
                      Message
                    </button>
                  )}
                </div>
              );
            }
          )
        ) : (
          <h5>No Posts Available</h5>
        )}
      </div>
    </>
  );
};

export default Posts;
