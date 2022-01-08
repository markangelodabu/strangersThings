import { resolvePath } from "react-router-dom";

const BASE_URL = "https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT"

export const fetchPosts = async () => {
    try {
        const response = await fetch (`${BASE_URL}/posts`);
        const {data: {posts}} = await response.json();
        return posts;
    } catch (error) {
        console.error(error);
    }
} 

export const login = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                username,
                password,
                }
            })
        })
        console.log(response);
        const result = await response.json();
        console.log(result);

        // const {data: {token}} = await response.json()
        //return token;
    } catch (error) {
        console.error(error);
    }
}

export const register = async (username, password) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
            username,
            password,
            }
        })
    })

    const {data: {token, message} } = await response.json();
    return token;
}

export const getUser = async (token) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const {data: userObject} = await response.json();
    return userObject;
}