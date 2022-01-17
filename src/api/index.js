const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT";

export const fetchPosts = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const {
      data: { posts },
    } = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const data = await response.json();
    console.log("login", data);
    if (data.success) {
      const {
        data: { token, message },
      } = data;
      return [token, message];
    } else {
      const {
        error: { token, message },
      } = data;
      return [token, message];
    }
  } catch (error) {
    console.error(error);
  }
};

export const register = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      const {
        data: { token, message },
      } = data;
      return [token, message];
    } else {
      const {
        error: { token, message },
      } = data;
      return [token, message];
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data: userObject } = await response.json();
    console.log(userObject);
    return userObject;
  } catch (error) {
    console.error(error);
  }
};

export const addPost = async (token, post) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post }),
    });
    const {
      data: { post: newPost },
    } = await response.json();
    console.log(newPost);
    return newPost;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (token, postID) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("data", data);
  } catch (error) {
    console.error(error);
  }
};

export const addMessage = async (token, postID, content) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postID}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: {
          content
        },
      }),
    });
    console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
}